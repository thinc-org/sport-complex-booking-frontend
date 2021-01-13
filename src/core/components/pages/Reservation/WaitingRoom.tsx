import React, { useState, useEffect, useCallback } from "react"

import { Button } from "react-bootstrap"
import { useHistory, Link } from "react-router-dom"
import { client } from "../../../../axiosConfig"
import { NavHeader } from "../../ui/navbar/navbarSideEffect"
import { timeShift, timeConversion, TimeRemainingDisplay } from "./timeFormating"
import { ConfirmModal, TimeOutModal } from "../../ui/Modals/CurrentWaitingRoomModal"

import { useTranslation } from "react-i18next"
import withUserGuard from "../../../guards/user.guard"
import Countdown, { CountdownRenderProps } from "react-countdown"
import { Loading } from "../../ui/loading/loading"
import { useLanguage } from "../../../utils/language"

interface SportNameResponse {
  sportNameth: string
  sportNameen: string
}

interface MemberResponse {
  name_th: string
  name_en: string
}

const WaitingRoomPage = () => {
  const [waitingRoomId, setWaitingRoomId] = useState<string>()
  const [sport, setSport] = useState<SportNameResponse>()
  const [date, setDate] = useState<string>()
  const [timeList, setTimeList] = useState<Array<number>>([])
  const [listMember, setListMember] = useState<Array<MemberResponse>>([])
  const [accessCode, setAccessCode] = useState("")
  const [endTime, setEndTime] = useState<number>()
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false)
  const [modalTimeOutOpen, setModalTimeOutOpen] = useState(false)
  const [requiredUserNumber, setRequiredUserNumber] = useState<number>(0)
  const [currentUserNumber, setCurrentUserNumber] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation()
  const language = useLanguage()
  const sportLanguage: "sportNameth" | "sportNameen" = language === "th" ? "sportNameth" : "sportNameen"

  const history = useHistory()

  const fetchWaitingRoom = useCallback(async () => {
    try {
      console.log("fetch data")
      const res = await client.get("/mywaitingroom")
      console.log(res.data.list_member)
      setListMember(res.data.list_member)
      // time sent from backend is UTC before adding 7 for Thailand
      setEndTime(timeShift(new Date(res.data.expired_date).getTime(), 0))
      setSport({ sportNameth: res.data.sport_id.sport_name_th, sportNameen: res.data.sport_id.sport_name_en })
      setDate(new Date(res.data.date).toLocaleDateString())
      setTimeList(res.data.time_slot)
      setRequiredUserNumber(res.data.sport_id.required_user)
      setCurrentUserNumber(res.data.list_member.length)
      setWaitingRoomId(res.data._id)
      setAccessCode(res.data.access_code)
      setIsLoading(false)
    } catch (err) {
      console.log(err.name)
      setWaitingRoomId(undefined)
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWaitingRoom()
  }, [fetchWaitingRoom])

  useEffect(() => {
    if (currentUserNumber && requiredUserNumber && currentUserNumber === requiredUserNumber) {
      // successful reservation and redirect to hooray page
      history.push("/hooray")
    }
  }, [history, currentUserNumber, requiredUserNumber])

  function triggerModal(modal: string) {
    if (modal === "confirmModal") {
      setModalConfirmOpen(!modalConfirmOpen)
      return modalConfirmOpen
    } else if (modal === "timeOutModal") {
      setModalTimeOutOpen(!modalTimeOutOpen)
      return modalTimeOutOpen
    }
  }

  const closeWaitingRoom = async () => {
    client
      .delete("mywaitingroom/cancel/" + waitingRoomId)
      .then(() => {
        history.push("/home")
      })
      .catch(() => {
        history.push("/home")
      })
  }

  const timeOut = async () => {
    await setTimeout(() => {
      setModalTimeOutOpen(true)
    }, 1000)
    await setTimeout(() => {
      setModalTimeOutOpen(false)
      setEndTime(undefined)
      closeWaitingRoom()
      history.push("/home")
    }, 3000)
  }

  const handleClick = () => {
    triggerModal("confirmModal")
  }

  const userNumber = () => {
    return (
      <span className="ml-3 grey" style={{ fontSize: "18px", fontWeight: 400 }}>
        {currentUserNumber + "/" + requiredUserNumber}
      </span>
    )
  }

  const renderer = (props: CountdownRenderProps) => {
    return <TimeRemainingDisplay onTimeOut={timeOut} {...props} />
  }

  if (!isLoading) {
    if (waitingRoomId) {
      return (
        <>
          <NavHeader header={t("waitingRoom")} />
          <div className="container">
            <div className="row justify-content-center mt-4">
              <div className="col-12">
                <div className="col-12 mb-4">
                  <h6 style={{ fontSize: "16px", fontWeight: 400, lineHeight: "24px" }}> {t("howWaitingRoomWork?")} </h6>
                  <h6 style={{ fontSize: "12px", fontWeight: 300, lineHeight: "14px" }}> {t("howWaitingRoomWork")} </h6>
                </div>
                <div className="box-container btn w-100 mb-4">
                  <h6 style={{ fontWeight: 700, fontSize: "14px", marginBottom: "5px" }}> {t("summary")} </h6>
                  <h6 style={{ fontWeight: 300, fontSize: "14px", margin: "0" }}> {sport && sport[sportLanguage]} </h6>
                  <h6 style={{ fontWeight: 300, fontSize: "14px", margin: "0" }}>
                    {t("date")}: {date}
                  </h6>
                  <h6 style={{ fontWeight: 300, fontSize: "14px", margin: "0" }}>
                    {t("time")}:
                    {timeList.map((eachTime) => {
                      return timeConversion(eachTime)
                    })}
                  </h6>
                </div>
                <div className="box-container btn w-100 mb-3">
                  <h6 style={{ fontWeight: 300, fontSize: "12px", lineHeight: "17px", marginBottom: "20px" }}> {t("remainingTime")}: </h6>
                  <h6 style={{ fontWeight: 700, fontSize: "36px", lineHeight: "17px", textAlign: "center", marginBottom: "10px" }}>
                    <Countdown date={endTime} renderer={renderer} />
                  </h6>
                </div>
                <div className="box-container btn w-100 mb-5">
                  <h6 style={{ fontWeight: 300, fontSize: "12px", lineHeight: "17px", marginBottom: "20px" }}> {t("waitingRoomAccessCode")}: </h6>
                  <h6 style={{ fontWeight: 700, fontSize: "36px", lineHeight: "17px", textAlign: "center", marginBottom: "10px" }}> {accessCode} </h6>
                </div>
                <div className="col-12 mb-2">
                  <Button
                    variant="pink"
                    className="btn"
                    onClick={fetchWaitingRoom}
                    style={{ fontSize: "15px", fontWeight: 400, float: "right", borderRadius: "15px", padding: "2px 10px" }}
                  >
                    {t("refresh")}
                  </Button>
                  <div style={{ fontSize: "18px", fontWeight: 400, lineHeight: "26px" }}>
                    {t("users")} {userNumber()}
                  </div>
                </div>
                <div className="box-container btn" style={{ width: "100%", marginBottom: "45px" }}>
                  <table>
                    <thead>
                      <tr style={{ fontSize: "16px", fontWeight: 700, lineHeight: "24px", borderBottom: "1px solid #ddd" }}>
                        <th style={{ width: "26%", paddingBottom: "12px" }}> # </th>
                        <th style={{ width: "74%", paddingBottom: "12px" }}> {t("username")} </th>
                        <th> </th>
                      </tr>
                    </thead>

                    {listMember &&
                      listMember.map((eachMember, index) => (
                        <tbody key={index}>
                          <tr>
                            <td> {index + 1} </td>
                            <td> {eachMember} </td>
                          </tr>
                        </tbody>
                      ))}
                  </table>
                </div>
                <Button
                  onClick={handleClick}
                  className="cancel-btn btn-danger"
                  style={{
                    borderRadius: "15px",
                    marginBottom: "50px",
                  }}
                >
                  {t("closeWaitingRoom")}
                </Button>

                <ConfirmModal modalConfirmOpen={modalConfirmOpen} handleClick={handleClick} closeWaitingRoom={closeWaitingRoom} />
                <TimeOutModal modalTimeOutOpen={modalTimeOutOpen} />
              </div>
            </div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <NavHeader header={t("waitingRoom")} />
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 grey text-center">
                <h6 className=" mt-5" style={{ fontWeight: 400 }}>
                  {t("noWaitingRoom")}
                </h6>
                <h6 className="mt-5 mb-3" style={{ fontWeight: 400 }}>
                  {t("checkOutMyReservation")}
                </h6>
                <Link to="/myreservation">
                  <Button variant="pink" className="pt-2 pb-2">
                    {t("myReservation")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <div className="wrapper mx-auto text-center mt-5">
      <Loading />
    </div>
  )
}

export default withUserGuard(WaitingRoomPage)
