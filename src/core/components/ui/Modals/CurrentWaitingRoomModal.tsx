import React from "react"
import { Modal } from "react-bootstrap"
import { useTranslation } from "react-i18next"

export interface ConfirmModalProps {
  modalConfirmOpen: boolean
  handleClick: (event: React.MouseEvent) => void
  closeWaitingRoom: (event: React.MouseEvent) => void
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ modalConfirmOpen, handleClick, closeWaitingRoom }) => {
  const { t } = useTranslation()
  return (
    <Modal
      show={modalConfirmOpen}
      className="modal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header pb-0">
            <h5 className="modal-title">{t("warning")} </h5>
          </div>
          <div className="modal-body pt-3 pb-0">
            <h6 style={{ fontWeight: 300 }}> {t("closeWaitingRoom?")} </h6>
            <div className="modal-footer pt-0 pb-0 pr-0">
              <button type="button" onClick={handleClick} className="btn pt-0 pb-0" data-dismiss="modal">
                <h6 style={{ fontWeight: 400 }}> {t("cancel")} </h6>
              </button>
              <button type="button" onClick={closeWaitingRoom} className="btn pr-0 pt-0 pb-0">
                <h6 style={{ fontWeight: 400 }}> {t("confirm")} </h6>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export interface TimeOutModalProps {
  modalTimeOutOpen: boolean
}

export const TimeOutModal: React.FC<TimeOutModalProps> = ({ modalTimeOutOpen }) => {
  const { t } = useTranslation()
  return (
    <Modal
      show={modalTimeOutOpen}
      className="modal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header pb-0">
            <h5 className="modal-title">{t("timeOut")}...</h5>
          </div>
          <div className="modal-body pt-3 pb-2">
            <h6 style={{ fontWeight: 300 }}> {t("createNewWaitingRoom")} </h6>
          </div>
        </div>
      </div>
    </Modal>
  )
}
