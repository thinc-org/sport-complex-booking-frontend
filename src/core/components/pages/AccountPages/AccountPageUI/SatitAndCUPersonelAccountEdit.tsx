import React from "react"
import { useState, useContext } from "react"
import {  Button } from "react-bootstrap"
import { useForm } from "react-hook-form";
import axios from "axios"
import { UserContext } from "../../../../contexts/UsersContext"
import { useAuthContext } from "../../../../controllers/authContext";
import { ConfirmModal, ErrorModal } from "../../../ui/Modals/AccountPageModals";
import { useTranslation } from 'react-i18next'

interface EdittedData {
  personal_email: String,
  phone: String,
  is_thai_language: Boolean
}

export default function SatitAndCUPersonelAccountEdit({  toggle_edit_button}) {
  const [show, setShow] = useState(false);
  const [showErr, setShowErr] = useState(false);

  const {token} = useAuthContext()
  const { is_thai_language } = useContext(UserContext)
  const { SatitCuPersonel } = useContext(UserContext)
  const user = SatitCuPersonel
  const {t} = useTranslation()
  
  // React Hook Forms
  const { register, handleSubmit, errors  } = useForm();

  const onSubmit = (data: EdittedData) => {
    postDataToBackend(data)
  };

  const handleCancel = (e) => {
    e.preventDefault()
    window.location.reload()
  }

  const postDataToBackend = async (data: EdittedData) => {
    console.log("send data to backend")
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
        console.log("SENT", data)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
        setShowErr(true);
      })
  }

  return (
    <div className="mx-auto col-md-6">
      <div className="default-mobile-wrapper">
        <div className="row mt-2">
          <div className="col-8">
            <h4 className="align-right">
              {user.name_en} {user.surname_en}
            </h4>
          </div>
        </div>
        <div className="row">
          <h6 className="mx-3">{t("satit_account_type")}</h6>
        </div>
        <hr className="mx-1" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <label className="form-label mt-2">{t("phone_label")}</label>
            <input name="phone" type="number" ref={register({
                required: "Enter your phone number",
                pattern: {
                  value: /^[A-Z0-9._%+-]/i,
                  message: "Enter a valid phone number",
                },
              })} placeholder="0xxxxxxxxx" defaultValue={user.phone} className="form-control"/>
            {errors.mobile && <p id="input-error">{errors.mobile.message}</p>}

            <label className="form-label mt-2">{t("personal_email_label")}</label>
            <input
              name="personal_email"
              ref={register({
                required: "Enter your e-mail",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Enter a valid e-mail address",
                },
              })}
              placeholder="example@email.com"
              defaultValue={user.personal_email}
              className="form-control"
            />
            {errors.personal_email && <p id="input-error">{errors.personal_email.message}</p>}
          </div>
          <br />
          <br />
          <div className="row">
            <div className="button-group col-md-12">
              <Button variant="gray" className="btn-secondary" onClick={handleCancel}>
                {t("cancel")}
              </Button>
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