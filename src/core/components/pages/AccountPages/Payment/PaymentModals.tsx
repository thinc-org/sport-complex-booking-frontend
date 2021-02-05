import React from "react"
import { useTranslation } from "react-i18next"

export interface PaymentMessageProps {
  show: boolean
  payment_status?: string
}

interface PaymentAlertProps {
  title?: string
  message?: string
  category: string
}

const PaymentAlert: React.FC<PaymentAlertProps> = ({ title, message, category }) => {
  return (
    <div className={`alert alert-${category} mt-3`} role="alert">
      <h3>{title}</h3>
      <h6>{message}</h6>
    </div>
  )
}

export const PaymentMessage: React.FC<PaymentMessageProps> = ({ show, payment_status }) => {
  const { t } = useTranslation()
  if (!show) return null
  switch (payment_status) {
    case "Rejected": {
      return <PaymentAlert message={t("paymentRejectedMessage")} category="danger" />
    }
    case "Submitted": {
      return <PaymentAlert message={t("paymentSubmittedMessage")} category="success" />
    }
    default: {
      return null
    }
  }
}
