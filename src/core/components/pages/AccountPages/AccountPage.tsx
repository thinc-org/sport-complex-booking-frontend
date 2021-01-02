import React, { useCallback } from "react"
import { useState, useEffect, useContext } from "react"
import ChulaAccount from "./ChulaAccount"
import SatitAndCUPersonelAccount from "./SatitAndCUPersonelAccount"
import OtherAccount from "./OtherAccount"
import axios from "axios"
import { UserContext } from "../../../contexts/UsersContext"
import { useAuthContext } from "../../../controllers/authContext"
import { getCookie } from "../../../contexts/cookieHandler"
import withUserGuard from "../../../guards/user.guard"
import { useTranslation } from "react-i18next"

function AccountPage() {
  enum Account {
    CuStudent = "CuStudent",
    SatitAndCuPersonel = "SatitAndCuPersonel",
    Other = "Other",
  }

  const { token } = useAuthContext()
  const { setCuStudentAccount, setSatitCuPersonelAccount, setOtherAccount } = useContext(UserContext)
  const [account_type, setAccountType] = useState()
  const [penalizeStatus, setPenalizeStatus] = useState()
  const { i18n } = useTranslation()

  const fetch_account_type = useCallback(async () => {
    await axios
      .get("http://localhost:3000/account_info/", {
        headers: {
          Authorization: "bearer " + token,
        },
      })
      .then(({ data }) => {
        data.jwt = token
        const newData = { ...data }
        setPenalizeStatus(data.is_penalize)
        data.rejected_info
          ? data.rejected_info.forEach((field) => {
              newData[field] = ""
            })
          : console.log("No rejected info")

        if (data.account_type === "CuStudent") {
          setCuStudentAccount(newData)
        } else if (data.account_type === "SatitAndCuPersonel") {
          setSatitCuPersonelAccount(newData)
        } else if (data.account_type === "Other") {
          setOtherAccount(newData)
        }
        //setLanguage(getCookie("is_thai_language")==="true")
        if (getCookie("is_thai_language") === "true") i18n.changeLanguage("th")
        else i18n.changeLanguage("en")
        setAccountType(data.account_type)
      })
  }, [i18n, setCuStudentAccount, setOtherAccount, setSatitCuPersonelAccount, token])

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
        return <div className="wrapper mx-auto text-center mt-5">Loading...</div>
      }
    }
  }

  return (
    <>
      <PenalizeMessage show={penalizeStatus} />
      {showPage(account_type)}
    </>
  )
}

export default withUserGuard(AccountPage)

interface PenalizeMessageProps {
  show?: boolean
}

const PenalizeMessage: React.FC<PenalizeMessageProps> = ({ show }) => {
  const { t } = useTranslation()
  if (!show) return null
  return (
    <div className="alert alert-danger mx-3 mt-3" role="alert">
      <h3>{t("you_are_penalied")}</h3>
      <h6>{t("penalzie_message")}</h6>
    </div>
  )
}
