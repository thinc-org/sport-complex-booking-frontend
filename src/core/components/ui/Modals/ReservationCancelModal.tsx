import React from "react"
import { Modal } from "react-bootstrap"
import { useTranslation } from "react-i18next"

export interface ReservationCancelModalProps {
  modalOpen: boolean
  triggerModal: (event: React.MouseEvent) => void
  confirmCancellation: (event: React.MouseEvent) => void
  lateCancellationDay: number
  lateCancellationPunishment: number
}

export const ReservationCancellationModal: React.FC<ReservationCancelModalProps> = ({
  modalOpen,
  triggerModal,
  confirmCancellation,
  lateCancellationDay,
  lateCancellationPunishment,
}) => {
  const { t, i18n } = useTranslation()
  return (
    <Modal
      show={modalOpen}
      className="modal"
      tabIndex={-1}
      role="dialog"
      keyboard={true}
      onHide={triggerModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header pb-0">
            <h5 className="modal-title"> {t("warning")} </h5>
          </div>
          <div className="modal-body pt-1 pb-0" style={{ fontSize: "14px", fontWeight: 300 }}>
            {t("cancelReservationQuestion")}
            <br />
            <br />{" "}
            {t("cancelReservationCondition", {
              lateCancellationDay: lateCancellationDay.toString(),
              lateCancellationPunishment: lateCancellationPunishment.toString(),
            })}
          </div>
          <div className="modal-footer pt-0 pb-0">
            <button type="button" onClick={triggerModal} className="btn" data-dismiss="modal" style={{ fontSize: "14px", fontWeight: 400 }}>
              {" "}
              {t("no")}{" "}
            </button>
            <button type="button" onClick={confirmCancellation} className="btn" style={{ fontSize: "14px", fontWeight: 400 }}>
              {" "}
              {t("sure")}{" "}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
