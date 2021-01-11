import React from "react"
import { Route, useHistory, Switch, useRouteMatch } from "react-router-dom"
import { useEffect } from "react"
import ReservationPage from "../Reservation/Reservation"
import ReservationDetail from "../Reservation/ReservationDetail"
import withUserGuard from "../../../guards/user.guard"

const MyReservationPage = () => {
  const history = useHistory()

  let { path } = useRouteMatch()

  useEffect(() => {
    history.push(path)
  }, [history, path])

  return (
    <Switch>
      <Route exact path={`${path}/reservationdetail`} component={ReservationDetail} />
      <Route path={path} component={ReservationPage} />
    </Switch>
  )
}

export default withUserGuard(MyReservationPage)
