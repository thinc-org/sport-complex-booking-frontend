import React from "react"
import { useState, useEffect, useContext } from "react"
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { client } from "../../../../axiosConfig"
import { NavHeader } from "../../ui/navbar/navbarSideEffect"
import { timeConversion } from "../Reservation/timeConversion"
import { ConfirmModal } from "../../ui/Modals/CurrentWaitingRoomModal"
import { TimeOutModal } from "../../ui/Modals/CurrentWaitingRoomModal"
import { useTranslation } from "react-i18next"
import withUserGuard from "../../../guards/user.guard"

interface SportNameResponse {
  sportNameth: string
  sportNameen: string
}

const WaitingRoomPage = () => {
  const [remainingTime, setRemainingTime] = useState<string>()
  const [waitingRoomId, setWaitingRoomId] = useState<string>()
  const [sport, setSport] = useState<SportNameResponse>({ sportNameth: "แบตมินตัน", sportNameen: "Badminton" })
  const [date, setDate] = useState<string>(new Date().toLocaleDateString())
  const [timeList, setTimeList] = useState<Array<number>>([])
  const [listMember, setListMember] = useState<Array<string>>()
  const [accessCode, setAccessCode] = useState("")
  const [endTime, setEndTime] = useState<number>()
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false)
  const [modalTimeOutOpen, setModalTimeOutOpen] = useState(false)
  const [waitingRoomExist, setWaitingRoomExist] = useState<boolean>()
  const [requiredUserNumber, setRequiredUserNumber] = useState<Number>(0)
  const [currentUserNumber, setCurrentUserNumber] = useState<Number>(0)
  const { t, i18n } = useTranslation()

  const history = useHistory()

  useEffect(() => {
    fetchWaitingRoom()
    // time sent from backend is UTC before adding 7 for Thailand
    setEndTime(timeShift(new Date("Jan 03, 2021 08:47:40").getTime(), 7))
  }, [])

  useEffect(() => {
    countDown()
  }, [endTime])

  useEffect(() => {
    if (currentUserNumber && requiredUserNumber) {
      if (currentUserNumber == requiredUserNumber) {
        // successful reservation and redirect to hooray page

        history.push("/hooray")
      }
    }
  }, [currentUserNumber])

  const fetchWaitingRoom = async () => {
    try {
      const res = await client.get("/mywaitingroom")
      setListMember(res.data.list_member)
      setEndTime(timeShift(new Date(res.data.expired_time).getTime(), 7))
      setSport({ sportNameth: res.data.sport_name_th, sportNameen: res.data.sport_name_en })
      setDate(res.data.date.toLocaleString)
      setTimeList(res.data.time_slot)
      setRequiredUserNumber(res.data.required_user)
      setCurrentUserNumber(res.data.listmember.length)
      setWaitingRoomId(res.data._id)
      setAccessCode(res.data.access_code)
    } catch (err) {
      console.log(err)
    }
  }
  function triggerModal(modal) {
    if (modal == "confirmModal") {
      setModalConfirmOpen(!modalConfirmOpen)
      return modalConfirmOpen
    } else if (modal == "timeOutModal") {
      setModalTimeOutOpen(!modalTimeOutOpen)
      return modalTimeOutOpen
    }
  }

  const timeOut = async () => {
    setModalTimeOutOpen(true)
    await setTimeout(() => {
      setModalTimeOutOpen(false)
      history.push("/home")
    }, 3000)
  }

  const handleClick = () => {
    triggerModal("confirmModal")
  }

  const closeWaitingRoom = async () => {
    client
      .delete(`'/mywaitingroom/:${waitingRoomId}'`)
      .then(() => {
        history.push("/home")
      })
      .catch(() => {
        history.push("/home")
      })
  }

  const userNumber = () => {
    return (
      <span className="ml-3 grey" style={{ fontSize: "18px", fontWeight: 400 }}>
        {currentUserNumber + "/" + requiredUserNumber}
      </span>
    )
  }

  const countDown = () => {
    if (endTime != undefined) {
      var x = setInterval(function () {
        var current = new Date().getTime()
        var diff = Math.floor((endTime - current) / 1000)
        let min = Math.floor(diff / 60)
        let sec = diff % 60
        let formated_min = ""
        let formated_sec = ""

        if (sec > -2) {
          if (sec < 0 && min < 0) {
            console.log("timeout")
            return timeOut()
          }

          if (~~(sec / 10) == 0) {
            formated_sec = "0" + sec.toString()
          } else {
            formated_sec = sec.toString()
          }

          if (~~(min / 10) == 0) {
            formated_min = "0" + min.toString()
          } else {
            formated_min = min.toString()
          }
          return setRemainingTime(formated_min + ":" + formated_sec + " ")
        }
      }, 1000)
      return x
    }
  }

  const timeShift = (time, shiftedHours) => {
    shiftedHours = shiftedHours * 60 * 60 * 1000
    return time + shiftedHours
  }

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
                <h6 style={{ fontWeight: 300, fontSize: "14px", margin: "0" }}> {sport && sport[`sportName${i18n.language}`]} </h6>
                <h6 style={{ fontWeight: 300, fontSize: "14px", margin: "0" }}>
                  {" "}
                  {t("date")}: {date}{" "}
                </h6>
                <h6 style={{ fontWeight: 300, fontSize: "14px", margin: "0" }}>
                  {" "}
                  {t("time")}:{" "}
                  {timeList.map((eachTime) => {
                    return timeConversion(eachTime)
                  })}{" "}
                </h6>
              </div>
              <div className="box-container btn w-100 mb-3">
                <h6 style={{ fontWeight: 300, fontSize: "12px", lineHeight: "17px", marginBottom: "20px" }}> {t("remainingTime")}: </h6>
                <h6 style={{ fontWeight: 700, fontSize: "36px", lineHeight: "17px", textAlign: "center", marginBottom: "10px" }}>
                  {" "}
                  {remainingTime}{" "}
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
                  {" "}
                  {t("refresh")}{" "}
                </Button>
                <div style={{ fontSize: "18px", fontWeight: 400, lineHeight: "26px" }}>
                  {" "}
                  {t("users")} {userNumber()}{" "}
                </div>
              </div>
              <div className="box-container btn" style={{ width: "100%", marginBottom: "45px" }}>
                <table>
                  <tr style={{ fontSize: "16px", fontWeight: 700, lineHeight: "24px", borderBottom: "1px solid #ddd" }}>
                    <th style={{ width: "26%", paddingBottom: "12px" }}> # </th>
                    <th style={{ width: "74%", paddingBottom: "12px" }}> {t("username")} </th>
                    <th> </th>
                  </tr>
                  {listMember &&
                    listMember.map((eachMember, index) => {
                      return (
                        <tr>
                          <td> {index + 1} </td>
                          <td> {eachMember} </td>
                        </tr>
                      )
                    })}
                </table>
              </div>
              <Button
                onClick={handleClick}
                style={{
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "transparent",
                  color: "red",
                  borderColor: "red",
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
      <div className="container">
        <div className="row justify-content-center mt-5 grey" style={{ fontWeight: 400 }}>
          {t("noWaitingRoom")}
        </div>
      </div>
    )
  }
}

export default withUserGuard(WaitingRoomPage)
