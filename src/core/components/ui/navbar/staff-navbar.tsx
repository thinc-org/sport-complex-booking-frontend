import React, { useEffect, useState } from "react"
import { Navbar, NavbarBrand, Button } from "react-bootstrap"
import { Link, useLocation, useHistory } from "react-router-dom"
import { useAuthContext } from "../../../controllers/authContext"
import { setCookie } from "../../../contexts/cookieHandler"
import logo from "../../../assets/images/logo.png"

function StaffNavbar() {
  const { setToken, setIsAdmin } = useAuthContext()
  const location = useLocation()
  const history = useHistory()
  const [hide, setHidden] = useState(false)

  useEffect(() => {
    if (location.pathname.toLowerCase() === "/staff" || !location.pathname.toLowerCase().includes("/staff")) setHidden(true)
    else setHidden(false)
  }, [location])
  const onLogout = async () => {
    setToken("")
    setIsAdmin(false)
    setCookie("token", "", 0)
    history.replace("/staff")
  }

  return (
    <Navbar style={{ display: hide ? "none" : "" }}>
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
