import React, { useState } from "react"
import withUserGuard from "../../../../guards/user.guard"
import { useTranslation } from "react-i18next"
import { CustomAccountModal } from "../../../ui/Modals/AccountPageModals"
import { client } from "../../../../../axiosConfig"
import { DocumentUploadResponse } from "../../../../dto/account.dto"
import { Button, Row } from "react-bootstrap"
import { Redirect, useHistory } from "react-router"
import { useExtensionReminder } from "./PaymentReminder"

function SatitAccountExtension() {
  const [student_card_photo, set_student_card_photo] = useState<File>()
  const { t } = useTranslation()
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false)
  const [showPaymentErrorModal, setShowPaymentErrorModal] = useState(false)
  const history = useHistory()
  const { nearExpiration } = useExtensionReminder()

  const submitPayment = () => {
    if (student_card_photo) {
      const formData = new FormData()
      formData.append("student_card_photo", student_card_photo, student_card_photo?.name)
      client
        .post<DocumentUploadResponse>("/fs/uploadSatit", formData)
        .then(() => {
          setShowPaymentSuccessModal(true)
        })
        .catch(() => {
          setShowPaymentErrorModal(true)
        })
    }
  }

  return (
    <div className="mx-auto col-md-6">
      {!nearExpiration() && <Redirect to="/account" />}
      <div className="default-mobile-wrapper mt-3 animated-card">
        <h4>{t("extendAccount")}</h4>
        <div className="mx-3">
          <Row className="justify-content-between">
            <label className="form-label my-2">{t("studentCardPhotoLabel")}</label>
          </Row>
        </div>

        <div className="form-file">
          <p>{student_card_photo ? "✓ " + student_card_photo?.name.substring(0, 30) + "..." : ""}</p>
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
                alert(t("fileTooBig"))
              } else e.target.files && set_student_card_photo(e.target.files[0])
            }}
          />
        </div>
      </div>
      <div className="button-group">
        <Button variant="pink" className="mt-3" disabled={!student_card_photo || !nearExpiration()} onClick={() => submitPayment()}>
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

export default withUserGuard(SatitAccountExtension)
