import React from "react"
import { useState, useEffect, useCallback } from "react"
import { client } from "../../../../axiosConfig"

function StaffProfile() {
  const [name, setName] = useState<string>()
  const [surname, setSurname] = useState<string>()
  const [accountType, setAccountType] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [errMessage, setErrMessage] = useState<string>()

  const fetchData = useCallback(() => {
    client
      .get("staffs/profile")
      .then((res) => {
        console.log("fetch data")
        setName(res.data.name)
        setSurname(res.data.surname)
        if (res.data.is_admin) {
          setAccountType("Administration")
        } else {
          setAccountType("Staff")
        }
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setErrMessage("Request Failed. Please make sure you have logged in and try refresh the page.")
      })
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (errMessage) {
    return (
      <div className="container pl-0" style={{ margin: "50px 10px", color: "red" }}>
        <h5>{errMessage}</h5>
      </div>
    )
  }
  return (
    <div className="container pl-0">
      <div style={{ display: isLoading ? "none" : "block" }}>
        <div className="box-container btn col-6 mt-4 p-3">
          <div>
            <div style={{ fontWeight: 300, fontSize: "16px", lineHeight: "24px", marginBottom: "10px" }}> ชื่อ-นามสกุล </div>
            <div style={{ fontWeight: 700, fontSize: "24px", lineHeight: "24px" }}>
              {" "}
              {name} {surname}{" "}
            </div>
          </div>
        </div>
        <br />
        <div className="box-container btn col-6 p-3">
          <div>
            <div style={{ fontWeight: 300, fontSize: "16px", lineHeight: "24px", marginBottom: "10px" }}> ประเภทบัญชี </div>
            <div style={{ fontWeight: 700, fontSize: "24px", lineHeight: "24px" }}> {accountType} </div>
          </div>
        </div>
      </div>

      <div style={{ display: isLoading ? "block" : "none", margin: "50px 10px" }}>
        <h5> LOADING ... </h5>
      </div>
    </div>
  )
}

export default StaffProfile
