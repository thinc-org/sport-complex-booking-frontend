import React, { useContext } from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import withUserGuard from "../../../../guards/user.guard"
import { useTranslation } from "react-i18next"
import { ExclamationCircleFill } from "react-bootstrap-icons"
import { UserContext } from "../../../../contexts/UsersContext"
import { PaymentMessage } from "./PaymentModals"

export const usePaymentReminder = () => {
  const { otherAccount: user } = useContext(UserContext)
  const expirationDate = (expirationDate: string | Date | undefined): Date => {
    if (expirationDate) return new Date(expirationDate.toString().substring(0, 10))
    else return new Date()
  }
  const nearExpiration = () => {
    const today = new Date().getTime() / (1000 * 60 * 60 * 24)
    const expire = expirationDate(user?.account_expiration_date).getTime() / (1000 * 60 * 60 * 24)
    return expire - today <= 7
  }

  return { nearExpiration, user }
}

function PaymentReminder() {
  const { t } = useTranslation()
  const { nearExpiration, user } = usePaymentReminder()

  if (!nearExpiration() || !user?.account_expiration_date) return null

  return (
    <div>
      <PaymentMessage show={true} payment_status={user.payment_status} />
      {user.payment_status !== "Submitted" && (
        <div className="default-mobile-wrapper mt-3 animated-card">
          <span className="mb-1 mr-2">
            <ExclamationCircleFill color="#8c8c8c" />
          </span>{" "}
          {t("accountWillExpireOn") + user?.account_expiration_date?.toString().substring(0, 10)}
          <div className="button-group">
            <Link to="/payment">
              <Button className="mb-0 mt-3 btn-sm btn-info">{t("extendAccount")}</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default withUserGuard(PaymentReminder)
