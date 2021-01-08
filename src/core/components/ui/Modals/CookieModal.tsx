import React from "react"
import { Modal, Button } from "react-bootstrap"
import { useTranslation } from "react-i18next"

export interface CookieModalProps {
  show: boolean
  handleClick: (event: React.MouseEvent) => void
}

export const CookieModal: React.FC<CookieModalProps> = ({ show, handleClick }) => {
  const { t } = useTranslation()
  return (
    <Modal
      show={show}
      className="modal"
      id="exampleModalCenter"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header pb-0">
            <h5 className="modal-title"> {t("websiteUseCookie")} </h5>
          </div>
          <div className="modal-body pt-1 pb-0" style={{ fontSize: "14px", fontWeight: 300, lineHeight: "17px" }}>
            {t("cookieDescription")}
          </div>
          <div className="modal-footer pt-3 pb-0 pr-0">
            <Button variant="pink" onClick={handleClick} className="btn pt-1 pb-1" data-dismiss="modal" style={{ fontSize: "14px", fontWeight: 400 }}>
              {t("allow")}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
