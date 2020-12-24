import React from "react"
import { useState, useEffect, useContext } from "react"
import ChulaAccount from "./ChulaAccount"
import SatitAndCUPersonelAccount from "./SatitAndCUPersonelAccount"
import OtherAccount from "./OtherAccount"
import axios from "axios"
import { UserContext } from "../../../contexts/UsersContext"
import {useAuthContext } from "../../../controllers/authContext"
import { getCookie, setCookie } from "../../../contexts/cookieHandler"
import withUserGuard from "../../../guards/user.guard"

function AccountPage() {
  enum Account {
    CuStudent = "CuStudent",
    SatitAndCuPersonel = "SatitAndCuPersonel",
    Other = "Other",
  }

  const {token} = useAuthContext()
  const { setCuStudent } = useContext(UserContext)
  const { setSatit } = useContext(UserContext)
  const { setOther } = useContext(UserContext)
  const { setLanguage } = useContext(UserContext)

  let [account_type, setAccountType] = useState();
  let [penalizeStatus, setPenalizeStatus] = useState();
  const userContext = useContext(UserContext);
  const jwt = userContext.jwt

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
        data.jwt = jwt
        let newData = {...data}
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
  
  const showPenalized = () => {
    return (
      <div className="alert alert-danger mx-3 mt-3" role="alert">
        <h3>{penalizeStatus ? "คำเตือน" : "You are being penalized"}</h3>
        <h6>{penalizeStatus ? "คุณจะไม่สามารถทำการจองได้จนกว่าระยะเวลาการลงโทษของคุณจะสิ้นสุดลง" : "You will not be able to make reservations until your penalized period is over"}</h6>
      </div>
    )
  }

  return (
    <>
      {penalizeStatus ? showPenalized(): <></>}
      {showPage(account_type)}
    </>
  )
  
}

export default withUserGuard(AccountPage)
