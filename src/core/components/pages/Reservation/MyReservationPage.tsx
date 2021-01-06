import React from "react"
import { Route, useHistory, Switch, useRouteMatch } from "react-router-dom"
import { useEffect, useState } from "react"
import ReservationPage from "../Reservation/Reservation"
import ReservationDetail from "../Reservation/ReservationDetail"
import withUserGuard from "../../../guards/user.guard"

const MyReservationPage = () => {
  const history = useHistory()

  let { url, path } = useRouteMatch()

  useEffect(() => {
    history.push(path)
  }, [])

  return (
    <Switch>
      <Route exact path={`${path}/reservationdetail`} component={ReservationDetail} />
      <Route path={path} component={ReservationPage} />
    </Switch>
  )
}

export default withUserGuard(MyReservationPage)
