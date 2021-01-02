import React from "react"
import { useState, useEffect, useContext } from "react"
import ChulaAccount from "./ChulaAccount"
import SatitAndCUPersonelAccount from "./SatitAndCUPersonelAccount"
import OtherAccount from "./OtherAccount"
import { UserContext, CuStudent, SatitCuPersonel, Other, DefaultAccount } from "../../../contexts/UsersContext"
import withUserGuard from "../../../guards/user.guard"
import { useTranslation } from 'react-i18next'
import { Loading } from "../../ui/loading/loading"
import { client } from "../../../../axiosConfig"

function AccountPage() {
  enum Account {
    CuStudent = "CuStudent",
    SatitAndCuPersonel = "SatitAndCuPersonel",
    Other = "Other",
  }

  const { setCuStudentAccount, setSatitCuPersonelAccount, setOtherAccount } = useContext(UserContext)
  const [account_type, setAccountType] = useState<string>()
  const [penalizeStatus, setPenalizeStatus] = useState<boolean>()

  useEffect(() => {
    fetch_account_type()
  }, [])

  const fetch_account_type = async () => {
    await client
      .get<DefaultAccount>("/account_info/")
      .then(({ data }) => {
        const newData = {...data}
        setPenalizeStatus(data.is_penalize)
        if (data.account_type === "CuStudent") {
          setCuStudentAccount(newData as CuStudent)
        } else if (data.account_type === "SatitAndCuPersonel") {
          setSatitCuPersonelAccount(newData as SatitCuPersonel)
        } else if (data.account_type === "Other") {
          const other = data as Other
          other.rejected_info ? (
            other.rejected_info.forEach((field: string)=> {
              newData[field] = ""
            })
          ) : ( console.log("No rejected info"))
          setOtherAccount(newData as Other)
        }
        setAccountType(data.account_type)
      })
  }

  const showPage = (account_type: string | undefined) => {
    switch (account_type) {
      case Account.CuStudent: {
        return <ChulaAccount />
      }
      case Account.SatitAndCuPersonel: {
        return <SatitAndCUPersonelAccount/>
      }
      case Account.Other: {
        return <OtherAccount/>
      }
      default: {
        return <div className="wrapper mx-auto text-center mt-5"><Loading /></div>
      }
    }
  } 

  return (
    <>
      <PenalizeMessage show={penalizeStatus}/>
      {showPage(account_type)}
    </>
  )
  
}

export default withUserGuard(AccountPage)


interface PenalizeMessageProps {
  show?: boolean,
}

const PenalizeMessage:React.FC<PenalizeMessageProps> = ({show}) => {
  const {t} = useTranslation()
  if(!show) return null
  return (
    <div className="alert alert-danger mx-3 mt-3" role="alert">
      <h3>{t("youArePenalized")}</h3>
      <h6>{t("penalizeMessage")}</h6>
    </div>
  )
}