import React, { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { client } from "../../../axiosConfig"
import { useTranslation } from "react-i18next"
import { CookieModal } from "../ui/Modals/CookieModal"
import { PersonCircle, Calendar, PeopleFill, BookmarkFill, QuestionCircle } from "react-bootstrap-icons"
import withUserGuard from "../../guards/user.guard"
import footer from "../../assets/images/footer.svg"
import { Loading } from "../ui/loading/loading"
import { useLanguage } from "../../utils/language"
import { NameResponse } from "../../dto/account.dto"
import JoinWaitingRoom from "./Reservation/JoinWaitingRoom"
import { Row } from "react-bootstrap"

const HomePage = () => {
  const [cookieConsent, setCookieConsent] = useState(() => localStorage.getItem("Cookie Allowance") === "true")
  const [name, setName] = useState<NameResponse>()
  const [disable, setDisable] = useState(true)
  const { t } = useTranslation()
  const language = useLanguage()
  const languageName = language === "th" ? "name_th" : "name_en"
  const [isLoading, setIsLoading] = useState(true)

  const fetchUserName = useCallback(async () => {
    try {
      const res = await client.get("/account_info/")
      setName(res.data)
      if (res.data.name_en) setDisable(false)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    fetchUserName()
  }, [fetchUserName])

  const handleClick = () => {
    setCookieConsent(true)
    localStorage.setItem("Cookie Allowance", "true")
    return cookieConsent
  }

  if (isLoading) {
    return (
      <div className="wrapper mx-auto text-center mt-5">
        <Loading />
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <img alt="" src={footer} style={{ position: "fixed", bottom: 0, zIndex: 0, height: "45%", width: "100%" }} />
        <div className="col-12">
          <div style={{ fontSize: "24px", marginBottom: "30px", fontWeight: 400, lineHeight: "17px", textAlign: "center" }}>
            {" "}
            {t("welcome")}, {name && name[languageName]}
          </div>
          {disable && (
            <>
              <div className="homepage-warning-head"> {t("warning")}: </div>
              <div className="homepage-warning-body"> {t("fillAccount")} </div>
            </>
          )}
          <Link to="/account" className="box-container btn link">
            <div>
              <PersonCircle className="homepage-icon darkgrey pl-3 pt-2 pb-2" color="black" size={40} />
              <div className="linkhead"> {t("account")} </div>
              <div className="linkbody darkgrey"> {t("accountDescription")} </div>
            </div>
          </Link>

          <Link to={disable ? "/home" : "/myreservation"} className="box-container btn link">
            <div>
              <Calendar className="homepage-icon darkgrey pl-3 pt-2 pb-2" color="black" size={40} />
              <div className="linkhead"> {t("myReservation")} </div>
              <div className="linkbody darkgrey"> {t("myReservationDescription")} </div>
            </div>
          </Link>
          <Link to={disable ? "/home" : "/waitingroom"} className="box-container btn link">
            <div>
              <PeopleFill className="homepage-icon darkgrey pl-3 pt-2 pb-2" color="black" size={40} />
              <div className="linkhead"> {t("myWaitingRoom")} </div>
              <div className="linkbody darkgrey"> {t("myWaitingRoomDescription")} </div>
            </div>
          </Link>
          <div className="px-4  my-3 ">
            <Row className="justify-content-between">
              <span className="linkhead font-weight-bold">{t("reserveNow")}</span>
              <QuestionCircle className="mt-2" size={20} />
            </Row>
          </div>
          <Link to={disable ? "/home" : "/createwaitingroom"} className="box-container btn btn-pink-pink link">
            <div>
              <BookmarkFill className="homepage-icon pl-3 pt-2 pb-2" color="white" size={40} />
              <div className="linkhead"> {t("reserveNow")} </div>
              <div className="linkbody"> {t("reserveNowDescription")} </div>
            </div>
          </Link>
          <div className="px-4  my-3 ">
            <Row className="justify-content-between">
              <span className="linkhead font-weight-bold">{t("joinYourFriends")}</span>
              <QuestionCircle className="mt-2" size={20} />
            </Row>
          </div>
          <div className="higher">
            <JoinWaitingRoom />
          </div>

          <CookieModal show={!cookieConsent} handleClick={handleClick} />
        </div>
      </div>
    </div>
  )
}

export default withUserGuard(HomePage)
