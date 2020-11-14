import React from "react"
import { useState, useEffect } from "react"
import ChulaAccount from "./ChulaAccount"
import SatitAndCUPersonelAccount from "./SatitAndCUPersonelAccount"
import OtherAccount from "./OtherAccount"
import axios from "axios"

export default function AccountPage() {
  enum Account {
    CuStudent = "CuStudent",
    SatitAndCuPersonel = "SatitAndCuPersonel",
    Other = "Other",
  }

  const jwt ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmIwMDQ4ZTU5ODYwYzMzOTQ0MmFhZmUiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjA1MzcxMDIyfQ.2041BQR9ZCram8nmLVkcjZuvIFzciacRlcJ02Wgfe-U"
  let [account_type, set_account_type] = useState<Account>()

  useEffect(() => {
    fetch_account_type()
  }, [])

  const fetch_account_type = async () => {
    axios
      .get("http://localhost:3000/account_info/", {
        headers: {
          Authorization: "bearer " + jwt,
        },
      })
      .then(({ data }) => {
        console.log(data)
        set_account_type(data.account_type)
        console.log(account_type)
      })
  }

  const showPage = (account_type, jwt) => {
    switch (account_type) {
      case Account.CuStudent: {
        return <ChulaAccount jwt={jwt} />
      }
      case Account.SatitAndCuPersonel: {
        return <SatitAndCUPersonelAccount jwt={jwt} />
      }
      case Account.Other: {
        return <OtherAccount jwt={jwt} />
      }
      default: {
        return <div className="wrapper mx-auto">Loading...</div>
      }
    }
  }
  return showPage(account_type, jwt)
}
