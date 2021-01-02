import React, { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import {Link, useHistory } from "react-router-dom"
import withUserGuard from "../../../guards/user.guard"
import { useTranslation } from 'react-i18next'
import { client } from "../../../../axiosConfig"
import { CustomModal } from "../../ui/Modals/WaitingRoomModals"
import { WaitingRoomAccessCode } from './ReservationInterfaces'

interface ValidityMessage {
  message: string
}


function JoinWaitingRoom() {
  const { register, handleSubmit, errors } = useForm()
  const {t} = useTranslation()
  const history = useHistory()
  const [showWrongAccessCodeModal, setShowWrongAccessCodeModal] = useState(false)

  const onSubmit = async (data: WaitingRoomAccessCode) => {
    await client.post<WaitingRoomAccessCode>('/reservation/joinwaitingroom', data)
      .then(({data}) => {
        if (data['isReservationCreated']) {
          history.push({pathname:'/hooray', state: { fromJoinWaitingRoom: true }})
        } else {
          history.push('/waitingroom')
        }
      })
      .catch(() => {setShowWrongAccessCodeModal(true)})
  }

  const fetchValidity = async () => {
    await client.post('/reservation/checkvalidity')
      .then(({data}) => {
          const resMsg = data['message']
          if (resMsg !== "Valid user") {
            const state = {msg: resMsg}
            history.push({pathname: '/banned',state})
          }
      })
      .catch(() => {
          const state = {msg: t("youArePenalized")}
          history.push({pathname: '/banned',state})
      })
  }

  useEffect(()=>{
    fetchValidity()
  },[])

  return (
    <div className="wrapper">
      <div className="mx-auto col-md-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="d-flex justify-content-center font-weight-bold  mt-3">{t("joinWaitingRoom")}</h4>
          <div className="default-mobile-wrapper mt-4 animated-card">
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
      <CustomModal type="wrongAccessCodeModal" show={showWrongAccessCodeModal} setShow={setShowWrongAccessCodeModal}  />
    </div>
  )
}

export default withUserGuard(JoinWaitingRoom)