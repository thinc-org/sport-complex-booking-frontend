import React from "react"
import { useState, useEffect, useContext } from "react"
import ChulaAccount from "./ChulaAccount"
import SatitAndCUPersonelAccount from "./SatitAndCUPersonelAccount"
import OtherAccount from "./OtherAccount"
import axios from "axios"
import { NavHeader } from '../../ui/navbar/navbarSideEffect'
import { UserContext } from "../../../contexts/UsersContext"


export default function AccountPage() {
  enum Account {
    CuStudent = "CuStudent",
    SatitAndCuPersonel = "SatitAndCuPersonel",
    Other = "Other",
  }

  let [account_type, set_account_type] = useState();

  const userContext = useContext(UserContext);
  const jwt ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmRiMWQ0NTJhZGJmZDM5MThkZmIxZWIiLCJpc1N0YWZmIjpmYWxzZSwiaWF0IjoxNjA4MTk1Mzk3LCJleHAiOjE2MDg4MDAxOTd9.qw9oZkFwC5jfkK0F-nnkSsIGuBIiZD9h0f19wgTkFvo"

  useEffect(() => {
    fetch_account_type()
  }, [])

  const fetch_account_type = async () => {
    await axios
      .get("http://localhost:3000/account_info/", {
        headers: {
          Authorization: "bearer " + jwt,
        },
      })
      .then(({ data }) => {
        data.jwt = jwt
        if (data.account_type === "CuStudent") {
          userContext.setCuStudent(data)
        } else if (data.account_type === "SatitAndCuPersonel") {
          userContext.setSatit(data)
        } else if (data.account_type === "Other") {
          userContext.setOther(data)
        }
        set_account_type(data.account_type)

      })
  }

  const showPage = (account_type: any, jwt: String) => {
    switch (account_type) {
      case Account.CuStudent: {
        return <ChulaAccount />
      }
      case Account.SatitAndCuPersonel: {
        return <SatitAndCUPersonelAccount/>
      }
      case Account.Other: {
        return <OtherAccount jwt={jwt} />
      }
      default: {
        return <div className="wrapper mx-auto">Loading...</div>
      }
    }
  }
  
  return (<UserContext.Consumer>{(context) => {
    
    return (
      <>
        <NavHeader header="Account" />
        { 
          showPage(account_type, jwt)
        }
      </>
    )
  }}</UserContext.Consumer>)
  
}
