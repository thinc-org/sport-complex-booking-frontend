import React from "react"
import { useState, useEffect, useContext } from "react"
import ChulaAccount from "./ChulaAccount"
import SatitAndCUPersonelAccount from "./SatitAndCUPersonelAccount"
import OtherAccount from "./OtherAccount"
import axios from "axios"
import { UserContext } from "../../../contexts/UsersContext"
import {useAuthContext } from "../../../controllers/authContext"
import { getCookie } from "../../../contexts/cookieHandler"
import withUserGuard from "../../../guards/user.guard"
import { useTranslation } from 'react-i18next'

function AccountPage() {
  enum Account {
    CuStudent = "CuStudent",
    SatitAndCuPersonel = "SatitAndCuPersonel",
    Other = "Other",
  }

  const {token} = useAuthContext()
  const { setCuStudent, setSatit, setOther, setLanguage, is_thai_language } = useContext(UserContext)
  const [account_type, setAccountType] = useState();
  const [penalizeStatus, setPenalizeStatus] = useState();  
  const {i18n} = useTranslation()

  useEffect(() => {
    fetch_account_type()
  }, [])

  const fetch_account_type = async () => {
    await axios
      .get("http://localhost:3000/account_info/", {
        headers: {
          Authorization: "bearer " + token,
        },
      })
      .then(({ data }) => {
        data.jwt = token
        const newData = {...data}
        setPenalizeStatus(data.is_penalize)
        data.rejected_info ? (
          data.rejected_info.forEach((field)=> {
            newData[field] = ""
          })
        ) : (
          console.log("No rejected info")
        )

        if (data.account_type === "CuStudent") {
          setCuStudent(newData)
        } else if (data.account_type === "SatitAndCuPersonel") {
          setSatit(newData)
        } else if (data.account_type === "Other") {
          setOther(newData)
        }
        setLanguage(getCookie("is_thai_language")==="true")
        if (getCookie("is_thai_language")==="true") i18n.changeLanguage('th');
        else i18n.changeLanguage('en')
        setAccountType(data.account_type)
      })
  }

  const showPage = (account_type: String | undefined) => {
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
        return <div className="wrapper mx-auto text-center mt-5">Loading...</div>
      }
    }
  } 

  return (
    <>
      <PenalizeMessage show={penalizeStatus} is_thai_language={is_thai_language}/>
      {showPage(account_type)}
    </>
  )
  
}

export default withUserGuard(AccountPage)


interface PenalizeMessageProps {
  show?: boolean,
  is_thai_language: boolean
}

const PenalizeMessage:React.FC<PenalizeMessageProps> = ({show, is_thai_language}) => {
   if(!show) return null
   return (
      <div className="alert alert-danger mx-3 mt-3" role="alert">
        <h3>{is_thai_language ? "คำเตือน" : "You are being penalized"}</h3>
        <h6>{is_thai_language ? "คุณจะไม่สามารถทำการจองได้จนกว่าระยะเวลาการลงโทษของคุณจะสิ้นสุดลง" : "You will not be able to make reservations until your penalized period is over"}</h6>
      </div>
   )
}