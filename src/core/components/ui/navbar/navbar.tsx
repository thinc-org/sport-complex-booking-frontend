import React, { useState } from "react"
import { /*Navbar, Container, Nav,*/ Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuthContext } from "../../../controllers/authContext"
import { setCookie } from "../../../contexts/cookieHandler"
import Toggler from "../../../assets/images/icons/hamburger.svg"
import { CSSTransition } from "react-transition-group"
import Exit from "../../../assets/images/icons/exit.svg"
import { data } from "./sidebarData"
import { useNavHeader } from "./navbarSideEffect"
import { useTranslation } from "react-i18next"
import { useLanguge } from "../../../i18n/i18n"

const Sidebar = () => {
  const [inProp, setInProp] = useState(false)
  const { header, isOnStaffPage } = useNavHeader()
  const { isUser, setToken } = useAuthContext()
  const { t } = useTranslation()
  const { changeLanguage } = useLanguge()
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

  return (
    <div style={{ display: isOnStaffPage ? "none" : "" }}>
      <div className="sidebar-toggler d-flex flex-row justify-content-center">
        <img src={Toggler} onClick={() => setInProp(true)} alt="" />
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
              <img src={Exit} onClick={() => setInProp(false)} alt="" />
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
