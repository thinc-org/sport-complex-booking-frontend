import React from "react"
import { useState, useContext } from "react"
import { Button } from "react-bootstrap"
import { UserContext } from "../../../../contexts/UsersContext"
import { useForm } from "react-hook-form";
import withUserGuard from "../../../../guards/user.guard";
import { ConfirmationModal, PasswordMismatchModal } from "../../../ui/Modals/ChangePasswordModals";
import { useTranslation } from 'react-i18next'

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
  const {is_thai_language} = useContext(UserContext)
  const {t} = useTranslation()
  const onSubmit = (data: PasswordData) => {
    if (data.oldPassword !== data.newPassword ) {
      if (data.newPassword !== data.repeatNewPassword!) {
        setShowPasswordMismatch(true);
      } else {
        delete data.repeatNewPassword
        setPasswordData({...data})
        setShow(true)
      } 
    }      
  };

  const postDataToBackend = (data: PasswordData) => {
    console.log(data)
    setShow(false)
  }
    
  return (
    <div className="mx-auto col-md-6">
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
        <hr/>
        <div className="button-group mt-4">
          <Button variant="pink" className="btn-secondary" onClick={handleSubmit(onSubmit)}>
          {is_thai_language ? "บันทึกและส่ง" : "Save and Submit"}
        </Button>
        </div>
        
      </div>
      <br />
      {/* Confirmation Dialog */}
      <ConfirmationModal show={show} is_thai_language={is_thai_language} setShow={setShow} postDataToBackend={postDataToBackend} passwordData={passwordData}/>
      {/* Password mismatch error modal */}
      <PasswordMismatchModal show={showPasswordMismatch} is_thai_language={is_thai_language} setShowPasswordMismatch={setShowPasswordMismatch} />
    </div>
  )
}

export default withUserGuard(ChangePassword)