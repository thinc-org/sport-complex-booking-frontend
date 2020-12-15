import React from "react"
import { useState} from "react"
import { useForm } from "react-hook-form";
import {  Button } from "react-bootstrap"
import axios from "axios"
import { UserContext } from "../../../../contexts/UsersContext"

export default function ChulaAccountEdit({  toggle_edit_button}) {
  let [is_thai_language] = useState(false)

  // React Hook Forms
  const { register, handleSubmit, errors } = useForm();

  return (
    <UserContext.Consumer>
      {(context) => {
        const { CuStudent } = context
        const user = CuStudent

        const onSubmit = (data: any) => {
          postDataToBackend(data)
        };

        const handleCancel = (e: any) => {
          e.preventDefault()
          window.location.reload(false)
        }

        const showWarningMessage = (firstLogin: Boolean) => {
          if (firstLogin) {
            return (
              <div className="alert alert-danger mt-3" role="alert">
                <h3>{is_thai_language ? "คำเตือน" : "Warning"}</h3>
                <h6>{is_thai_language ? "กรุณาส่งข้อมูลการสมัคร" : "Please submit the registration form."}</h6>
              </div>
            )
          } else {
            return <div></div>
          }
        }

        const postDataToBackend = async (data: any) => {
          console.log("send data to backend")
          data = {
            ...data,
            is_thai_language: user.is_thai_language,
          }
          console.log("data is" + JSON.parse(JSON.stringify(data)))
          await axios
            .put("http://localhost:3000/account_info/", data, {
              headers: {
                Authorization: "bearer " + user.jwt,
              },
            })
            .then(({ data }) => {
              console.log("SENT", data)
              window.location.reload(false)
            })
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
              </div>
              <div className="row">
                <h6 className="mx-3">Chulalongkorn University Student</h6>
              </div>
              <hr className="mx-1" />
              <form onSubmit={handleSubmit(onSubmit)}>

                  <label className="form-label mt-2">Mobile</label>
                  <input name="phone" type="text" ref={register({
                    required: "Enter your phone number",
                    pattern: {
                      value: /^[A-Z0-9._%+-]/i,
                      message: "Enter a valid phone number",
                    },
                  })} placeholder="0xxxxxxxxx" defaultValue={user.phone} className="form-control"/>
                  {errors.mobile && <p id="input-error">{errors.mobile.message}</p>}

                  <label className="form-label mt-2">Personal Email</label>
                  <input name="personal_email" ref={register(
                    {
                      required: "Enter your e-mail",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Enter a valid e-mail address",
                      },
                    }
                  )} placeholder="example@email.com" defaultValue={user.personal_email} className="form-control"/>

                  {errors.personal_email && <p id="input-error">{errors.personal_email.message}</p>}

                <br />
                <div className="row">
                  <div className="button-group col-md-12">
                    <Button variant="gray" className="btn-secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                  <div className="button-group col-md-12">
                    <Button variant="pink" className="btn-secondary" data-toggle="modal" data-target="#confirmModal">
                      {is_thai_language ? "บันทึกและส่ง" : "Save and Submit"}
                    </Button>
                  </div>
                </div>

                {/* MODAL CONFIRM DIALOGUE */}
                <div className="modal fade" id="confirmModal" role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="confirmModalLabel">
                          {is_thai_language ? "ยืนยันการส่งใบสมัคร" : "Confirm submit"}
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        {is_thai_language ? "คุณต้องการส่งใบสมัครหรือไม่" : "Do you want to submit the registration form?"}
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">
                          {is_thai_language ? "ยกเลิก" : "Cancel"}
                        </button>
                        <Button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#confirmModal">
                          {is_thai_language ? "บันทึกและส่ง" : "Save and Submit"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <br />
          </div>
        )
      }}
    </UserContext.Consumer>
  )
}
