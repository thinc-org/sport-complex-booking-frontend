import React from "react"
import { useContext } from "react"
import { Button } from "react-bootstrap"
import { UserContext } from "../../../../contexts/UsersContext"
import { useTranslation } from 'react-i18next'
import { WarningMessage } from "../../../ui/Modals/AccountPageModals"

export default function ChulaAccountDisplay({ toggle_edit_button }) {

  const { CuStudent:user } = useContext(UserContext);
  const {t, i18n} = useTranslation()
  const language = () => i18n.language

  const showWarningMessage = (firstLogin: boolean) => {
    if (firstLogin) {
      return (
        <div className="alert alert-danger  mt-3" role="alert">
          <h3>{t("warning")}</h3>
          <h6>{t("pleaseSubmitRegisForm")}</h6>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div className="mx-auto col-md-6">
      <WarningMessage show={user!.is_first_login}/>
      <div className="default-mobile-wrapper">
        <div className="row mt-2">
          <div className="col-8">
            <h4 className="align-right">

              {(language() === 'th') 
              ? (user?.name_th + " " + user?.surname_th) 
              : (user?.name_en + " " + user?.surname_en)}
              
            </h4>
          </div>
          <div className="col-4">
            <Button className="btn-secondary float-right" onClick={toggle_edit_button}>
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
      <div className="button-group col-md-12 mt-4">
      </div>
      <br />
    </div>
  )
}
