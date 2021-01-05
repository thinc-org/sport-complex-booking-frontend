import React from "react"
import { Button } from "react-bootstrap"
import { useRouteMatch, useHistory } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { client } from "../../../../axiosConfig"
import { getCookie } from "../../../contexts/cookieHandler"
import { timeConversion } from "../Reservation/timeConversion"
import { AxiosResponse } from "axios"
import { NavHeader } from "../../ui/navbar/navbarSideEffect"
import { useTranslation } from "react-i18next"
import { get } from "http"

interface ReservationResponse {
  _id: number | string
  is_check: boolean
  sport_id: string
  court_number: number
  date: Date
  time_slot: number[]
}

const ReservationPage = (props: any) => {
  const history = useHistory()

  const [lists, setLists] = useState<Array<ReservationResponse>>([])
  const [isThaiLanguage, setIsThaiLanguage] = useState(true)

  var { url, path } = useRouteMatch()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    setLanguage()
    fetchData()
    console.log("fetch data")
  }, [])

  const fetchData = async () => {
    await client
      .get("/myreservation", {})
      .then((res: AxiosResponse) => {
        setLists(res.data)
        console.log(res.data)
      })
      .catch((err) => {})
  }

  const setLanguage = () => {
    if (getCookie("is_thai_langugae") == "true") {
      setIsThaiLanguage(true)
    } else if (getCookie("is_thai_language") == "false") {
      setIsThaiLanguage(false)
    }
  }

  const handleClick = (id: string | number) => {
    console.log("button clicked")
    return history.push({
      pathname: `${path}/reservationdetail`,
      state: {
        id: id,
        path: path,
      },
    })
  }

  // display only when there is any reservation
  if (lists && lists.length) {
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
                      <h5 style={{ color: "lightgreen", float: "right" }}> {list.is_check ? t("checked_in") : ""} </h5>
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
  } else {
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
}

export default ReservationPage
