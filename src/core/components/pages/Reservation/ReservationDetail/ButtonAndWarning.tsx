import React, { useState, useCallback, useEffect } from "react"

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
  const [cancellationAllowance, setCancellationAllowance] = useState(true)
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

  const cancelValidation = useCallback(
    (reservedTime: number) => {
      if (lateCancellationPunishment === 0) return setPunishment(false)

      const currentTime = new Date().getTime()
      const differenceHour = (reservedTime - currentTime) / 3600000 // 1 hour = 3600000 milliseconds
      const differenceMinute = (reservedTime - currentTime) / 60000 // 1 minute = 60000 milliseconds
      if (lateCancellationDay === undefined) return
      const lateCancellationHour = lateCancellationDay * 24
      if (differenceMinute < 121) return setCancellationAllowance(false)
      if (differenceHour < lateCancellationHour) return setPunishment(true)

      return setPunishment(false)
    },
    [lateCancellationDay, lateCancellationPunishment]
  )

  useEffect(() => {
    reservedTime && cancelValidation(reservedTime)
  }, [cancelValidation, reservedTime])

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
      .catch(() => {
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
          cancellationAllowance={cancellationAllowance}
          confirmCancellation={confirmCancellation}
          lateCancellationPunishment={lateCancellationPunishment}
        />
      )}

      {!isCheck && (
        <div className="mb-5" style={{ fontSize: "14px", fontWeight: 300 }}>
          <span style={{ fontSize: "18px" }}> {t("reminder")} </span>
          <br />{" "}
          <ul>
            {lateCancellationPunishment !== 0 && lateCancellationDay !== 0 && (
              <li>
                {t("cancelReservationCondition", {
                  lateCancellationDay: lateCancellationDay?.toString(),
                  lateCancellationPunishment: lateCancellationPunishment?.toString(),
                })}
                <br />
              </li>
            )}
            <li>{t("cancellationUnallowed")}</li>
          </ul>
        </div>
      )}
    </>
  )
}

export default ButtonAndWarning
