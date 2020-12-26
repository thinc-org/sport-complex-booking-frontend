import React from "react"
import { useState, useContext } from "react"
import { useForm } from "react-hook-form";
import {  Button, Modal } from "react-bootstrap"
import axios from "axios"
import { UserContext } from "../../../../contexts/UsersContext"
import { useAuthContext } from "../../../../controllers/authContext";
import { useTranslation } from 'react-i18next'
import { ConfirmModal, ErrorModal } from "../../../ui/Modals/AccountPageModals";


interface EdittedData {
  personal_email: String,
  phone: String,
  is_thai_language: Boolean
}

export default function ChulaAccountEdit() {
  const [show, setShow] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const {t} = useTranslation()
  const {token} = useAuthContext()
  const { is_thai_language } = useContext(UserContext)
  const { CuStudent } = useContext(UserContext)
  const user = CuStudent

  // React Hook Forms
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: EdittedData) => {
    postDataToBackend(data)
  };

  const handleCancel = (e) => {
    e.preventDefault()
    window.location.reload()
  }

  const showWarningMessage = (firstLogin: Boolean) => {
    if (firstLogin) {
      return (
        <div className="alert alert-danger mt-3" role="alert">
          <h3>{t("warning")}</h3>
          <h6>{t("please_submit_regis_form")}</h6>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  const postDataToBackend = async (data: EdittedData) => {
    data = {
      ...data,
      is_thai_language: is_thai_language,
    }
    await axios
      .put("http://localhost:3000/account_info/", data, {
        headers: {
          Authorization: "bearer " + token,
        },
      })
      .then(({ data }) => {
        window.location.reload()
      })

      .catch((err) => {
        console.log(err);
        setShowErr(true);
      })
  }

  return (
    <div className="mx-auto col-md-6">
      {showWarningMessage(user.is_first_login)}
      <div className="default-mobile-wrapper">
        <div className="row mt-2">
          <div className="col-8">
            <h4 className="align-right">
              {user.name_en} {user.surname_en}
            </h4>
          </div>
        </div>
        <div className="row">
          <h6 className="mx-3">{t("chula_account_type")}</h6>
        </div>
        <hr className="mx-1" />
        <form onSubmit={handleSubmit(onSubmit)}>

            <label className="form-label mt-2">{t("phone_label")}</label>
            <input name="phone" type="number" ref={register({
              required:  t("phone_error_message").toString(),
              pattern: {
                value: /^[A-Z0-9._%+-]/i,
                message: t("phone_error_message"),
              },
            })} placeholder="0xxxxxxxxx" defaultValue={user.phone} className="form-control"/>
            {errors.phone && <p id="input-error">{errors.phone.message}</p>}

            <label className="form-label mt-2">{t("personal_email_label")}</label>
            <input name="personal_email" ref={register(
              {
                required: t("email_error_message").toString(),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: t("email_error_message"),
                },
              }
            )} placeholder="example@email.com" defaultValue={user.personal_email} className="form-control"/>

            {errors.personal_email && <p id="input-error">{errors.personal_email.message}</p>}

          <br />
          <div className="row">
            <div className="button-group col-md-12">
              <Button variant="gray" className="btn-secondary" onClick={handleCancel}>
                {t("cancel")}
              </Button>
            </div>
            <div className="button-group col-md-12">
              <Button variant="pink" className="btn-secondary" onClick={()=> setShow(true)}>
                {t("save_and_submit")}
              </Button>
            </div>
          </div>

          {/* MODAL CONFIRM DIALOGUE */}
          <ConfirmModal show={show} setShow={setShow} handleSubmit={handleSubmit} onSubmit={onSubmit}/>
          {/* MODAL ERROR */}
          <ErrorModal showErr={showErr} setShowErr={setShowErr}/>
        </form>
      </div>
      <br />
    </div>
  )
}
