import React from "react"
import { useState, useContext } from "react"
import {  Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { UserContext } from "../../../../contexts/UsersContext"
import { ConfirmModal, ErrorModal, EdittedData } from "../../../ui/Modals/AccountPageModals"
import { useTranslation } from 'react-i18next'
import { client } from "../../../../../axiosConfig"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export default function SatitAndCUPersonelAccountEdit({  toggleEditButton }) {
  const {t} = useTranslation()
  const schema = yup.object().shape({
    phone: yup.string().required(t("phoneErrorMessage")),
    personal_email: yup.string().required(t("emailErrorMessage")).email(t("emailErrorMessage")),
  })
  const [show, setShow] = useState(false)
  const [showErr, setShowErr] = useState(false)
  const [formData, setFormData] = useState<EdittedData>()
  const { satitCuPersonelAccount:user } = useContext(UserContext)

  
  // React Hook Forms
  const { register, handleSubmit, errors  } = useForm({resolver: yupResolver(schema)})

  const onSubmit = async (data: EdittedData) => {
    const valid = await schema.isValid(data)
    if (valid) {
      setShow(true)
      setFormData(data)
    }
  }

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
          setShowErr(true)
      })
  }

  return (
    <div className="mx-auto col-md-6">
      <div className="default-mobile-wrapper animated-card">
        <div className="row mt-2">
          <div className="col-8">
            <h4 className="align-right">
              {user?.name_en} {user?.surname_en}
            </h4>
          </div>
        </div>
        <div className="row">
          <h6 className="mx-3">{t("satitAccountType")}</h6>
        </div>
        <hr className="mx-1" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <label className="form-label mt-2">{t("phoneLabel")}</label>
            <input name="phone" type="number" ref={register} placeholder="0xxxxxxxxx" defaultValue={user?.phone} className="form-control"/>
            {errors.mobile && <p id="input-error">{errors.mobile.message}</p>}

            <label className="form-label mt-2">{t("personalEmailLabel")}</label>
            <input
              name="personal_email" ref={register} placeholder="example@email.com" defaultValue={user?.personal_email} className="form-control"/>
            {errors.personal_email && <p id="input-error">{errors.personal_email.message}</p>}
          </div>
          <hr/>
          <div className="row mt-3">
            <div className="button-group col-md-12">
              <Button variant="gray" className="btn-secondary" onClick={handleCancel}>
                {t("cancel")}
              </Button>
              <Button variant="pink" className="btn-secondary" type="submit" onClick={()=> setShow(true)}>
                {t("saveAndSubmit")}
              </Button>
            </div>
          </div>

          {/* MODAL CONFIRM DIALOGUE */}
          <ConfirmModal show={show} setShow={setShow} postDataToBackend={postDataToBackend} formData={formData}/>
          {/* MODAL ERROR */}
          <ErrorModal showErr={showErr} setShowErr={setShowErr}/>
        </form>
      </div>
      <br />
    </div>
  )
}