import React, { FunctionComponent, useState, useEffect, useCallback } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { Button, Card, Form } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
import { Other } from "../../../../contexts/UsersContext"
import { handlePDF } from "../list-of-all-users-pages/OtherViewInfoComponent"
import {
  ConfirmRejectModal,
  CompleteRejectModal,
  ConfirmAcceptModal,
  UncomAcceptModal,
  CompleteAcceptModal,
  ErrorModal,
} from "./VerifyModalsComopnent"
import format from "date-fns/format"
import { VerifyExtendInfo, ModalVerify } from "../interfaces/InfoInterface"
import { renderLoading } from "../list-of-all-users-pages/ListOfAllUsers"

/// start of main function ///
const VerifyExtend: FunctionComponent = () => {
  // page state //
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showModalInfo, setShowModalInfo] = useState<ModalVerify>("none")

  // Non CU state //
  const [accountExpiredDate, setAccountExpiredDate] = useState<Date>()
  const [info, setInfo] = useState<VerifyExtendInfo>({
    username: "",
    name_th: "",
    surname_th: "",
    membership_type: "",
    payment_slip: "",
    account_expiration_date: new Date(),
  })
  // router state //
  const history = useHistory()
  const { _id } = useParams<{ _id: string }>()

  // useCallback //
  const fetchUserData = useCallback(() => {
    client
      .get<Other>(`/approval/${_id}`)
      .then(({ data }) => {
        setInfo({
          username: data.username,
          name_th: data.name_th,
          surname_th: data.surname_th,
          membership_type: data.membership_type,
          payment_slip: data.payment_slip,
          account_expiration_date: new Date(data.account_expiration_date),
        })
        setIsLoading(false)
      })
      .catch(({ response }) => {
        if (response && response.data.statusCode === 401) history.push("/staff")
      })
  }, [_id, history])

  // useEffects //
  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  // handles //
  const handleAccept = () => {
    if (accountExpiredDate) setShowModalInfo("showConfirmAccept")
    else setShowModalInfo("showUncomAccept")
  }

  const handleChangeExpire = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const date = new Date(target.value)
    const current_date = new Date()
    // date must not be past
    if (date < current_date) setAccountExpiredDate(current_date)
    else setAccountExpiredDate(date)
  }

  // requests //
  const requestReject = () => {
    //console.log("rejected")
    client({
      method: "PATCH",
      url: "/approval/extension/reject",
      data: {
        id: _id,
      },
    })
      .then(() => {
        setShowModalInfo("showCompleteReject")
      })
      .catch((err) => {
        setShowModalInfo("showErr")
      })
  }

  const requestAccept = () => {
    //console.log("accepted")
    const date = accountExpiredDate
    if (!date) return null
    // utc+0: 17.00, utc+7: 0.00
    const utc7Time = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 1, 17, 0, 0, 0))
    client({
      method: "PATCH",
      url: "/approval/extension/approve",
      data: {
        id: _id,
        newExpiredDate: utc7Time,
      },
    })
      .then(() => {
        setShowModalInfo("showCompleteAccept")
      })
      .catch((err) => {
        setShowModalInfo("showErr")
      })
  }

  // renders //
  const renderModal = (
    <div>
      <ConfirmRejectModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ requestReject }} />
      <ConfirmAcceptModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ requestAccept }} />
      <UncomAcceptModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} />
      <ErrorModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} />
      <CompleteAcceptModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ username: info.username }} />
      <CompleteRejectModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ username: info.username }} />
    </div>
  )

  const renderContent = (
    <div className="topSection px-4 pt-2">
      <div className="row">
        <div className="col">
          <label className="mt-2">ประเภท</label>
          <p className="font-weight-bold">{info.membership_type}</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label className="mt-2">ชื่อ</label>
          <p className="font-weight-bold">{info.name_th}</p>
        </div>
        <div className="col">
          <label className="mt-2">นามสกุล</label>
          <p className="font-weight-bold">{info.surname_th}</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label className="mt-2">หลักฐานการชำระเงิน</label>
          <div className="form-file">
            <p className={info.payment_slip ? "link" : "text-muted"} id={info.payment_slip} onClick={handlePDF}>
              ดูเอกสาร
            </p>
          </div>
        </div>
        <div className="col">
          <label className="mt-2">วันหมดอายุเดิม</label>
          <p className="font-weight-bold">{format(info.account_expiration_date, "HH:mm yyyy-MM-dd")}</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label className="mt-2">วันหมดอายุสมาชิก</label>
          <Form.Control
            type="date"
            style={{ width: "40%" }}
            value={accountExpiredDate ? format(new Date(accountExpiredDate), "yyyy-MM-dd") : ""}
            onChange={handleChangeExpire}
          />
        </div>
      </div>
      <div className="mt-5 text-center">
        <Button
          variant="danger"
          className="btn-normal btn-outline-red px-5 mr-5"
          onClick={() => {
            setShowModalInfo("showConfirmReject")
          }}
        >
          ปฏิเสธ
        </Button>
        <Button variant="success" className="btn-normal btn-outline-green px-5 ml-5" onClick={handleAccept}>
          ยอมรับ
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <div className="VerifyExtend mt-4" style={{ display: isLoading ? "none" : "block" }}>
        {renderModal}
        {/* Info start here */}
        <Link to="/staff/verifyApprove">
          <Button variant="pink" className="btn-normal mb-3 px-5">
            กลับ
          </Button>
        </Link>
        <Card body className="mb-5 mr-4">
          {renderContent}
        </Card>
      </div>
      {renderLoading(isLoading)}
    </>
  )
}

export default VerifyExtend
