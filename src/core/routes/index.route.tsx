import * as React from "react"
import { useState, useEffect } from "react"
import { Switch } from "react-router-dom"
import { Route } from "react-router"
import FrontLoginPage from "../components/pages/front-login"
import Landing from "../components/pages/LandingComponent"
import StaffLogin from "../components/pages/staff-login"
import StaffSidebar from "../components/ui/navbar/staff-sidebar"
import Sidebar from "../components/ui/navbar/navbar"
import StaffProfile from "../components/pages/staff-pages/staff-profile"
import StaffNavbar from "../components/ui/navbar/staff-navbar"
import ReserveNow from "../components/pages/ReserveNow"
import JoinWaitingRoom from "../components/pages/JoinWaitingRoom"
import AccountPage from "../components/pages/AccountPage"

import ListOfAllUsers from "../components/pages/staff-pages/list-of-all-users-pages/ListOfAllUsers"
import AddUser from "../components/pages/staff-pages/list-of-all-users-pages/AddUser"
import CUInfo from "../components/pages/staff-pages/list-of-all-users-pages/CUInfo"
import UserInfo from "../components/pages/staff-pages/list-of-all-users-pages/UserInfo"
import VeritificationApproval from "../components/pages/staff-pages/verification-approval-pages/VerificationApproval"
import VerifyInfo from "../components/pages/staff-pages/verification-approval-pages/VerifyInfo"
import FrontLoginMain from "../components/ui/login/login-main"


export default function MainRoute() {

  function staff(page, header) {
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
                  <StaffSidebar />
                </div>
                <div className="col-9 mt-5" style={{ minHeight: "600px" }}>
                  <h1> {header} </h1>
                  {page}
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
      <Sidebar></Sidebar>
      <StaffNavbar />
      <Switch>
        <Route exact path="/" component={Landing} />

        <Route path="/login" component={FrontLoginPage} />

        <Route exact path="/register" render={() => {
          return <div>Under maintenance</div>
        }} />

        <Route exact path="/profile" render={() => {
          return <div>Under maintenance</div>
        }} />

        <Route exact path='/staffLogin' component={StaffLogin} />

        <Route
          path="/staffprofile"
          render={() => {
            return staff(<StaffProfile />, "ยินดีต้อนรับ")
            // example
            // add pages here staff(page)
          }}
        />

        <Route
          path="/จัดการสตาฟ"
          render={() => {
            return (
              // add pages here staff(page)
              <div>under maintainance</div>
            )
          }}
        />

        <Route path='/reservenow' component={ReserveNow} />

        <Route path='/joinwaitingroom' component={JoinWaitingRoom} />

        <Route path='/account' component={AccountPage} />

        <Route
          exact
          path="/listOfAllUsers"
          render={(props) => {
            return staff(<ListOfAllUsers {...props} />, "รายชื่อผู้ใช้")
          }}
        />
        <Route
          exact
          path="/addUser"
          render={(props) => {
            return staff(<AddUser {...props} />, "เพิ่มผู้ใช้")
          }}
        />
        <Route
          exact
          path="/cuInfo/:_id"
          render={(props) => {
            return staff(<CUInfo {...props} />, "ข้อมูลผู้ใช้")
          }}
        />
        <Route
          exact
          path="/userInfo/:_id"
          render={(props) => {
            return staff(<UserInfo {...props} />, "ข้อมูลผู้ใช้")
          }}
        />
        <Route
          exact
          path="/verifyApprove"
          render={(props) => {
            return staff(<VeritificationApproval {...props} />, "รับรองการลงทะเบียน")
          }}
        />
        <Route
          exact
          path="/verifyInfo/:username"
          render={(props) => {
            return staff(<VerifyInfo {...props} />, "รับรองการลงทะเบียนรายบุคคล")
          }}
        />
      </Switch>
    </>
  )
}
