import React, { useState, useEffect, useCallback } from "react"
import { useLocation, useHistory } from "react-router-dom"
import { client } from "../../../../axiosConfig"
import { HandleErrorModal } from "../staff-pages/staff-management/StaffManagementComponents"
import { ProfileResponse, Error } from "../../../dto/staffProfile.dto"
import { ErrorAlert } from "../staff-pages/disable-court/modals"
function StaffProfile() {
  const history = useHistory<{ invalidAccess: boolean }>()
  const location = useLocation<{ invalidAccess: boolean }>()
  const [name, setName] = useState<string>()
  const [surname, setSurname] = useState<string>()
  const [accountType, setAccountType] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [errMessage, setErrMessage] = useState<Error>({ badRequest: "", invalidAccess: "" })
  const [showError, setShowError] = useState(false)
  const fetchData = useCallback(async () => {
    try {
      const res: ProfileResponse = (await client.get("staffs/profile")).data
      setName(res.name)
      setSurname(res.surname)
      if (res.is_admin) {
        setAccountType("Administration")
      } else {
        setAccountType("Staff")
      }
      setIsLoading(false)
    } catch (err) {
      setErrMessage((prev) => ({ ...prev, badRequest: "Request Failed. Please make sure you have logged in and try refresh the page." }))
      setShowError(true)
    }
  }, [])
  const clearInvalidAcessError = () => {
    setErrMessage((prev) => ({ ...prev, invalidAccess: "" }))
    history.replace("/staff/profile", {
      ...history.location.state,
      invalidAccess: false,
    })
  }
  useEffect(() => {
    fetchData()
  }, [fetchData])
  useEffect(() => {
    if (location.state?.invalidAccess) {
      setErrMessage((prev) => ({ ...prev, invalidAccess: "สตาฟไม่สามารถเข้าถึงหน้าเพจของแอดมินได้" }))
    }
  }, [location.state])
  if (errMessage.badRequest) {
    return (
      <div className="container pl-0" style={{ margin: "50px 10px", color: "red" }}>
        <h5>{errMessage}</h5>
        <HandleErrorModal show={showError} setShow={setShowError} />
      </div>
    )
  }
  return (
    <>
      <ErrorAlert
        inProp={!!errMessage.invalidAccess}
        header="การเข้าถึงผิดพลาด"
        message="สตาฟไม่สามารถเข้าถึงหน้าเพจของแอดมินได้"
        handleClose={clearInvalidAcessError}
      />
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
            </div>{" "}
          </div>
        </div>

        <div style={{ display: isLoading ? "block" : "none", margin: "50px 10px" }}>
          <h5> LOADING ... </h5>
        </div>
      </div>
    </>
  )
}

export default StaffProfile
