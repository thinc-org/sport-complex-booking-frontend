import React, { useState } from "react"
import { Navbar, Container, Nav, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuthContext } from "../../../controllers/authContext"
import { setCookie } from "../../../contexts/cookieHandler"
import Toggler from "../../../assets/images/icons/hamburger.svg"
import { CSSTransition } from "react-transition-group"
import Exit from "../../../assets/images/icons/exit.svg"
import { data } from "./sidebarData"
import { useNavHeader } from "./navbarSideEffect"
import { useTranslation } from "react-i18next"

export const NavigationBar = () => {
  return (
    <Navbar expand="lg" style={{ background: "var(--bg-color)", paddingTop: "60px" }}>
      <Container>
        <div className="w-100 d-flex">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand as="span" className="ml-5">
            <Link to="/"></Link>
          </Navbar.Brand>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto nav-link-group">
            <Nav.Link as="span">
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link to="/">Account</Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link to="/">My reservation</Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link to="/">Waiting Room</Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link to="/">Reserve Now</Link>
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link as="span" className="nav-right">
              <Link to="/login">Sign in</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

const Sidebar = () => {
  const [inProp, setInProp] = useState(false)
  const { header, isOnStaffPage } = useNavHeader()
  const { isUser, setToken } = useAuthContext()
  const { t } = useTranslation()
  const listItems = data.map((item, index) => (
    <li key={index}>
      <Link className="styled-link" to={item.path} onClick={() => setInProp(false)}>
        {t(item.name)}
      </Link>
    </li>
  ))
  const onLogOut = () => {
    setToken("")
    setCookie("token", null, 0)
    setInProp(false)
  }

  const { i18n } = useTranslation()

  const changeLanguage = (language: string) => {
    setCookie("is_thai_language", language === "th", 999)
    i18n.changeLanguage(language)
  }

  return (
    <div style={{ display: isOnStaffPage ? "none" : "" }}>
      <div className="sidebar-toggler d-flex flex-row justify-content-center">
        <img src={Toggler} alt="" onClick={() => setInProp(true)} />
        <h1 className="d-flex flex-row justify-content-center w-100">{header ? header : t("cuSportCenter")}</h1>
      </div>
      <CSSTransition in={inProp} timeout={300} classNames="fade">
        <div className="sidebar">
          <nav>
            <div
              style={{
                paddingBottom: "64px",
              }}
            >
              <img src={Exit} alt="" onClick={() => setInProp(false)}></img>
            </div>
            <ul className="sidebar-menu d-flex flex-column justify-content-between h-100">
              <div>{listItems}</div>
              <div>
                <li className="m-0 p-0">{t("language")}</li>
                <Button variant="pink" size="sm" className="btn" onClick={() => changeLanguage("en")}>
                  en
                </Button>
                <Button variant="pink" size="sm" className="btn" onClick={() => changeLanguage("th")}>
                  th
                </Button>
                <li>
                  {!isUser ? (
                    <Link to="/login" className="styled-link" onClick={() => setInProp(false)}>
                      {t("signIn")}
                    </Link>
                  ) : (
                    <Link to="/" className="styled-link" onClick={onLogOut}>
                      {t("signOut")}
                    </Link>
                  )}
                </li>
              </div>
            </ul>
          </nav>
        </div>
      </CSSTransition>
      <span className="backdrop" style={{ display: inProp ? "flex" : "none" }} />
    </div>
  )
}
export default Sidebar
