import React, { useState, useEffect, useCallback } from "react"

import { useHistory, Link } from "react-router-dom"
import { useLocation } from "react-router"
import { Button } from "react-bootstrap"
import { timeConversion } from "../Reservation/timeFormating"
import { client } from "../../../../axiosConfig"
import QRCode from "qrcode.react"
import { NavHeader } from "../../ui/navbar/navbarSideEffect"
import { useTranslation } from "react-i18next"
import { ReservationCancellationModal } from "../../ui/Modals/ReservationCancelModal"
import { Loading } from "../../ui/loading/loading"
import { useLanguage, useNameLanguage } from "../../../utils/language"
import { LocationResponse, SportResponse, ReservationDetailResponse } from "../../../dto/reservation.dto"
import { NameResponse } from "../../../dto/account.dto"

const ReservationDetail = () => {
  const location = useLocation()
  const history = useHistory<LocationResponse>()
  const { t } = useTranslation()
  const language = useLanguage()
  const nameLanguage: "name_en" | "name_th" = useNameLanguage("name") as "name_en" | "name_th"
  const sportLanguage: "sport_name_th" | "sport_name_en" = language === "th" ? "sport_name_th" : "sport_name_en"
  const [id, setId] = useState<string>()
  const [sport, setSport] = useState<SportResponse>()
  const [courtNum, setCourtNum] = useState<number>()
  const [date, setDate] = useState<string>()
  const [timeList, setTimeList] = useState<number[]>()
  const [memberList, setMemberList] = useState<Array<NameResponse>>()
  const [isCheck, setIsCheck] = useState<boolean>()
  const [counter, setCounter] = useState<number>()
  const [isLoading, setIsLoading] = useState(true)
  const [lateCancellationDay, setLateCancellationDay] = useState<number>()
  const [lateCancellationPunishment, setLateCancellationPunishment] = useState<number>()
  const [validTime, setValidTime] = useState<number>()

  const fetchId = useCallback(() => {
    if (location.state) {
      setId(history.location.state.id)
    } else {
      history.push(history.location.state.path)
    }
  }, [setId, history, location.state])

  const fetchData = useCallback(async () => {
    try {
      const res: ReservationDetailResponse = (await client.get(`myreservation/${id}`)).data
      const data = (await client.get("court-manager/setting")).data
      setSport(res.sport_id)
      setCourtNum(res.court_number)
      setDate(new Date(res.date).toLocaleDateString())
      setTimeList(res.time_slot)
      setMemberList(res.list_member)
      setIsCheck(res.is_check)
      setLateCancellationDay(data.late_cancelation_day)
      setLateCancellationPunishment(data.late_cancelation_punishment)
      setValidTime(new Date().getTime() + 10000)
      setIsLoading(false)
      setCounter(10)
    } catch (err) {
      history.push(history.location.state.path)
    }
  }, [id, history])

  const countDown = useCallback(() => {
    if (!isCheck) {
      setTimeout(function () {
        if (counter) {
          setCounter(counter - 1)
        } else if (counter === 0) {
          setValidTime(new Date().getTime() + 10000)
          setCounter(10)
        }
      }, 1000)
    }
  }, [counter, isCheck])
  useEffect(() => {
    fetchId()
  }, [fetchId])
  useEffect(() => {
    if (id) fetchData()
  }, [id, fetchData])
  useEffect(() => {
    if (!isCheck) {
      countDown()
    }
  }, [isCheck, countDown])

  const [modalOpen, setModalOpen] = useState(false)

  const triggerModal = () => {
    setModalOpen(!modalOpen)
    return modalOpen
  }

  const confirmCancellation = () => {
    client
      .delete("myreservation/" + id)
      .then(() => {
        history.push(history.location.state.path)
      })
      .catch((err) => {
        console.log(err.message)
        triggerModal()
      })
  }

  const qrCode = () => {
    if (!isCheck && id) {
      return (
        <>
          <div className="box-container btn w-100 mb-5" style={{ textAlign: "center" }}>
            <h6 className="mt-2 mb-0" style={{ fontWeight: 400 }}>
              {t("qrcodeInvalid")}{" "}
            </h6>
            <div style={{ fontSize: "18px", fontWeight: 400 }}> 00:{counter === 10 ? counter : "0" + counter} </div>
            <QRCode className="mb-4 mt-3" value={validTime + "/" + id} renderAs="svg" size={128} fgColor="#333" bgColor="#fff" />

            <h5 className="mb-2" style={{ fontWeight: 400 }}>
              {t("showQRToStaff")}
            </h5>
          </div>
          <Button onClick={triggerModal} variant="outline-danger cancel-btn">
            {t("cancelReservation")}
          </Button>
        </>
      )
    } else if (isCheck) {
      return (
        <>
          <div className="box-container btn w-100 mb-5" style={{ textAlign: "center" }}>
            <h4 className="m-2" style={{ color: "lightgreen" }}>
              {t("youHaveCheckedIn")}
            </h4>
          </div>
          <div className="container fixed-bottom mt-5">
            <Link to={history.location.state.path}>
              <Button variant="outline-dark return-btn" className="w-100">
                {t("goBack")}
              </Button>
            </Link>
          </div>
        </>
      )
    }
  }

  if (!isLoading) {
    return (
      <>
        <NavHeader header={t("myReservation")} />
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-12 h-100">
              <div className="box-container btn mb-4" style={{ width: "100%" }}>
                <div>
                  <h4 className="mb-2"> {sport && sport[sportLanguage]} </h4>
                  <h6 className="mb-0 font-weight-light">
                    {t("court")}: {courtNum}
                  </h6>
                  <h6 className="mb-0 font-weight-light">
                    {t("bookingDate")}: {date}{" "}
                  </h6>
                  <h6 className="mb-0 font-weight-light">
                    {t("bookingTime")}: {timeList && timeList.map((time) => timeConversion(time))}{" "}
                  </h6>
                </div>
                <hr />
                <div>
                  <h6 className="mb-2"> {t("members")} </h6>
                  {memberList &&
                    memberList.map((eachMember, index) => {
                      return (
                        <h6 className="mb-0" style={{ fontWeight: 300 }} key={index}>
                          {index + 1}. {eachMember[nameLanguage]}
                        </h6>
                      )
                    })}
                </div>
              </div>
              {qrCode()}
            </div>
            {lateCancellationDay && lateCancellationPunishment && (
              <ReservationCancellationModal
                modalOpen={modalOpen}
                triggerModal={triggerModal}
                confirmCancellation={confirmCancellation}
                lateCancellationDay={lateCancellationDay}
                lateCancellationPunishment={lateCancellationPunishment}
              />
            )}
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

export default ReservationDetail
