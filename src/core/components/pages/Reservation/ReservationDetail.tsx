import React from "react"
import { useState, useEffect, useCallback } from "react"
import { useHistory, Link } from "react-router-dom"
import { useLocation } from "react-router"
import { Button } from "react-bootstrap"
import { timeConversion } from "../Reservation/timeConversion"
import { client } from "../../../../axiosConfig"
import QRCode from "qrcode.react"
import { NavHeader } from "../../ui/navbar/navbarSideEffect"
import { useTranslation } from "react-i18next"
import { ReservationCancellationModal } from "../../ui/Modals/ReservationCancelModal"
import { Loading } from "../../ui/loading/loading"

interface LocationResponse {
  id: string
  path: string
}

interface MemberResponse {
  name_th: string
  name_en: string
}

interface SportResponse {
  sportth: string
  sporten: string
}

interface QRValueResponse {
  id: string
  time: number
}

const ReservationDetail = () => {
  const location = useLocation()
  const history = useHistory()
  const { t, i18n } = useTranslation()

  const [id, setId] = useState<string>()
  const [sport, setSport] = useState<SportResponse>()
  const [courtNum, setCourtNum] = useState("")
  const [date, setDate] = useState<string>()
  const [timeList, setTimeList] = useState<number[]>()
  const [memberList, setMemberList] = useState<Array<MemberResponse>>()
  const [isCheck, setIsCheck] = useState<Boolean>()
  const [counter, setCounter] = useState<number>()
  const [isLoading, setIsLoading] = useState(true)
  const [lateCancellationDay, setLateCancellationDay] = useState<number>()
  const [lateCancellationPunishment, setLateCancellationPunishment] = useState<number>()
  const [validTime, setValidTime] = useState<number>()
  const [qrValue, setQRValue] = useState<QRValueResponse>()
  const [isRefreshingQRCode, setIsRefreshingQRCode] = useState<boolean>()

  const fetchId = useCallback(() => {
    if (location.state) {
      setId((location.state as LocationResponse).id)
      setQRValue({ id: (location.state as LocationResponse).id, time: new Date().getTime() })
    } else {
      history.push((location.state as LocationResponse).path)
    }
  }, [])

  const fetchData = async () => {
    try {
      console.log(id)
      const res = (await client.get("myreservation/" + id)).data
      const data = (await client.get("court-manager/setting")).data
      setSport({ sportth: res.sport_id.sport_name_th, sporten: res.sport_id.sport_name_en })
      setCourtNum(res.court_number)
      setDate(new Date(res.date).toLocaleDateString())
      setTimeList(res.time_slot)
      setMemberList(res.list_member)
      setIsCheck(res.is_check)
      setLateCancellationDay(data.late_cancelation_day)
      setLateCancellationPunishment(data.late_cancelation_punishment)
      setValidTime(new Date().getTime() + 10000)
      setIsLoading(false)
      setIsRefreshingQRCode(false)
      setCounter(10)
    } catch (err) {
      console.log(err.message)
      history.push((location.state as any).path)
    }
  }

  useEffect(() => {
    if (id) fetchData()
  }, [id])

  useEffect(() => {
    fetchId()
    console.log("reservation detail")
  }, [])

  useEffect(() => {
    if (!isCheck) countDown()
  }, [counter, isCheck])

  const triggerModal = () => {
    console.log("show modal")
    setModalOpen(!modalOpen)
    return modalOpen
  }

  let [modalOpen, setModalOpen] = useState(false)

  const confirmCancellation = () => {
    client
      .delete("myreservation/" + id)
      .then(() => {
        history.push((location.state as any).path)
      })
      .catch((err) => {
        console.log(err)
        triggerModal()
      })
  }

  const countDown = () => {
    if (!isCheck && !isRefreshingQRCode) {
      setTimeout(function () {
        if (counter) {
          setCounter(counter - 1)
        } else if (counter === 0) {
          setIsRefreshingQRCode(true)
          fetchData()
          setValidTime(new Date().getTime())
        }
      }, 1000)
    }
  }

  //   const qrValue = () => {
  //       return (
  //           {
  //               id: id,
  //               time: validTime
  //           }
  //       )
  //   }

  useEffect(() => {
    console.log(qrValue)
  }, [qrValue])

  const qrCode = () => {
    if (!isCheck && id) {
      return (
        <>
          <div className="box-container btn w-100 mb-5" style={{ textAlign: "center" }}>
            <h6 className="mt-2 mb-0" style={{ fontWeight: 400 }}>
              {" "}
              {t("qrcodeInvalid")}{" "}
            </h6>
            <div style={{ fontSize: "18px", fontWeight: 400 }}> 00:{counter == 10 ? counter : "0" + counter} </div>
            {!isRefreshingQRCode ? (
              <QRCode className="mb-4 mt-3" value={validTime + "/" + id} renderAs="svg" size="128" fgColor="#333" bgColor="#fff" />
            ) : (
              <h6 className="pt-4 pb-4 mt-5 mb-5" style={{ color: "red" }}>
                {" "}
                Refreshing QR Code...{" "}
              </h6>
            )}
            <h5 className="mb-2" style={{ fontWeight: 400 }}>
              {" "}
              {t("showQRToStaff")}{" "}
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
              {" "}
              {t("youHaveCheckedIn")}{" "}
            </h4>
          </div>
          <div className="container fixed-bottom mt-5">
            <Link to={(location.state as LocationResponse).path}>
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
                  <h4 className="mb-2"> {sport && sport[`sport${i18n.language}`]} </h4>
                  <h6 className="mb-0 font-weight-light">
                    {" "}
                    {t("court")}: {courtNum}
                  </h6>
                  <h6 className="mb-0 font-weight-light">
                    {" "}
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
                        <h6 className="mb-0" style={{ fontWeight: 300 }}>
                          {index + 1}. {eachMember[`name_${i18n.language}`]}
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
