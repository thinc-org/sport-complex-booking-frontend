import React, { useContext } from "react"
import { Button } from "react-bootstrap"
import { UserContext } from "../../../../contexts/UsersContext"
import { useTranslation } from "react-i18next"
import { WarningMessage } from "../../../ui/Modals/AccountPageModals"
import { useNameLanguage } from "../../../../utils/language"
import { AccountProps } from "../../../../dto/account.dto"

export default function ChulaAccountDisplay({ toggleEditButton }: AccountProps) {
  const { cuStudentAccount: user } = useContext(UserContext)
  const { t } = useTranslation()
  const nameLanguage = useNameLanguage("name")
  const surnameLanguage = useNameLanguage("surname")

  return (
    <div className="mx-auto col-md-6">
      {user && <WarningMessage show={user.is_first_login} account={user.account_type} />}
      <div className="default-mobile-wrapper animated-card">
        <div className="row mt-2">
          <div className="col-8">{user && <h4 className="align-right">{user[nameLanguage] + " " + user[surnameLanguage]}</h4>}</div>
          <div className="col-4">
            <Button className="btn-secondary btn-sm float-right" onClick={toggleEditButton}>
              {t("edit")}
            </Button>
          </div>
        </div>
        <div className="row">
          <h6 className="mx-3 mt-3">{t("chulaAccountType")}</h6>
        </div>
        <hr className="mx-1" />
        <div className="">
          <label className="form-label mt-2">{t("phoneLabel")}</label>
          <p>{user?.phone}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">{t("personalEmailLabel")}</label>
          <p>{user?.personal_email}</p>
          <div className="valid-feedback"></div>
        </div>
      </div>
      <div className="button-group col-md-12 mt-4"></div>
      <br />
    </div>
  )
}
