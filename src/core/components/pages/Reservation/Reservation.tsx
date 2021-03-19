import React, { useState, useEffect, useCallback } from "react"
import { Button } from "react-bootstrap"
import { useRouteMatch, useHistory } from "react-router-dom"

import { client } from "../../../../axiosConfig"
import { timeConversion } from "../Reservation/timeFormating"
import { AxiosResponse } from "axios"
import { NavHeader } from "../../ui/navbar/navbarSideEffect"
import { useTranslation } from "react-i18next"
import { Loading } from "../../ui/loading/loading"
import { useLanguage } from "../../../utils/language"
import { ReservationResponse } from "../../../dto/reservation.dto"

const ReservationPage = () => {
  const history = useHistory()

  const [lists, setLists] = useState<ReservationResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { path } = useRouteMatch()
  const { t } = useTranslation()
  const language = useLanguage()
  const sportLanguage: "sport_name_en" | "sport_name_th" = language === "th" ? "sport_name_th" : "sport_name_en"

  const fetchData = useCallback(async () => {
    try {
      const res: AxiosResponse<ReservationResponse[]> = await client.get("/myreservation")
      setLists(res.data)
      setIsLoading(false)
    } catch (err) {
      console.log(err.message)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleClick = (id: string) => {
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
            <div className="col-12 animated-card">
              {lists.map((list) => {
                return (
                  <Button
                    key={list._id}
                    variant="pink"
                    onClick={() => handleClick(list._id)}
                    className="box-container btn"
                    style={{ width: "100%", color: "black", borderColor: "transparent" }}
                  >
                    <div>
                      <h5 style={{ color: "lightgreen", float: "right" }}> {list.is_check ? t("checkedIn") : ""} </h5>
                      <h5 className="mb-2"> {list.sport_id[sportLanguage]} </h5>
                      <h6 className="mb-0 font-weight-light">
                        {t("court")}: {list.court_number}
                      </h6>
                      <h6 className="mb-0 font-weight-light">
                        {t("bookingDate")}: {new Date(list.date).toLocaleDateString()}
                      </h6>
                      <h6 className="mb-0 font-weight-light">
                        {t("bookingTime")}: {timeConversion(list.time_slot)}
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
            {t("noReservation")}
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
