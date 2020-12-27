import React from "react"
import { Button } from "react-bootstrap"
import { useState} from "react"
import { useForm } from "react-hook-form"
import {Link } from "react-router-dom"
import { getCookie } from '../../../contexts/cookieHandler'
import withUserGuard from "../../../guards/user.guard"
import { useTranslation } from 'react-i18next'

function JoinWaitingRoom() {
  const { register, handleSubmit, errors } = useForm()
  const {t} = useTranslation()

  const onSubmit = (data: any) => {
    console.log(JSON.parse(JSON.stringify(data)))
  }

  return (
    <div className="wrapper">
      <div className="mx-auto col-md-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="d-flex justify-content-center font-weight-bold  mt-3">{t("join_waiting_room")}</h4>
          <div className="default-mobile-wrapper mt-4">
            <span className="row mt-3">
              <h6 className="mx-3 mt-1 font-weight-bold">{t("waiting_room_password")}</h6>
            </span>
            <p className="font-weight-light">{t("waiting_room_help")}</p>
            <div className="mt-2">
              <input
                name="access_code"
                type="text"
                ref={register({
                  required: t("enter_code")!,
                  pattern: {
                    value: /^[A-Z0-9._%+-]/i,
                    message: t("enter_code")!,
                  },
                })}
                placeholder="xxxxxx"
                className="form-control"
              />
              {errors.access_code && <p id="input-error">{errors.access_code.message}</p>}
            </div>
          </div>
          <br />
          <div className="button-group my-2">
            <Link to={"/reservenow"}>
              <Button className="btn-secondary">
                {t("cancel")}
              </Button>
            </Link>
            <Button variant="pink" type="submit">
              {t("join_waiting_room")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withUserGuard(JoinWaitingRoom)