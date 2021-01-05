import React from "react"
import { Button } from "react-bootstrap"
import {Link, useHistory } from "react-router-dom"
import withUserGuard from "../../../guards/user.guard"
import { useTranslation } from 'react-i18next'
import hooray from "../../../assets/images/hooray.svg"
import { Redirect } from "react-router-dom"
import { HoorayHistoryStates } from './ReservationInterfaces'

function Hooray() {
  const {t} = useTranslation()
  const defaultHistory: HoorayHistoryStates = {msg: {fromJoinWaitingRoom: false}}
  const history = useHistory<HoorayHistoryStates>()
  const {msg} = history.location.state ? history.location.state : defaultHistory
  const legitFlow = msg && msg.fromJoinWaitingRoom ? msg.fromJoinWaitingRoom : false
  return (
    <div className="wrapper">
      {legitFlow ? null : <Redirect to={"/home"} />}
      <div className="mx-auto col-md-6 animated-card">      
          <div className="text-center mt-5"  >
            <img alt="hooray" src={hooray} />
          </div>
          <div className="default-mobile-wrapper mt-4 pb-0">
            <h4 className="text-center">{t("hooray")}</h4>
            <p className="text-center">{t("reservationSuccess")}</p>
            <br/>
            <div className="button-group">
              <Link to={"/myreservation"}>
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
