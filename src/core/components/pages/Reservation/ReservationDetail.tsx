import React from "react"
import { useState, useEffect, useContext, useCallback } from "react"
import { useHistory, Link } from "react-router-dom"
import { useLocation } from "react-router"
import { Button } from "react-bootstrap"
import { timeConversion } from "../Reservation/timeConversion"
import { client } from "../../../../axiosConfig"
import { UserContext } from "../../../contexts/UsersContext"
import QRCode from "qrcode.react"
import { NavHeader } from "../../ui/navbar/navbarSideEffect"
import { useTranslation } from "react-i18next"
import { ReservationCancellationModal } from "../../ui/Modals/ReservationCancelModal"
import { getCookie } from "../../../../core/contexts/cookieHandler"

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

  const fetchId = useCallback(() => {
    if (location.state) {
      setId((location.state as LocationResponse).id)
    } else {
      history.push((location.state as LocationResponse).path)
    }
  }, [])

  const fetchData = async () => {
    try {
      console.log(id)
      const res = await client.get("myreservation/" + id)
      const data = res.data
      console.log(data)
      setSport({ sportth: data.sport_id.sport_name_th, sporten: data.sport_id.sport_name_en })
      setCourtNum(data.court_num)
      setDate(new Date(data.date).toLocaleDateString())
      setTimeList(data.time_slot)
      setMemberList(data.list_member)
      setIsCheck(data.is_check)
      setCounter(10)
      countDown()
    } catch (err) {
      console.log(err)
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
    countDown()
    console.log(counter)
  }, [counter])

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
    if (!isCheck) {
      setTimeout(function () {
        if (counter) {
          setCounter(counter - 1)
        } else if (counter === 0) history.push((location.state as any).path)
      }, 1000)
    }
  }

  const qrCode = () => {
    if (isCheck == false && id != null) {
      return (
        <>
          <div className="box-container btn w-100 mb-5" style={{ textAlign: "center" }}>
            <QRCode className="m-4" value={id} renderAs="svg" size="128" fgColor="#333" bgColor="#fff" />
            <div style={{ fontSize: "18px", fontWeight: 400, width: "60px", float: "right", marginLeft: "-60px" }}>
              {" "}
              00:{counter == 10 ? counter : "0" + counter}{" "}
            </div>
            <h5 className="mb-2" style={{ fontWeight: 400 }}>
              {" "}
              {t("show_qr_to_staff")}{" "}
            </h5>
          </div>
          <Button onClick={triggerModal} variant="outline-danger cancel-btn">
            {t("cancel_reservation")}
          </Button>
        </>
      )
    } else if (isCheck == true) {
      return (
        <>
          <div className="box-container btn w-100 mb-5" style={{ textAlign: "center" }}>
            <h4 className="m-2" style={{ color: "lightgreen" }}>
              {" "}
              {t("you_have_checked_in")}{" "}
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
                  {t("bookingDate")}:{date}{" "}
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
          <ReservationCancellationModal modalOpen={modalOpen} triggerModal={triggerModal} confirmCancellation={confirmCancellation} />
        </div>
      </div>
    </>
  )
}

export default ReservationDetail
