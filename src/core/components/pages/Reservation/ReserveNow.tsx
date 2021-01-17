import React from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import withUserGuard from "../../../guards/user.guard"
import { useTranslation } from "react-i18next"
import pinkBlob from "../../../assets/images/pinkBlob.svg"
import { NavHeader } from "../../ui/navbar/navbarSideEffect"

function ReserveNow() {
  const { t } = useTranslation()

  return (
    <div className="wrapper">
      <NavHeader header={t("reserveNow")} />
      <div className="mx-auto col-md-6">
        <div className="default-mobile-wrapper mt-3 animated-card">
          <span className="row my-3">
            <h6 className="mx-3">{t("chooseReserve")} </h6>
          </span>
          <Link to={"/createwaitingroom"}>
            <div className="button-group">
              <Button variant="pink">{t("createWaitingRoom")}</Button>
            </div>
          </Link>
          <Link to={"/joinwaitingroom"}>
            <div className="button-group">
              <Button variant="darkpink">{t("joinWaitingRoom")}</Button>
            </div>
          </Link>
        </div>
      </div>
      <div className="blob-container">
        <img className="blob" alt="pink" src={pinkBlob} />
      </div>
    </div>
  )
}

export default withUserGuard(ReserveNow)
