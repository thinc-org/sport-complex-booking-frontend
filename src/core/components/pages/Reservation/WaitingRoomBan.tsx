import React from "react"
import { Button } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useEffect } from "react"
import withUserGuard from "../../../guards/user.guard"
import { useTranslation } from 'react-i18next'
import { client } from "../../../../axiosConfig"
import { BanHistoryStates } from './ReservationInterfaces'

function WaitingRoomBan() {
  const {t} = useTranslation()
  const defaultHistory: BanHistoryStates = {msg: t("waitingRoomBan")}
  const history = useHistory<BanHistoryStates>()
  const {msg} = history.location.state ? history.location.state : defaultHistory
  
  useEffect(()=> {
    fetchValidity()
  }, [])

  const fetchValidity = async () => {
    await client.post("/reservation/checkvalidity")
    .then(({data}) => {
      let resMsg = data['message']
      if (resMsg === "Valid user") {
        history.push({pathname: '/home'})
      }
    })
    .catch(() => {})
  }

  return (
    <div className="wrapper">
      <div className="mx-auto col-md-6">
        <div className="default-mobile-wrapper mt-4">
          <h4>{msg}</h4>
          <p>{t("penalizeMessage")}</p>
          <Link to={"/"}>
            <div className="button-group">
              <Button className="mt-3 mb-0" variant="darkpink">{t("backToHome")}</Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withUserGuard(WaitingRoomBan)
