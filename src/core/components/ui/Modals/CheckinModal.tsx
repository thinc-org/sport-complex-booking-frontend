import React from "react"
import { Modal } from "react-bootstrap"
import { useTranslation } from "react-i18next"

export interface CheckinModalProps {
  modalOpen: boolean
  messageHeader: string
  messageBody: string
  currentTime?: string
  validTime?: string
}

export const CheckinModal: React.FC<CheckinModalProps> = ({ modalOpen, messageHeader, messageBody, currentTime, validTime }) => {
  const { t } = useTranslation()

  return (
    <Modal show={modalOpen} className="modal" tabIndex={-1} role="dialog" aria-labelledby="contained-modal-title-vcenter" centered aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header pb-0">
            <h5 className="modal-title"> {messageHeader} </h5>
          </div>
          <div className="modal-body pt-1 pb-0" style={{ fontSize: "14px", fontWeight: 300 }}>
            <div>{messageBody}</div>
            {currentTime && <div>{`${t("currentTime")} ${currentTime}`}</div>}
            {validTime && <div>{`${t("validTime")} ${validTime}`}</div>}
          </div>
          <div className="modal-footer pt-0 pb-0"></div>
        </div>
      </div>
    </Modal>
  )
}
