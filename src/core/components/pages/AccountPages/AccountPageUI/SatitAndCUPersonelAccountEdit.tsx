import React, { useState, useContext } from "react"
import { Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { UserContext } from "../../../../contexts/UsersContext"
import { EdittedData, CustomAccountModal } from "../../../ui/Modals/AccountPageModals"
import { useTranslation } from "react-i18next"
import { client } from "../../../../../axiosConfig"
import { yupResolver } from "@hookform/resolvers/yup"
import { infoSchema } from "../../../../schemas/editUserInfo"
import { useNameLanguage } from "../../../../utils/language"
import { AccountProps } from "../../../../dto/account.dto"

export default function SatitAndCUPersonelAccountEdit({ toggleEditButton }: AccountProps) {
  const { t } = useTranslation()

  const [show, setShow] = useState(false)
  const [showErr, setShowErr] = useState(false)
  const [formData, setFormData] = useState<EdittedData>()
  const { satitCuPersonelAccount: user } = useContext(UserContext)
  const nameLanguage = useNameLanguage("name")
  const surnameLanguage = useNameLanguage("surname")

  // React Hook Forms
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(infoSchema) })

  const onSubmit = (data: EdittedData) => {
    setShow(true)
    setFormData(data)
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleEditButton()
  }

  const postDataToBackend = (data: EdittedData) => {
    client
      .put<EdittedData>("/account_info", data)
      .then(() => {
        window.location.reload()
      })
      .catch(() => {
        setShowErr(true)
      })
  }

  return (
    <div className="mx-auto col-md-6">
      <div className="default-mobile-wrapper animated-card">
        <div className="row mt-2">
          <div className="col-8">{user && <h4 className="align-right">{user[nameLanguage] + " " + user[surnameLanguage]}</h4>}</div>
        </div>
        <div className="row">
          <h6 className="mx-3">{t("satitAccountType")}</h6>
        </div>
        <hr className="mx-1" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <label className="form-label mt-2">{t("phoneLabel")}</label>
            <input name="phone" type="number" ref={register} placeholder="0xxxxxxxxx" defaultValue={user?.phone} className="form-control" />
            {errors.mobile && <p id="input-error">{errors.mobile.message}</p>}

            <label className="form-label mt-2">{t("personalEmailLabel")}</label>
            <input
              name="personal_email"
              ref={register}
              placeholder="example@email.com"
              defaultValue={user?.personal_email}
              className="form-control"
            />
            {errors.personal_email && <p id="input-error">{errors.personal_email.message}</p>}
          </div>
          <hr />
          <div className="row mt-3">
            <div className="button-group col-md-12">
              <Button variant="pink" className="btn-secondary" type="submit" onClick={() => setShow(true)}>
                {t("saveAndSubmit")}
              </Button>
              <Button variant="gray" className="btn-secondary" onClick={handleCancel}>
                {t("cancel")}
              </Button>
            </div>
          </div>

          {/* MODAL CONFIRM DIALOGUE */}
          <CustomAccountModal type="confirmEditAccountModal" show={show} setShow={setShow} mainFunction={postDataToBackend} data={formData} />
          {/* MODAL ERROR */}
          <CustomAccountModal type="editAccountErrorModal" show={showErr} setShow={setShowErr} />
        </form>
      </div>
      <br />
    </div>
  )
}
