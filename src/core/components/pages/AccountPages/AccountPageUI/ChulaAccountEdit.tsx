import React, { useState, useContext } from "react"
import { useForm } from "react-hook-form";
import {  Button } from "react-bootstrap"
import { UserContext } from "../../../../contexts/UsersContext"
import { useTranslation } from 'react-i18next'
import { ConfirmModal, ErrorModal, EdittedData, WarningMessage } from "../../../ui/Modals/AccountPageModals";
import { client } from "../../../../../axiosConfig";

export default function ChulaAccountEdit({ toggleEditButton }) {
  const [show, setShow] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [formData, setFormData] = useState<EdittedData>()
  const {t} = useTranslation()
  const { cuStudentAccount: user } = useContext(UserContext)

  // React Hook Forms
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: EdittedData) => {
    setShow(true)
    setFormData(data)
    //postDataToBackend(data)
  };

  const handleCancel = (e) => {
    e.preventDefault()
    toggleEditButton()
  }

  const postDataToBackend = async (data: EdittedData) => {
    await client.put('/account_info', data)
      .then(() => {
          window.location.reload()
      })
      .catch((err) => {
          console.log(err);
          setShowErr(true);
      })
  }

  return (
    <div className="mx-auto col-md-6">
      <WarningMessage show={user!.is_first_login}/>
      <div className="default-mobile-wrapper">
        <div className="row mt-2">
          <div className="col-8">
            <h4 className="align-right">
              {user?.name_en} {user?.surname_en}
            </h4>
          </div>
        </div>
        <div className="row">
          <h6 className="mx-3">{t("chulaAccountType")}</h6>
        </div>
        <hr className="mx-1" />
        <form onSubmit={handleSubmit(onSubmit)}>

            <label className="form-label mt-2">{t("phoneLabel")}</label>
            <input name="phone" type="number" ref={register({
              required:  t("phone_error_message").toString(),
              pattern: {
                value: /^[A-Z0-9._%+-]/i,
                message: t("phone_error_message"),
              },
            })} placeholder="0xxxxxxxxx" defaultValue={user?.phone} className="form-control"/>
            {errors.phone && <p id="input-error">{errors.phone.message}</p>}

            <label className="form-label mt-2">{t("personalEmailLabel")}</label>
            <input name="personal_email" ref={register(
              {
                required: t("email_error_message").toString(),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: t("email_error_message"),
                },
              }
            )} placeholder="example@email.com" defaultValue={user?.personal_email} className="form-control"/>

            {errors.personal_email && <p id="input-error">{errors.personal_email.message}</p>}

          <hr/>
          <div className="row mt-3">
            <div className="button-group col-md-12">
              <Button variant="gray" className="btn-secondary" onClick={handleCancel}>
                {t("cancel")}
              </Button>
            </div>
            <div className="button-group col-md-12">
              <Button variant="pink" className="btn-secondary" type="submit" onClick={()=> setShow(true)}>
                {t("saveAndSubmit")}
              </Button>
            </div>
          </div>

          {/* MODAL CONFIRM DIALOGUE */}
          <ConfirmModal show={show} setShow={setShow}  postDataToBackend={postDataToBackend} formData={formData}/>
          {/* MODAL ERROR */}
          <ErrorModal showErr={showErr} setShowErr={setShowErr}/>
        </form>
      </div>
      <br />
    </div>
  )
}
