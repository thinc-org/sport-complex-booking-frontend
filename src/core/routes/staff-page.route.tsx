import React from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import StaffLogin from "../components/pages/staff-pages/staff-login"
import StaffSidebar from "../components/ui/navbar/staff-sidebar"
import StaffProfile from "../components/pages/staff-pages/staff-profile"
import { NavHeader } from "../components/ui/navbar/navbarSideEffect"
import ListOfAllUsers from "../components/pages/staff-pages/list-of-all-users-pages/ListOfAllUsers"
import AddUser from "../components/pages/staff-pages/list-of-all-users-pages/AddUser"
import CUInfo from "../components/pages/staff-pages/list-of-all-users-pages/CUInfo"
import UserInfo from "../components/pages/staff-pages/list-of-all-users-pages/UserInfo"
import VeritificationApproval from "../components/pages/staff-pages/verification-approval-pages/VerificationApproval"
import VerifyInfo from "../components/pages/staff-pages/verification-approval-pages/VerifyInfo"
import DisableCourt from "../components/pages/staff-pages/disable-court/disable-court.page.main"

const StaffRoute = () => {
  const { path } = useRouteMatch()
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
        <div className="col-9 mt-5" style={{ minHeight: "600px" }}>
          <h1> {header} </h1>
          {page}
        </div>
      </div>
    )
  }
  return (
    <>
      <NavHeader isOnStaffPage={true} />
      <Switch>
        <Route exact path={path} component={StaffLogin} />
        {/* example
            add pages here staff(page)*/}
        <Route path={`${path}/staffProfile`} render={() => staff(<StaffProfile />, "ยินดีต้อนรับ")} />
        <Route path={`${path}/disableCourt`} render={() => staff(<DisableCourt />, "การปิดคอร์ด")} />
        {/* add pages here staff(page) */}
        <Route path={`${path}/staffManagement`} render={() => <div>under maintainance</div>} />
        <Route exact path={`${path}/listOfAllUsers`} render={(props) => staff(<ListOfAllUsers {...props} />, "รายชื่อผู้ใช้")} />
        <Route exact path={`${path}/addUser`} render={(props) => staff(<AddUser {...props} />, "เพิ่มผู้ใช้")} />
        <Route exact path={`${path}/cuInfo/:_id`} render={(props) => staff(<CUInfo {...props} />, "ข้อมูลผู้ใช้")} />
        <Route exact path={`${path}/userInfo/:_id`} render={(props) => staff(<UserInfo {...props} />, "ข้อมูลผู้ใช้")} />
        <Route exact path={`${path}/verifyApprove`} render={(props) => staff(<VeritificationApproval {...props} />, "รับรองการลงทะเบียน")} />
        <Route exact path={`${path}/verifyInfo/:username`} render={(props) => staff(<VerifyInfo {...props} />, "รับรองการลงทะเบียนรายบุคคล")} />
      </Switch>
    </>
  )
}

export default StaffRoute
