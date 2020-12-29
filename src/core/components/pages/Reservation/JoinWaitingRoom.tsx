import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import {Link, useHistory } from "react-router-dom"
import withUserGuard from "../../../guards/user.guard"
import { useTranslation } from 'react-i18next'
import { client } from "../../../../axiosConfig"
import { WrongAccessCode } from "../../ui/Modals/WaitingRoomModals"

function JoinWaitingRoom() {
  const { register, handleSubmit, errors } = useForm()
  const {t} = useTranslation()
  const history = useHistory()
  const [showWrongAccessCodeModal, setShowWrongAccessCodeModal] = useState(false)

  const onSubmit = async (data: any) => {
    console.log(data)
    await client.post('/reservation/joinwaitingroom', data)
      .then(() => {
        history.push('/waitingroom')
      })
      .catch(() => {
        setShowWrongAccessCodeModal(true)
      })
  }

  return (
    <div className="wrapper">
      <div className="mx-auto col-md-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="d-flex justify-content-center font-weight-bold  mt-3">{t("joinWaitingRoom")}</h4>
          <div className="default-mobile-wrapper mt-4">
            <span className="row mt-3">
              <h6 className="mx-3 mt-1 font-weight-bold">{t("waitingRoomPassword")}</h6>
            </span>
            <p className="font-weight-light">{t("waitingRoomHelp")}</p>
            <div className="mt-2">
              <input
                name="access_code"
                type="text"
                ref={register({
                  required: t("enterCode")!,
                  pattern: {
                    value: /^[A-Z0-9._%+-]/i,
                    message: t("enterCode")!,
                  },
                })}
                placeholder="xxxxxx"
                className="form-control"
              />
              {errors.accessCode && <p id="input-error">{errors.accessCode.message}</p>}
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
              {t("joinWaitingRoom")}
            </Button>
          </div>
        </form>
      </div>
      {/* Wrong Access Code Modal */}
      <WrongAccessCode show={showWrongAccessCodeModal} setShowWrongAccessCodeModal={setShowWrongAccessCodeModal} />
    </div>
  )
}

export default withUserGuard(JoinWaitingRoom)