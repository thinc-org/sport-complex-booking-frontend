import React from "react"
import { Button } from "react-bootstrap"
import { UserContext } from "../../../../contexts/UsersContext"
import {Link } from "react-router-dom"

export default function SatitAndCUPersonelAccountDisplay({  toggle_edit_button }) {  

  return (
    <UserContext.Consumer>
      {(context) => {
        const { SatitCuPersonel } = context
        const user = SatitCuPersonel

        const showWarningMessage = (firstLogin: boolean) => {
          if (firstLogin) {
            return (
              <div className="alert alert-danger  mt-3" role="alert">
                <h3>{context.is_thai_language ? "คำเตือน" : "Warning"}</h3>
                <h6>{context.is_thai_language ? "กรุณาส่งข้อมูลการสมัคร" : "Please submit the registration form."}</h6>
              </div>
            )
          } else {
            return <div></div>
          }
        }

        return (
          <div className="mx-auto col-md-6">
            {showWarningMessage(user.is_first_login)}
            <div className="default-mobile-wrapper">
              <div className="row mt-2">
                <div className="col-8">
                  <h4 className="align-right">
                    {user.name_en} {user.surname_en}
                  </h4>
                </div>
                <div className="col-4">
                  <Button className="btn-secondary float-right" onClick={toggle_edit_button}>
                    Edit
                  </Button>
                </div>
              </div>
              <div className="row">
                <h6 className="mx-3 mt-3">{context.is_thai_language? "นักเรียนโรงเรียนสาธิตจุฬา และ บุคลากรจุฬา" : "Satit Chula and CU Personel"}</h6>
              </div>
              <hr className="mx-1" />
              <div className="">
                <label className="form-label mt-2">{context.is_thai_language ? "เบอร์โทรศัพท์" : "Mobile"}</label>
                <p>{user.phone}</p>
                <div className="valid-feedback"></div>
                <hr />
                <label className="form-label mt-2">{context.is_thai_language ? "อีเมลส่วนตัว" : "Personal Email"}</label>
                <p>{user.personal_email}</p>
                <div className="valid-feedback"></div>
              </div>
            </div>
            
            <div className="button-group col-md-12 mt-4">
              <Link to={"/changePassword"}>
              <button className="btn-normal btn-outline-black">
                {context.is_thai_language ? "เปลี่ยนรหัสผ่าน" : "Change Password"}
              </button>
            </Link>
            </div>
            
            <br />
          </div>
        )
      }}
    </UserContext.Consumer>
  )
}
