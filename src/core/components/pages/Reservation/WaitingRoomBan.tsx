import React from "react"
import { Button } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useEffect } from "react"
import withUserGuard from "../../../guards/user.guard"
import { LocationState } from "history"
import { useTranslation } from 'react-i18next'
import { client } from "../../../../axiosConfig"
import { HistoryProps } from "./ReservationInterfaces"

function WaitingRoomBan(props: HistoryProps) {

  const { msg } = (props['location'] && props['location']['state']) || {}
  const {t} = useTranslation()
  const history = useHistory<LocationState | unknown>()
  
  useEffect(()=> {
    fetchValidity()
  }, [])

  const fetchValidity = async () => {
    await client.post("/reservation/checkvalidity")
    .then((response) => {
      let resMsg = response['data']['message']
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
