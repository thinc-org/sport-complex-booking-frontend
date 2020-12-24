import React from "react"
import { useState, useEffect } from "react"
import { Button, Modal } from "react-bootstrap"
import { UserContext } from "../../../../contexts/UsersContext"
import { useForm } from "react-hook-form";
import withUserGuard from "../../../../guards/user.guard";

function ChangePassword({ toggle_edit_button }) {
  const { register, handleSubmit, errors } = useForm();  
  const [show, setShow] = useState(false);
  const [samePassword, setSamePassword] = useState(false);
  const [passwordData, setPasswordData] = useState<Object>({});
  const [showPasswordMismatch, setShowPasswordMismatch] = useState(false);

  return (
    <UserContext.Consumer>
      {(context) => {
        const user = context

        const onSubmit = (data) => {
          if (data.oldPassword === data.newPassword ) {
            setSamePassword(true)
          } else {
            if (data.newPassword !== data.repeatNewPassword) {
              setShowPasswordMismatch(true);
            } else {
              delete data.repeatNewPassword
              setPasswordData(data)
              setShow(true)
            } 
          }
                  
        };

        const postDataToBackend = (data: Object) => {
          console.log(data)
          setShow(false)
        }
         

        return (
          <div className="mx-auto col-md-6">
            <div className="default-mobile-wrapper">
              <div className="row mt-2">
                <div className="col-8">
                  <h4 className="align-right">
                    {user.is_thai_language ? "เปลี่ยนรหัส" : "Change Password"}
                  </h4>
                </div>
              </div>
              <label className="form-label mt-2">{user.is_thai_language ? "รหัสผ่านเก่า" : "Old Password"}</label>
              <input name="oldPassword" type="password" ref={register({
                required: "Enter your old password.",
              })} placeholder="Old Password" className="form-control"/>
              {errors.oldPassword && <p id="input-error">{errors.oldPassword.message}</p>}
              <hr/>
              <label className="form-label mt-2">{user.is_thai_language ? "รหัสผ่านใหม่" : "New Password"}</label>
              <input name="newPassword" type="password" ref={register({
                required: "Enter your new password.",
              })} placeholder="New Password" className="form-control"/>
              {errors.newPassword && <p id="input-error">{errors.newPassword.message}</p>}
              
              <label className="form-label mt-2">{user.is_thai_language ? "กรอกรหัสผ่านใหม่อีกครั้ง" : "Repeat New Password"}</label>
              <input name="repeatNewPassword" type="password" ref={register({
                required: "Enter your new password.",
              })} placeholder="Repeat New Password" className="form-control"/>
              {errors.repeatNewPassword && <p id="input-error">{errors.repeatNewPassword.message}</p>}
              <hr/>
              <div className="button-group mt-4">
                <Button variant="pink" className="btn-secondary" onClick={handleSubmit(onSubmit)}>
                {user.is_thai_language ? "บันทึกและส่ง" : "Save and Submit"}
              </Button>
              </div>
              
            </div>
            <br />
            {/* Confirmation Dialog */}
            <Modal
              show={show}
              onHide={() => {
                setShow(false)
              }}
              backdrop="static"
              keyboard={false}
              className="modal"  
            >
              <Modal.Header closeButton>
                <Modal.Title>{user.is_thai_language ? "ยืนยัน" : "Confirmation"}</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ fontWeight: "lighter" }}> {user.is_thai_language ? "ต้องการยืนยันหารเปลี่ยนรหัสหรือไม่" : "Do you want to confirm password change?"} </Modal.Body>
              <Modal.Footer>
                <Button className="btn-normal btn-secondary" onClick={() => {setShow(false)}}>
                  {user.is_thai_language? "ยกเลิก" : "Cancel"}
                </Button>
                <Button variant="pink" className="btn-normal" onClick={()=> postDataToBackend(passwordData)}>
                  {user.is_thai_language? "ส่ง" : "Submit"}
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Password mismatch error modal */}
            <Modal
              className="modal"
              show={showPasswordMismatch}
              onHide={() => {
                setShowPasswordMismatch(false)
              }}
              backdrop="static"
              keyboard={false}
 
            >
              <Modal.Header closeButton>
                <Modal.Title>{user.is_thai_language ? "รหัสผ่านไม่ตรงกัน" : "Passwords do not match"}</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ fontWeight: "lighter" }}> {user.is_thai_language ? "กรุณากรอกรหัสผ่านใหม่" : "Please enter your new password again"} </Modal.Body>
              <Modal.Footer>
                <Button variant="pink" className="btn-normal btn-secondary" onClick={() => {setShowPasswordMismatch(false)}}>
                  {user.is_thai_language? "โอเค" : "Okay"}
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Password mismatch error modal */}
            <Modal
              className="modal"
              show={samePassword}
              onHide={() => {
                setSamePassword(false)
              }}
              backdrop="static"
              keyboard={false}

            >
              <Modal.Header closeButton>
                <Modal.Title>{user.is_thai_language ? "คำเตือน" : "Warning"}</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ fontWeight: "lighter" }}> {user.is_thai_language ? "ไม่สามารถตั้งรหัสผ่านเก่าซ้ำได้" : "Your new password cannot be the same as the old password"} </Modal.Body>
              <Modal.Footer>
                <Button variant="pink" className="btn-normal btn-secondary" onClick={() => {setSamePassword(false)}}>
                  {user.is_thai_language? "โอเค" : "Okay"}
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )
      }}
    </UserContext.Consumer>
  )
}

export default withUserGuard(ChangePassword)