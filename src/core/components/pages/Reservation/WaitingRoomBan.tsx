import React, { useCallback } from "react"
import { Button } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useEffect } from "react"
import withUserGuard from "../../../guards/user.guard"
import { History, LocationState } from "history"
import { useTranslation } from "react-i18next"
import { client } from "../../../../axiosConfig"

interface historyProps {
  history: History<LocationState>
}

function WaitingRoomBan(props: historyProps) {
  const state = ((props.history["location"] && props.history["location"]["state"]) || {}) as { msg: string }
  const { t } = useTranslation()
  const history = useHistory<LocationState | unknown>()

  const fetchValidity = useCallback(async () => {
    await client
      .post("/reservation/checkvalidity")
      .then((response) => {
        const resMsg = response["data"]["message"]
        if (resMsg === "valid user") {
          //history.push({pathname: '/home'});
        }
      })
      .catch((error) => {
        console.log(error)
        history.push({ pathname: "/login" })
      })
  }, [history])

  useEffect(() => {
    fetchValidity()
  }, [fetchValidity])

  return (
    <div className="wrapper">
      <div className="mx-auto col-md-6">
        <div className="default-mobile-wrapper mt-4">
          <h4>{state.msg}</h4>
          <p>{t("waiting_room_ban")}</p>
          <Link to={"/"}>
            <div className="button-group">
              <Button className="mt-3 mb-0" variant="darkpink">
                {t("back_to_home")}
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withUserGuard(WaitingRoomBan)
