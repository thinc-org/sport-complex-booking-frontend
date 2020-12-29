import React from "react"
import { useState, useContext } from "react"
import { Button } from "react-bootstrap"
import { UserContext } from "../../../../contexts/UsersContext"
import { useForm } from "react-hook-form";
import withUserGuard from "../../../../guards/user.guard";
import { ConfirmationModal, PasswordMismatchModal, PasswordData, PasswordChangeSuccess } from "../../../ui/Modals/ChangePasswordModals";
import { useTranslation } from 'react-i18next'
import { Redirect, useHistory } from "react-router-dom";
import { client } from "../../../../../axiosConfig";


function ChangePassword() {
  const { register, handleSubmit, errors } = useForm();  
  const [show, setShow] = useState(false);
  const [passwordData, setPasswordData] = useState<PasswordData>();
  const [showPasswordMismatch, setShowPasswordMismatch] = useState(false);
  const [repeatedPasswordError, setRepeatedPassword] =useState(false)
  const {cuStudentAccount} = useContext(UserContext)
  const [showChangeSuccess, setShowChangeSuccess] = useState(false)
  const {t} = useTranslation()
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
    console.log(data)
    await client.post('/account_info/change_password', data)
      .then((res) => {
          console.log(res)
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
      <div className="default-mobile-wrapper">
        <div className="row mt-2">
          <div className="col-8">
            <h4 className="align-right">
              {t("changePassword")}
            </h4>
          </div>
        </div>
        <label className="form-label mt-2">{t("oldPassword")}</label>
        <input name="oldPassword" type="password" ref={register({
          required: "Enter your old password.",
        })} placeholder="Old Password" className="form-control"/>
        {errors.oldPassword && <p id="input-error">{errors.oldPassword.message}</p>}
        <hr/>
        <label className="form-label mt-2">{t("newPassword")}</label>
        <input name="newPassword" type="password" ref={register({
          required: "Enter your new password.",
        })} placeholder="New Password" className="form-control"/>
        {errors.newPassword && <p id="input-error">{errors.newPassword.message}</p>}
        
        <label className="form-label mt-2">{t("repeatNewPassword")}</label>
        <input name="repeatNewPassword" type="password" ref={register({
          required: "Enter your new password.",
        })} placeholder="Repeat New Password" className="form-control"/>
        {errors.repeatNewPassword && <p id="input-error">{errors.repeatNewPassword.message}</p>}
        {repeatedPasswordError ? (<p className="input-error mt-2">New password cannot be the same as the old password.</p>):(null)}
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
    </div>
  )
}

export default withUserGuard(ChangePassword)