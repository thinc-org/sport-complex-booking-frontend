import React from "react"
import { Button } from "react-bootstrap"
import {Link } from "react-router-dom"
import withUserGuard from "../../../guards/user.guard"
import { useTranslation } from 'react-i18next'

function ReserveNow() {  
  const {t} = useTranslation()

  return (
    <div className="wrapper">
      <h4 className="d-flex justify-content-center font-weight-bold mt-3">{t("reserve_now")}</h4>
      <div className="mx-auto col-md-6">  
        <div className="default-mobile-wrapper mt-4">
          <span className="row my-3">
            <h6 className="mx-3">{t("choose_reserve")} </h6>
          </span>
          <Link to={"/createwaitingroom"}>
            <div className="button-group">
            <Button variant="pink">{t("create_waiting_room")}</Button>
          </div>
          </Link>
          <Link to={"/joinwaitingroom"}>
            <div className="button-group">
              <Button variant="darkpink">{t("join_waiting_room")}</Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withUserGuard(ReserveNow)