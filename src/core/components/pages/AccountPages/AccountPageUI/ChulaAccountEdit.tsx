import React, { useState, useContext } from "react"
import { useForm } from "react-hook-form"
import { Button } from "react-bootstrap"
import { UserContext } from "../../../../contexts/UsersContext"
import { useTranslation } from "react-i18next"
import { EdittedData, WarningMessage, CustomAccountModal } from "../../../ui/Modals/AccountPageModals"
import { client } from "../../../../../axiosConfig"
import { yupResolver } from "@hookform/resolvers/yup"
import { infoSchema } from "../../../../schemas/editUserInfo"

interface ChulaAccountEditProps {
  toggleEditButton: () => void
}

export default function ChulaAccountEdit({ toggleEditButton }: ChulaAccountEditProps) {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const [showErr, setShowErr] = useState(false)
  const [formData, setFormData] = useState<EdittedData>()

  const { cuStudentAccount: user } = useContext(UserContext)

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

  const postDataToBackend = async (data: EdittedData) => {
    await client
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
      <WarningMessage show={user!.is_first_login} account={user!.account_type} />
      <div className="default-mobile-wrapper animated-card">
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
          <input name="phone" type="number" ref={register} placeholder="0xxxxxxxxx" defaultValue={user?.phone} className="form-control" />
          {errors.phone && <p id="input-error">{errors.phone.message}</p>}

          <label className="form-label mt-2">{t("personalEmailLabel")}</label>
          <input name="personal_email" ref={register} placeholder="example@email.com" defaultValue={user?.personal_email} className="form-control" />
          {errors.personal_email && <p id="input-error">{errors.personal_email.message}</p>}

          <hr />
          <div className="row mt-3">
            <div className="button-group col-md-12">
              <Button variant="pink" className="btn-secondary" type="submit">
                {t("saveAndSubmit")}
              </Button>
            </div>
            <div className="button-group col-md-12">
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
