import React from "react"
import { Navbar, NavbarBrand, Button } from "react-bootstrap"
import { Link, useLocation, useHistory } from "react-router-dom"
import { useAuthContext } from "../../../controllers/authContext"
import { setCookie } from "../../../contexts/cookieHandler"
import { useNavHeader } from "./navbarSideEffect"
import logo from "../../../assets/images/logo.png"

function StaffNavbar() {
  const { isOnStaffLoginPage, isOnStaffPage } = useNavHeader()
  const { setToken } = useAuthContext()
  const location = useLocation()
  const history = useHistory()

  const onLogout = async () => {
    setToken("")
    setCookie("token", "", 0)
    history.replace("/staff")
  }

  return (
    <Navbar style={{ display: isOnStaffLoginPage || !isOnStaffPage ? "none" : "" }}>
      <NavbarBrand className="mr-auto">
        <img className="logo" src={logo} alt="" />
      </NavbarBrand>
      <NavbarBrand>
        <Button
          className="d-flex align-items-center"
          style={{ backgroundColor: "black", borderColor: "black", borderRadius: "15px", maxHeight: "52px", minWidth: "170px", marginRight: "8vw" }}
        >
          <Link to="/staff" onClick={onLogout} className="styled-link" style={{ textAlign: "center", width: "100%" }}>
            ออกจากระบบ
          </Link>
        </Button>
      </NavbarBrand>
    </Navbar>
  )
}

export default StaffNavbar
