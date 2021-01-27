import React, { useCallback, useEffect, useState } from "react"
import { Route, Switch, useRouteMatch, useLocation } from "react-router-dom"

import StaffLogin from "../components/pages/staff-pages/staff-login"
import StaffSidebar from "../components/ui/navbar/staff-sidebar"
import StaffProfile from "../components/pages/staff-pages/staff-profile"
import { NavHeader } from "../components/ui/navbar/navbarSideEffect"
import ListOfAllUsers from "../components/pages/staff-pages/list-of-all-users-pages/ListOfAllUsers"
import AddUser from "../components/pages/staff-pages/list-of-all-users-pages/AddUser"
import CuSatitInfo from "../components/pages/staff-pages/list-of-all-users-pages/CuSatitInfo"
import UserInfo from "../components/pages/staff-pages/list-of-all-users-pages/UserInfo"
import FileOpener from "../components/pages/FileOpener"
import VeritificationApproval from "../components/pages/staff-pages/verification-approval-pages/VerificationApproval"
import VerifyInfo from "../components/pages/staff-pages/verification-approval-pages/VerifyInfo"
import DisableCourt from "../components/pages/staff-pages/disable-court/disable-court.page.main"
import QRScannerPage from "../components/pages/staff-pages/staff-qrcode"
import StaffManagement from "../components/pages/staff-pages/staff-management/StaffManagement"
import Settings from "../components/pages/staff-pages/settings/Settings"

import AllReservation from "../components/pages/staff-pages/all-reservation-pages/ReservationList"
import ReservationDetail from "../components/pages/staff-pages/all-reservation-pages/ReservationDetail"
import { client } from "../../axiosConfig"

const StaffRoute = () => {
  const { path } = useRouteMatch()
  const location = useLocation()
  const headerMap: Map<string, string> = new Map([
    ["/profile", "ยินดีต้อนรับ"],
    ["/management", "การจัดการสตาฟ"], // เปลี่ยนเอา
    ["/listOfAllUsers", "รายชื่อผู้ใช้"],
    ["/addUser", "เพิ่มผู้ใช้"],
    ["/userInfo/other", "ข้อมูลผู้ใช้"],
    ["/userInfo/custudent", "ข้อมูลผู้ใช้"],
    ["/userInfo/satit", "ข้อมูลผู้ใช้"],
    ["/verifyApprove", "รับรองการลงทะเบียน"],
    ["/verifyInfo", "รับรองการลงทะเบียนรายบุคคล"],
    ["/disableCourt", "การปิดคอร์ด"],
    ["/qrcodescanner", ""],
    ["/allReservation/success", "การจองทั้งหมด"],
    ["/allReservation/waiting", "ห้องรอการจองทั้งหมด"],
    ["/reservationDetail`", ""],
  ])

  const [type, setType] = useState("staff")

  const fetchType = useCallback(() => {
    client
      .get("staffs/profile")
      .then((res) => {
        console.log(res.data.is_admin)
        if (res.data.is_admin) setType("admin")
        else setType("staff")
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    fetchType()
  }, [fetchType])

  const StaffRouteWithHeader = () => {
    return (
      <div className="staff background d-block" style={{ backgroundColor: "white", minHeight: "80vh" }}>
        <div className="container d-block">
          <div className="row justify-content-center">
            <div
              className="col"
              style={{ backgroundColor: " var(--lightpink-color)", marginTop: "5vh", marginBottom: "5vh", minHeight: "80vh", borderRadius: "15px" }}
            >
              <div className="row justify-content-center" style={{ minHeight: "80vh" }}>
                <div className="col-3 justify-content-center" style={{ maxHeight: "800px" }}>
                  <StaffSidebar type={type} />
                </div>
                <div className="col-9 mt-5" style={{ minHeight: "600px" }}>
                  <h1>
                    {headerMap.get(
                      location.pathname.slice(
                        path.length,
                        location.pathname.indexOf("/", path.length + 1) === -1 ||
                          location.pathname === `${path}/allReservation/success` ||
                          location.pathname === `${path}/allReservation/waiting`
                          ? location.pathname.length
                          : location.pathname.lastIndexOf("/")
                      )
                    )}
                  </h1>
                  <Switch>
                    <Route path={`${path}/staffProfile`} component={StaffProfile} />
                    <Route path={`${path}/disableCourt`} component={DisableCourt} />
                    <Route exact path={`${path}/listOfAllUsers`} component={ListOfAllUsers} />
                    <Route exact path={`${path}/addUser`} component={AddUser} />
                    <Route exact path={`${path}/userInfo/other/:_id`} component={UserInfo} />
                    <Route exact path={`${path}/userInfo/:accType/:_id`} component={CuSatitInfo} />
                    <Route exact path={`${path}/verifyApprove`} component={VeritificationApproval} />
                    <Route exact path={`${path}/verifyInfo/:_id`} component={VerifyInfo} />
                    <Route exact path={`${path}/qrcodescanner`} component={QRScannerPage} />
                    <Route exact path={`${path}/profile`} component={StaffProfile} />
                    <Route exact path={`${path}/management`} component={StaffManagement} />
                    <Route exact path={`${path}/settings`} component={Settings} />
                    <Route exact path={`${path}/allReservation/:pagename`} component={AllReservation} />
                    <Route exact path={`${path}/reservationDetail/:pagename/:_id`} component={ReservationDetail} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <NavHeader isOnStaffPage={true} />
      <Switch>
        <Route exact path={path} component={StaffLogin} />
        <Route exact path={`${path}/openFile/:fileId`} component={FileOpener} />
        <StaffRouteWithHeader />
      </Switch>
    </>
  )
}
export default StaffRoute
