import React from "react"
import { Button } from "react-bootstrap"
import {Link } from "react-router-dom"
import withUserGuard from "../../../guards/user.guard"
import { useTranslation } from 'react-i18next'
import hooray from "../../../assets/images/hooray.svg"

function Hooray() {

  const {t} = useTranslation()

  return (
    <div className="wrapper">
      <div className="mx-auto col-md-6">      
          <div className="text-center mt-5"  >
            <img alt="hooray" src={hooray} />
          </div>
          <div className="default-mobile-wrapper mt-4 pb-0">
            <h4 className="text-center">{t("hooray")},</h4>
            <p className="text-center">{t("reservationSuccess")}</p>
            <br/>
            <div className="button-group">
              <Link to={"/waiting_room"}>
                <Button variant="pink">
                  {t("viewWaitingRoom")}
                </Button>
              </Link>
          </div>
          </div>
      </div>
    </div>
  )
}

export default withUserGuard(Hooray)
