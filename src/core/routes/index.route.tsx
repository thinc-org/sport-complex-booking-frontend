import React from "react"
import { Switch } from "react-router-dom"
import { Route } from "react-router"
import FrontLoginPage from "../components/pages/front-login"
import Landing from "../components/pages/LandingComponent"
import Sidebar from "../components/ui/navbar/navbar"
import StaffNavbar from "../components/ui/navbar/staff-navbar"
import AccountPage from "../components/pages/AccountPages/AccountPage"
import ReserveNow from "../components/pages/Reservation/ReserveNow"
import JoinWaitingRoom from "../components/pages/Reservation/JoinWaitingRoom"
import CreateWaitingRoom from "../components/pages/Reservation/CreateWaitingRoom"
import HomePage from "../components/pages/HomePage"
import MyReservationPage from "../components/pages/Reservation/MyReservationPage"
import ChangePassword from "../components/pages/AccountPages/AccountPageUI/ChangePassword"
import Hooray from "../components/pages/Reservation/Hooray"
import WaitingRoom from "../components/pages/Reservation/WaitingRoom"
import AboutUs from "../components/pages/AboutUs"
import FileOpener from "../components/pages/FileOpener"
const StaffRoute = React.lazy(() => import("./staff-page.route"))
export default function MainRoute() {
  return (
    <>
      <Sidebar></Sidebar>
      <StaffNavbar />
      <Switch>
        <Route exact path="/" component={Landing} />

        <Route path="/login" component={FrontLoginPage} />

        <Route
          exact
          path="/register"
          render={() => {
            return <div>Under maintenance</div>
          }}
        />

        <Route exact path="/reservenow" component={ReserveNow} />

        <Route exact path="/joinwaitingroom" component={JoinWaitingRoom} />

        <Route exact path="/createwaitingroom" component={CreateWaitingRoom} />

        <Route exact path="/account" component={AccountPage} />

        <Route path="/myreservation" component={MyReservationPage} />

        <Route exact path="/changePassword" component={ChangePassword} />

        <Route exact path="/home" component={HomePage} />

        <Route path="/staff" component={StaffRoute} />

        <Route exact path="/hooray" component={Hooray} />

        <Route exact path="/waitingroom" component={WaitingRoom} />

        <Route exact path="/aboutus" component={AboutUs} />

        <Route exact path={`/openFile/:fileId`} component={FileOpener} />
      </Switch>
    </>
  )
}
