import React, { useState, useEffect, useContext, useCallback } from "react"
import ChulaAccount from "./ChulaAccount"
import SatitAndCUPersonelAccount from "./SatitAndCUPersonelAccount"
import OtherAccount from "./OtherAccount"
import { UserContext, CuStudent, SatitCuPersonel, Other, DefaultAccount } from "../../../contexts/UsersContext"
import withUserGuard from "../../../guards/user.guard"
import { useTranslation } from "react-i18next"
import { Loading } from "../../ui/loading/loading"
import { client } from "../../../../axiosConfig"
import { Account, PenalizeMessageProps } from "../../../dto/account.dto"
import { NavHeader } from "../../ui/navbar/navbarSideEffect"

function AccountPage() {
  const { setCuStudentAccount, setSatitCuPersonelAccount, setOtherAccount } = useContext(UserContext)
  const [account_type, setAccountType] = useState<string>()
  const [penalizeStatus, setPenalizeStatus] = useState<boolean>()
  const [penalizeEndDate, setPenalizeEndDate] = useState("")
  const { t } = useTranslation()

  const fetch_account_type = useCallback(() => {
    client.get<DefaultAccount>("/account_info/").then(({ data }) => {
      setPenalizeStatus(data.is_penalize)
      if (data.expired_penalize_date)
        setPenalizeEndDate(
          new Date(data.expired_penalize_date).toLocaleTimeString() + ", " + new Date(data.expired_penalize_date).toLocaleDateString()
        ) // date-fns
      if (data.account_type === "CuStudent") {
        setCuStudentAccount(data as CuStudent)
      } else if (data.account_type === "SatitAndCuPersonel") {
        const satit = data as SatitCuPersonel
        if (satit.rejected_info && satit.verification_status === "Rejected") {
          satit.rejected_info.forEach((field) => {
            satit[field] = ""
          })
        }
        setSatitCuPersonelAccount(satit as SatitCuPersonel)
      } else if (data.account_type === "Other") {
        const other = data as Other
        const newOther = other.contact_person
          ? {
              ...other,
              contact_person_prefix: other.contact_person.contact_person_prefix,
              contact_person_name: other.contact_person.contact_person_name,
              contact_person_surname: other.contact_person.contact_person_surname,
              contact_person_home_phone: other.contact_person.contact_person_home_phone,
              contact_person_phone: other.contact_person.contact_person_phone,
            }
          : { ...other }
        other.rejected_info && other.verification_status === "Rejected"
          ? other.rejected_info.forEach((field) => {
              newOther[field] = ""
            })
          : console.log("No rejected info")
        setOtherAccount(newOther)
      }
      setAccountType(data.account_type)
    })
  }, [setCuStudentAccount, setOtherAccount, setSatitCuPersonelAccount])

  useEffect(() => {
    fetch_account_type()
  }, [fetch_account_type])

  const showPage = (account_type: string | undefined) => {
    switch (account_type) {
      case Account.CuStudent: {
        return <ChulaAccount />
      }
      case Account.SatitAndCuPersonel: {
        return <SatitAndCUPersonelAccount />
      }
      case Account.Other: {
        return <OtherAccount />
      }
      default: {
        return (
          <div className="wrapper mx-auto text-center mt-5">
            <Loading />
          </div>
        )
      }
    }
  }

  const PenalizeMessage: React.FC<PenalizeMessageProps> = ({ show, penalizeEndDate }) => {
    const { t } = useTranslation()
    if (!show) return null
    return (
      <div className="mx-3">
        <div className="alert alert-danger mx-auto col-md-6 mt-3" role="alert">
          <h3>{t("youArePenalized")}</h3>
          <h6>{t("penalizeMessage")}</h6>
          {penalizeEndDate && (
            <h6 className="mt-3">
              {t("endOfPenalty")}: {penalizeEndDate}
            </h6>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <NavHeader header={t("account")} />
      <PenalizeMessage show={penalizeStatus} penalizeEndDate={penalizeEndDate} />
      {showPage(account_type)}
    </>
  )
}

export default withUserGuard(AccountPage)
