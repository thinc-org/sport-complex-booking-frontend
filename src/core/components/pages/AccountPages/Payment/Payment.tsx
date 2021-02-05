import React, { useState } from "react"
import withUserGuard from "../../../../guards/user.guard"
import { useTranslation } from "react-i18next"
import { CustomAccountModal } from "../../../ui/Modals/AccountPageModals"
import { client } from "../../../../../axiosConfig"
import { DocumentUploadResponse } from "../../../../dto/account.dto"
import { Button, Row } from "react-bootstrap"
import { QuestionCircle, QuestionCircleFill } from "react-bootstrap-icons"
import { Redirect, useHistory } from "react-router"
import { usePaymentReminder } from "./PaymentReminder"

function Payment() {
  const [payment_slip, set_payment_slip] = useState<File>()
  const { t } = useTranslation()
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false)
  const [showPaymentErrorModal, setShowPaymentErrorModal] = useState(false)
  const [showAccountHint, setShowAccountHint] = useState(false)
  const history = useHistory()
  const { nearExpiration } = usePaymentReminder()

  const submitPayment = () => {
    if (payment_slip) {
      const formData = new FormData()
      formData.append("payment_slip", payment_slip, payment_slip?.name)
      client
        .post<DocumentUploadResponse>("/fs/upload", formData)
        .then(() => {
          setShowPaymentSuccessModal(true)
        })
        .catch(() => {
          setShowPaymentErrorModal(true)
        })
    }
  }

  const descriptions = []
  for (let i = 1; i <= 10; i++) {
    descriptions.push(
      <li key={i}>
        <p>{t(`otherAccountDescription.type${i}`)}</p>
      </li>
    )
  }

  return (
    <div className="mx-auto col-md-6">
      {!nearExpiration() && <Redirect to="/account" />}
      <div className="default-mobile-wrapper mt-3 animated-card">
        <h4>{t("paymentSection")}</h4>
        <div className="mx-3">
          <Row className="justify-content-between">
            <label className="form-label my-2">{t("paymentEvidenceLabel")}</label>
            <span onClick={() => setShowAccountHint(!showAccountHint)}>
              {!showAccountHint ? <QuestionCircle className="mt-2" size={20} /> : <QuestionCircleFill className="mt-2" size={20} />}
            </span>
          </Row>
          <Row>
            {showAccountHint && (
              <div className="hint-card-background mb-3">
                <ol className="pl-3">{descriptions}</ol>
              </div>
            )}
          </Row>
        </div>

        <div className="form-file">
          <p>{payment_slip ? "✓ " + payment_slip?.name.substring(0, 30) + "..." : ""}</p>
          <label htmlFor="paymentEvidence" className="form-file-input form-control text-center">
            {t("chooseFile")}
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            className="form-control"
            id="paymentEvidence"
            accept="application/pdf, image/png, image/jpeg"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]?.size > 2097152) {
                e.target.value = ""
                alert("fileTooBig")
              } else e.target.files && set_payment_slip(e.target.files[0])
            }}
          />
        </div>
      </div>
      <div className="button-group">
        <Button variant="pink" className="mt-3" disabled={!payment_slip || !nearExpiration()} onClick={() => submitPayment()}>
          {t("submit")}
        </Button>
      </div>
      {/* REGISTRATION SUCCESS MODAL */}
      <CustomAccountModal
        type="paymentSuccessModal"
        show={showPaymentSuccessModal}
        setShow={setShowPaymentSuccessModal}
        click={() => history.push("/account")}
      />
      {/* REGISTRATION SUCCESS MODAL */}
      <CustomAccountModal type="paymentErrorModal" show={showPaymentErrorModal} setShow={setShowPaymentErrorModal} />
    </div>
  )
}

export default withUserGuard(Payment)
