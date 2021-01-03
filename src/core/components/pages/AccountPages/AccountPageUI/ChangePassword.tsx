import React, { useState, useContext } from "react"
import { Button } from "react-bootstrap"
import { UserContext } from "../../../../contexts/UsersContext"
import { useForm } from "react-hook-form"
import withUserGuard from "../../../../guards/user.guard"
import { PasswordData, CustomModal } from "../../../ui/Modals/ChangePasswordModals"
import { useTranslation } from 'react-i18next'
import { Redirect, useHistory } from "react-router-dom"
import { client } from "../../../../../axiosConfig"
import { yupResolver } from '@hookform/resolvers/yup'
import {changePasswordSchema} from '../../../../schemas/resetPassword'

function ChangePassword() {
  const {t} = useTranslation()
  const { register, handleSubmit, errors } = useForm({resolver: yupResolver(changePasswordSchema)})
  const [show, setShow] = useState(false)
  const [passwordData, setPasswordData] = useState<PasswordData>()
  const {cuStudentAccount} = useContext(UserContext)
  const [showChangeSuccess, setShowChangeSuccess] = useState(false)
  const [showChangeError, setShowChangeError] = useState(false)
  const history = useHistory()
  
  const onSubmit = (data: PasswordData) => {
    delete data.repeatNewPassword
    setPasswordData({...data})
    setShow(true)
  }

  const returnToAccountPage = () => {
    history.push('/account')
  }

  const postDataToBackend = async (data: PasswordData) => {
    await client.post('/account_info/change_password', data)
      .then(() => {
          setShowChangeSuccess(true)
      })
      .catch((err) => {
          console.log(err)
          setShowChangeError(true)
      })
    setShow(false)
  }
    
  return (
    <div className="mx-auto col-md-6 mt-3">
      {cuStudentAccount?.account_type === "CuStudent" &&  <Redirect to="/account" />}
      <div className="default-mobile-wrapper animated-card">
        <div className="row mt-2">
          <div className="col-8">
            <h4 className="align-right">
              {t("changePassword")}
            </h4>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-label mt-2">{t("oldPassword")}</label>
          <input name="oldPassword" type="password" ref={register} placeholder={t("oldPassword")} className="form-control"/>
          {errors.oldPassword && <p id="input-error">{errors.oldPassword.message}</p>}
          <hr/>
          <label className="form-label mt-2">{t("newPassword")}</label>
          <input name="newPassword" type="password" ref={register} placeholder={t("newPassword")} className="form-control"/>
          {errors.newPassword && <p id="input-error">{errors.newPassword.message}</p>} 
          <label className="form-label mt-2">{t("repeatNewPassword")}</label>
          <input name="repeatNewPassword" type="password" ref={register} placeholder={t("repeatNewPassword")} className="form-control"/>
          {errors.repeatNewPassword && <p id="input-error">{errors.repeatNewPassword.message}</p>}
          <hr/>
          <div className="button-group mt-4 pb-0">
            <Button type="submit" variant="pink" className="btn-secondary mb-0">
            {t("saveAndSubmit")}
          </Button>
          </div>
        </form>
        
      </div>
      <br />
      {/* Confirmation Dialog */}
      <CustomModal type={"passwordChangeConfirm"} show={show} setShow={setShow} mainFunction={postDataToBackend} data={passwordData}/>
      {/* Success password change modal */}
      <CustomModal type={"passwordChangeSuccess"} show={showChangeSuccess} setShow={setShowChangeSuccess} mainFunction={returnToAccountPage}/>
      {/* Password Change Error */}
      <CustomModal type={"passwordChangeError"} show={showChangeError} setShow={setShowChangeError} mainFunction={()=>setShowChangeError(false)}/>
    </div>
  )
}

export default withUserGuard(ChangePassword)