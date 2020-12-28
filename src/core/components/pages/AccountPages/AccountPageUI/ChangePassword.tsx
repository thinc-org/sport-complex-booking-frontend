import React from "react"
import { useState, useContext } from "react"
import { Button } from "react-bootstrap"
import { UserContext } from "../../../../contexts/UsersContext"
import { useForm } from "react-hook-form";
import withUserGuard from "../../../../guards/user.guard";
import { ConfirmationModal, PasswordMismatchModal } from "../../../ui/Modals/ChangePasswordModals";
import { useTranslation } from 'react-i18next'
import { Redirect } from "react-router-dom";

interface PasswordData {
  oldPassword: String
  newPassword: String
  repeatNewPassword?: String
}

function ChangePassword() {
  const { register, handleSubmit, errors } = useForm();  
  const [show, setShow] = useState(false);
  const [passwordData, setPasswordData] = useState<PasswordData>();
  const [showPasswordMismatch, setShowPasswordMismatch] = useState(false);
  const [repeatedPasswordError, setRepeatedPassword] =useState(false)
  const {CuStudent} = useContext(UserContext)
  const {t} = useTranslation()
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

  const postDataToBackend = (data: PasswordData) => {
    console.log(data)
    setShow(false)
  }
    
  return (
    <div className="mx-auto col-md-6">
      {CuStudent.account_type === "CuStudent" ? <Redirect to="/account" /> : null}
      <div className="default-mobile-wrapper">
        <div className="row mt-2">
          <div className="col-8">
            <h4 className="align-right">
              {t("change_password")}
            </h4>
          </div>
        </div>
        <label className="form-label mt-2">{t("old_password")}</label>
        <input name="oldPassword" type="password" ref={register({
          required: "Enter your old password.",
        })} placeholder="Old Password" className="form-control"/>
        {errors.oldPassword && <p id="input-error">{errors.oldPassword.message}</p>}
        <hr/>
        <label className="form-label mt-2">{t("new_password")}</label>
        <input name="newPassword" type="password" ref={register({
          required: "Enter your new password.",
        })} placeholder="New Password" className="form-control"/>
        {errors.newPassword && <p id="input-error">{errors.newPassword.message}</p>}
        
        <label className="form-label mt-2">{t("repeat_new_password")}</label>
        <input name="repeatNewPassword" type="password" ref={register({
          required: "Enter your new password.",
        })} placeholder="Repeat New Password" className="form-control"/>
        {errors.repeatNewPassword && <p id="input-error">{errors.repeatNewPassword.message}</p>}
        {repeatedPasswordError ? (<p className="input-error mt-2">New password cannot be the same as the old password.</p>):(null)}
        <hr/>
        <div className="button-group mt-4">
          <Button variant="pink" className="btn-secondary" onClick={handleSubmit(onSubmit)}>
          {t("save_and_submit")}
        </Button>
        </div>
        
      </div>
      <br />
      {/* Confirmation Dialog */}
      <ConfirmationModal show={show} setShow={setShow} postDataToBackend={postDataToBackend} passwordData={passwordData}/>
      {/* Password mismatch error modal */}
      <PasswordMismatchModal show={showPasswordMismatch} setShowPasswordMismatch={setShowPasswordMismatch} />
      
    </div>
  )
}

export default withUserGuard(ChangePassword)