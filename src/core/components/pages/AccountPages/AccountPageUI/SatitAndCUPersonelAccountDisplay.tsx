import React, { useContext } from "react"
import { Button } from "react-bootstrap"
import { UserContext } from "../../../../contexts/UsersContext"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useNameLanguage } from "../../../../utils/language"
import { AccountProps } from "../../../../dto/account.dto"

export default function SatitAndCUPersonelAccountDisplay({ toggleEditButton }: AccountProps) {
  const { satitCuPersonelAccount: user } = useContext(UserContext)
  const { t } = useTranslation()
  const nameLanguage = useNameLanguage("name")
  const surnameLanguage = useNameLanguage("surname")

  return (
    <div className="mx-auto col-md-6">
      <div className="default-mobile-wrapper mt-3 animated-card">
        <div className="row mt-2">
          <div className="col-8">{user && <h4 className="align-right">{user[nameLanguage] + " " + user[surnameLanguage]}</h4>}</div>
          <div className="col-4">
            <Button className="btn-secondary float-right" onClick={toggleEditButton}>
              {t("edit")}
            </Button>
          </div>
        </div>
        <div className="row">
          <h6 className="mx-3 mt-3">{t(`${user?.account_type}AccountType`)}</h6>
        </div>
        <hr className="mx-1" />
        <div>
          <label className="form-label mt-2">{t("username")}</label>
          <p>{user?.username}</p>
          <hr />
          <label className="form-label mt-2">{t("phoneLabel")}</label>
          <p>{user?.phone}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">{t("personalEmailLabel")}</label>
          <p>{user?.personal_email}</p>
          <div className="valid-feedback"></div>
        </div>
      </div>

      <div className="button-group col-md-12 mt-4">
        <Link to={"/changePassword"}>
          <button className="btn-normal btn-outline-black">{t("changePassword")}</button>
        </Link>
      </div>

      <br />
    </div>
  )
}
