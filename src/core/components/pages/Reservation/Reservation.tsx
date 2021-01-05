import React from "react"
import { Button } from "react-bootstrap"
import { useRouteMatch, useHistory } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
import { client } from "../../../../axiosConfig"
import { timeConversion } from "../Reservation/timeConversion"
import { AxiosResponse } from "axios"
import { NavHeader } from "../../ui/navbar/navbarSideEffect"
import { useTranslation } from "react-i18next"
import { Loading } from "../../ui/loading/loading"

interface ReservationResponse {
  _id: string
  is_check: boolean
  sport_id: string
  court_number: number
  date: Date
  time_slot: number[]
}

const ReservationPage = (props: any) => {
  const history = useHistory()

  const [lists, setLists] = useState<Array<ReservationResponse>>([])
  const [isLoading, setIsLoading] = useState(true)
  var { url, path } = useRouteMatch()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    fetchData()
    console.log("fetch data")
  }, [])

  const fetchData = useCallback(async () => {
    try {
      const res: AxiosResponse = await client.get("/myreservation")
      setLists(res.data)
      setIsLoading(false)
    } catch (err) {
      console.log(err.message)
    }
  }, [])

  const handleClick = (id: string) => {
    console.log("button clicked")
    return history.push({
      pathname: `${path}/reservationdetail`,
      state: {
        id: id,
        path: path,
      },
    })
  }

  if (lists && lists.length && !isLoading) {
    return (
      <>
        <NavHeader header={t("myReservation")} />
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-12">
              {lists.map((list) => {
                return (
                  <Button
                    variant="pink"
                    onClick={() => handleClick(list._id)}
                    className="box-container btn"
                    style={{ width: "100%", color: "black", borderColor: "transparent" }}
                  >
                    <div>
                      <h5 style={{ color: "lightgreen", float: "right" }}> {list.is_check ? t("checkedIn") : ""} </h5>
                      <h5 className="mb-2"> {list.sport_id[`sport_name_${i18n.language}`]} </h5>
                      <h6 className="mb-0 font-weight-light">
                        {" "}
                        {t("court")}: {list.court_number}{" "}
                      </h6>
                      <h6 className="mb-0 font-weight-light">
                        {" "}
                        {t("bookingDate")}: {new Date(list.date).toLocaleDateString()}{" "}
                      </h6>
                      <h6 className="mb-0 font-weight-light">
                        {" "}
                        {t("bookingTime")}: {list.time_slot.map((eachTimeSlot) => timeConversion(eachTimeSlot))}{" "}
                      </h6>
                    </div>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </>
    )
  } else if (!isLoading) {
    return (
      <>
        <NavHeader header={t("myReservation")} />
        <div className="container">
          <div className="row justify-content-center mt-5 grey" style={{ fontWeight: 400 }}>
            You have no any reservations.
          </div>
        </div>
      </>
    )
  }
  return (
    <div className="wrapper mx-auto text-center mt-5">
      <Loading />
    </div>
  )
}

export default ReservationPage
