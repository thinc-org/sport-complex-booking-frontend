import React, { useState, useEffect, useCallback } from "react"
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router"
import { client } from "../../../../../axiosConfig"
import { useTranslation } from "react-i18next"

import { NavHeader } from "../../../ui/navbar/navbarSideEffect"
import { QrCode } from "./QRCode"
import ButtonAndWarning from "./ButtonAndWarning"
import Detail from "./Detail"
import { Loading } from "../../../ui/loading/loading"
import { LocationResponse, SportResponse, ReservationDetailResponse, CancellationDataResponse } from "../../../../dto/reservation.dto"
import { NameResponse } from "../../../../dto/account.dto"
import { ONE_HOUR_MILLISECOND, TWO_HOURS_MILLISECOND } from "../../../../../constant"

const ReservationDetail = () => {
  const location = useLocation()
  const history = useHistory<LocationResponse>()
  const { t } = useTranslation()
  const [id, setId] = useState<string>()
  const [sport, setSport] = useState<SportResponse>()
  const [courtNum, setCourtNum] = useState<number>()
  const [date, setDate] = useState<string>()
  const [reservedTimeInMillisecond, setReservedTimeInMillisecond] = useState<number>()
  const [timeList, setTimeList] = useState<number[]>()
  const [memberList, setMemberList] = useState<Array<NameResponse>>()
  const [isCheck, setIsCheck] = useState<boolean>()
  const [isLoading, setIsLoading] = useState(true)
  const [lateCancellationDay, setLateCancellationDay] = useState<number>()
  const [lateCancellationPunishment, setLateCancellationPunishment] = useState<number>()
  const [validTime, setValidTime] = useState<number>()

  const fetchId = useCallback(() => {
    location.state ? setId(history.location.state.id) : history.push(history.location.state.path)
  }, [setId, history, location.state])

  const fetchData = useCallback(async () => {
    try {
      const reservation: ReservationDetailResponse = (await client.get(`myreservation/${id}`)).data
      const cancellation: CancellationDataResponse = (await client.get("court-manager/setting")).data

      setSport(reservation.sport_id)
      setCourtNum(reservation.court_number)
      setDate(new Date(reservation.date).toLocaleDateString())
      setReservedTimeInMillisecond(new Date(reservation.date).setHours(0, 0, 0, 0) + (reservation.time_slot[0] - 1) * ONE_HOUR_MILLISECOND) //1hr = 3600000ms
      setTimeList(reservation.time_slot)
      setMemberList(reservation.list_member)
      setIsCheck(reservation.is_check)
      setValidTime(new Date().getTime() + 10000)
      setLateCancellationDay(cancellation.late_cancelation_day)
      setLateCancellationPunishment(cancellation.late_cancelation_punishment)
      setIsLoading(false)
    } catch (err) {
      history.push(history.location.state.path)
    }
  }, [id, history])

  useEffect(() => {
    fetchId()
  }, [fetchId])
  useEffect(() => {
    if (id) fetchData()
  }, [id, fetchData])

  if (!isLoading) {
    return (
      <>
        <NavHeader header={t("myReservation")} />
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-12 h-100">
              <Detail sport={sport} courtNum={courtNum} date={date} timeList={timeList} memberList={memberList} />
              <QrCode
                isCheck={isCheck}
                id={id}
                validTime={validTime}
                setValidTime={setValidTime}
                reservedTimeInMillisecond={reservedTimeInMillisecond}
              />
              <ButtonAndWarning
                isCheck={isCheck}
                id={id}
                reservedTime={reservedTimeInMillisecond}
                lateCancellationDay={lateCancellationDay}
                setLateCancellationDay={setLateCancellationDay}
                lateCancellationPunishment={lateCancellationPunishment}
                setLateCancellationPunishment={setLateCancellationPunishment}
              />
            </div>
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
