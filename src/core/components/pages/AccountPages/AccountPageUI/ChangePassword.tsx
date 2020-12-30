import React from "react"
import { useState, useContext } from "react"
import { Button } from "react-bootstrap"
import { UserContext } from "../../../../contexts/UsersContext"
import { useForm } from "react-hook-form";
import withUserGuard from "../../../../guards/user.guard";
import { ConfirmationModal, PasswordMismatchModal, PasswordData, PasswordChangeSuccess, PasswordChangeError } from "../../../ui/Modals/ChangePasswordModals";
import { useTranslation } from 'react-i18next'
import { Redirect, useHistory } from "react-router-dom";
import { client } from "../../../../../axiosConfig";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

function ChangePassword() {
  const {t} = useTranslation()
  // Yup form validation schema
  const schema = yup.object().shape({
    oldPassword: yup.string().required(t("enterOldPass")),
    newPassword: yup.string().required(t("enterNewPass")).min(6, t("containMoreThan6")),
    repeatNewPassword: yup.string().required(t("enterNewPass")).min(6, t("containMoreThan6")).oneOf([yup.ref('newPassword'), null], t("passMustMatch"))
  })

  const { register, handleSubmit, errors } = useForm({resolver: yupResolver(schema)});  
  const [show, setShow] = useState(false);
  const [passwordData, setPasswordData] = useState<PasswordData>();
  const [showPasswordMismatch, setShowPasswordMismatch] = useState(false);
  const [repeatedPasswordError, setRepeatedPassword] =useState(false)
  const {cuStudentAccount} = useContext(UserContext)
  const [showChangeSuccess, setShowChangeSuccess] = useState(false)
  const [showChangeError, setShowChangeError] = useState(false)
  const history = useHistory();
  
  const onSubmit = (data: PasswordData) => {
    if (data.oldPassword !== data.newPassword ) {
      setRepeatedPassword(false)
      if (data.newPassword !== data.repeatNewPassword!) {
        setShowPasswordMismatch(true);
      } else {
        delete data.repeatNewPassword
        setPasswordData({...data})
        setShow(true)
      } 
    } else {
      setRepeatedPassword(true)
    }
  };

  const returnToAccountPage = () => {
    history.push('/account')
  }

  const postDataToBackend = async (data: PasswordData) => {
    await client.post('/account_info/change_password', data)
      .then((res) => {
          setShowChangeSuccess(true)
      })
      .catch((err) => {
          console.log(err);
      })
    setShow(false)
  }
    
  return (
    <div className="mx-auto col-md-6 mt-3">
      {cuStudentAccount?.account_type === "CuStudent" ? <Redirect to="/account" /> : null}
      <div className="default-mobile-wrapper animated-card">
        <div className="row mt-2">
          <div className="col-8">
            <h4 className="align-right">
              {t("changePassword")}
            </h4>
          </div>
        </div>
        <label className="form-label mt-2">{t("oldPassword")}</label>
        <input name="oldPassword" type="password" ref={register} placeholder="Old Password" className="form-control"/>
        {errors.oldPassword && <p id="input-error">{errors.oldPassword.message}</p>}
        <hr/>

        <label className="form-label mt-2">{t("newPassword")}</label>
        <input name="newPassword" type="password" ref={register} placeholder="New Password" className="form-control"/>
        {errors.newPassword && <p id="input-error">{errors.newPassword.message}</p>}
        
        <label className="form-label mt-2">{t("repeatNewPassword")}</label>
        <input name="repeatNewPassword" type="password" ref={register} placeholder="Repeat New Password" className="form-control"/>
        {errors.repeatNewPassword && <p id="input-error">{errors.repeatNewPassword.message}</p>}
        {repeatedPasswordError ? (<p className="input-error mt-2">{t("oldNewPassMustDiff")}</p>):(null)}
        <hr/>
        <div className="button-group mt-4 pb-0">
          <Button type="submit" variant="pink" className="btn-secondary mb-0" onClick={handleSubmit(onSubmit)}>
          {t("saveAndSubmit")}
        </Button>
        </div>
        
      </div>
      <br />
      {/* Confirmation Dialog */}
      <ConfirmationModal show={show} setShow={setShow} postDataToBackend={postDataToBackend} passwordData={passwordData}/>
      {/* Password mismatch error modal */}
      <PasswordMismatchModal show={showPasswordMismatch} setShowPasswordMismatch={setShowPasswordMismatch} />
      {/* Success password change modal */}
      <PasswordChangeSuccess show={showChangeSuccess} setShowChangeSuccess={setShowChangeSuccess} returnToAccountPage={returnToAccountPage}/>
      {/* Password Change Error */}
      <PasswordChangeError show={showChangeError} setShowChangeError={setShowChangeError} />
    </div>
  )
}

export default withUserGuard(ChangePassword)