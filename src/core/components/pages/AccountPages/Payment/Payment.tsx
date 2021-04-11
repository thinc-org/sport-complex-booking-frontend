import React, { useContext, useEffect, useState } from "react"
import withUserGuard from "../../../../guards/user.guard"
import { useTranslation } from "react-i18next"
import { CustomAccountModal } from "../../../ui/Modals/AccountPageModals"
import { client } from "../../../../../axiosConfig"
import { DocumentUploadResponse } from "../../../../dto/account.dto"
import { Button, Row } from "react-bootstrap"
import { QuestionCircle, QuestionCircleFill } from "react-bootstrap-icons"
import { Redirect, useHistory } from "react-router"
import { useExtensionReminder } from "./PaymentReminder"
import { UserContext } from "../../../../contexts/UsersContext"

function Payment() {
  const [document, set_document] = useState<File>()
  const { t } = useTranslation()
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false)
  const [showPaymentErrorModal, setShowPaymentErrorModal] = useState(false)
  const [showAccountHint, setShowAccountHint] = useState(false)
  const history = useHistory()
  const { nearExpiration } = useExtensionReminder()
  const user = useContext(UserContext)
  const userAccountType: "SatitAndCuPersonel" | "Other" | undefined = user.otherAccount
    ? user.otherAccount.account_type
    : user.satitCuPersonelAccount?.account_type

  const submitPayment = () => {
    if (document) {
      const formData = new FormData()
      if (userAccountType === "Other") formData.append("payment_slip", document, document?.name)
      else if (userAccountType === "SatitAndCuPersonel") formData.append("student_card_photo", document, document?.name)
      else return
      const endpointName: string = userAccountType === "Other" ? "upload" : "uploadSatit"

      client
        .post<DocumentUploadResponse>(`/fs/${endpointName}`, formData)
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

  useEffect(() => {
    // if the user did not land on this page by clicking a button on the warning, redirect them back
    if (!user.otherAccount && !user.satitCuPersonelAccount) history.push("/account")
    if (user.cuStudentAccount) history.push("/account")
    return
  }, [history, user])

  return (
    <div className="mx-auto col-md-6">
      {!nearExpiration() && <Redirect to="/account" />}
      <div className="default-mobile-wrapper mt-3 animated-card">
        <h4>{userAccountType === "Other" ? t("paymentSection") : t("extendAccount")}</h4>
        <div className="mx-3">
          <Row className="justify-content-between">
            <label className="form-label my-2">{userAccountType === "Other" ? t("paymentEvidenceLabel") : t("studentCardPhotoLabel")}</label>
            {userAccountType === "Other" && (
              <span onClick={() => setShowAccountHint(!showAccountHint)}>
                {!showAccountHint ? <QuestionCircle className="mt-2" size={20} /> : <QuestionCircleFill className="mt-2" size={20} />}
              </span>
            )}
          </Row>
          <Row>
            {showAccountHint && (
              <div className="hint-card-background mb-3">
                <ol className="pl-3">{descriptions}</ol>
              </div>
            )}
          </Row>
        </div>

        {userAccountType === "Other" && (
          <div className="form-file">
            <p>{document ? "✓ " + document?.name.substring(0, 30) + "..." : ""}</p>
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
                } else e.target.files && set_document(e.target.files[0])
              }}
            />
          </div>
        )}

        {userAccountType === "SatitAndCuPersonel" && (
          <div className="form-file">
            <p>{document ? "✓ " + document?.name.substring(0, 30) + "..." : ""}</p>
            <label htmlFor="paymentEvidence" className="form-file-input form-control text-center">
              {t("chooseFile")}
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              className="form-control"
              id="paymentEvidence"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]?.size > 2097152) {
                  e.target.value = ""
                  alert(t("fileTooBig"))
                } else e.target.files && set_document(e.target.files[0])
              }}
            />
          </div>
        )}
      </div>
      <div className="button-group">
        <Button variant="pink" className="mt-3" disabled={!document || !nearExpiration()} onClick={() => submitPayment()}>
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
