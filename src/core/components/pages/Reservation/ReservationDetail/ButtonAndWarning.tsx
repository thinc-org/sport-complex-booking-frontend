import React, { useState, useCallback } from "react"

import { Link, useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"
import { useTranslation } from "react-i18next"

import { client } from "../../../../../axiosConfig"
import { ReservationCancellationModal } from "../../../ui/Modals/ReservationCancelModal"
import { LocationResponse, CancellationDataResponse } from "../../../../dto/reservation.dto"
import { ButtonAndWarningProps } from "./PropsInterface"

const ButtonAndWarning: React.FC<ButtonAndWarningProps> = ({
  isCheck,
  id,
  reservedTime,
  lateCancellationDay,
  setLateCancellationDay,
  lateCancellationPunishment,
  setLateCancellationPunishment,
}) => {
  const { t } = useTranslation()
  const history = useHistory<LocationResponse>()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [punishment, setPunishment] = useState(false)

  const fetchCancellationData = useCallback(async () => {
    try {
      const data: CancellationDataResponse = (await client.get("court-manager/setting")).data
      setLateCancellationDay(data.late_cancelation_day)
      setLateCancellationPunishment(data.late_cancelation_punishment)
    } catch (err) {
      setLateCancellationDay(undefined)
      setLateCancellationPunishment(undefined)
    }
  }, [setLateCancellationDay, setLateCancellationPunishment])

  const cancelValidation = (reservedTime: number) => {
    if (lateCancellationPunishment === 0) {
      setPunishment(false)
      return
    }
    const currentTime = new Date().getTime()
    const differenceHour = Math.floor((reservedTime - currentTime) / 3600000) // 1 hour = 3600000 millisecond
    if (lateCancellationDay) {
      const lateCancellationHour = lateCancellationDay * 24
      console.log("late cancellation hours:" + lateCancellationHour)
      if (differenceHour < lateCancellationHour) {
        setPunishment(true)
        return
      } else {
        setPunishment(false)
        return
      }
    }
  }

  const triggerModal = () => {
    fetchCancellationData()
    reservedTime && cancelValidation(reservedTime)
    setIsModalOpen(!isModalOpen)
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

  return (
    <>
      {!isCheck && id && (
        <Button onClick={triggerModal} variant="outline-danger cancel-btn">
          {t("cancelReservation")}
        </Button>
      )}

      {isCheck && (
        <div className="container fixed-bottom mt-5">
          <Link to={history.location.state.path}>
            <Button variant="outline-dark return-btn" className="w-100">
              {t("goBack")}
            </Button>
          </Link>
        </div>
      )}

      {lateCancellationDay !== undefined && lateCancellationPunishment !== undefined && (
        <ReservationCancellationModal
          modalOpen={isModalOpen}
          triggerModal={triggerModal}
          punishment={punishment}
          confirmCancellation={confirmCancellation}
          lateCancellationPunishment={lateCancellationPunishment}
        />
      )}

      {!isCheck && lateCancellationPunishment !== 0 && (
        <div className="mb-5" style={{ fontSize: "14px", fontWeight: 300 }}>
          <span> {t("reminder")} </span>
          <br />{" "}
          {t("cancelReservationCondition", {
            lateCancellationDay: lateCancellationDay?.toString(),
            lateCancellationPunishment: lateCancellationPunishment?.toString(),
          })}
        </div>
      )}
    </>
  )
}

export default ButtonAndWarning
