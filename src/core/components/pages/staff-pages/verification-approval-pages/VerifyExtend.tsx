import React, { FunctionComponent, useState, useEffect, useCallback } from "react"
import { RouteComponentProps, Link, useHistory } from "react-router-dom"
import { Button, Card, Form } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
// import { Other } from "../../../../contexts/UsersContext"
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

/// start of main function ///
const VerifyExtend: FunctionComponent<RouteComponentProps<{ _id: string }>> = (props) => {
  // page state //
  const [showModalInfo, setShowModalInfo] = useState<ModalVerify>({
    showConfirmAccept: false,
    showUncomAccept: false,
    showCompleteAccept: false,
    showConfirmReject: false,
    showUncomReject: false,
    showCompleteReject: false,
    showErr: false,
  })

  // Non CU state //
  const [_id] = useState<string>(props.match.params._id)
  const [accountExpiredDate, setAccountExpiredDate] = useState<Date>()
  const [info, setInfo] = useState<VerifyExtendInfo>({
    name_th: "",
    surname_th: "",
    account_type: "",
    membership_type: "",
    payment_evidence: "",
  })

  const history = useHistory()

  // const fetchUserData = useCallback(() => {
  //   client
  //     .get<any>(`/approval/${_id}`)
  //     .then(({ data }) => {
  //     })
  //     .catch(({ response }) => {
  //       if (response && response.data.statusCode === 401) history.push("/staff")
  //     })
  // }, [_id, history])

  // useEffects //
  // useEffect(() => {
  //   fetchUserData()
  // }, [fetchUserData])

  // handles //
  const handleAccept = () => {
    if (accountExpiredDate) setShowModalInfo({ ...showModalInfo, showConfirmAccept: true })
    else setShowModalInfo({ ...showModalInfo, showUncomAccept: true })
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
    console.log("rejected")
    // client({
    //   method: "PATCH",
    //   url: "/approval/reject",
    //   data: {
    //     id: _id,
    //     reject_info: ,
    //   },
    // })
    //   .then(() => {
    //     setShowModalInfo({ ...showModalInfo, showConfirmReject: false, showCompleteReject: true })
    //   })
    //   .catch((err) => {
    //     setShowModalInfo({ ...showModalInfo, showConfirmReject: false, showErr: true })
    //   })
  }

  const requestAccept = () => {
    console.log("accepted")
    // client({
    //   method: "PATCH",
    //   url: "/approval/approve",
    //   data: {
    //     id: _id,
    //     newExpiredDate: utc7Time,
    //   },
    // })
    //   .then(() => {
    //     setShowModalInfo({ ...showModalInfo, showConfirmAccept: false, showCompleteAccept: true })
    //   })
    //   .catch((err) => {
    //     setShowModalInfo({ ...showModalInfo, showConfirmAccept: false, showErr: true })
    //   })
  }

  // renders //
  const renderModal = (
    <div>
      <ConfirmRejectModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ requestReject }} />
      <ConfirmAcceptModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ requestAccept }} />
      <UncomAcceptModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} />
      <ErrorModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} />
      {/* FIXXXXXXXX */}
      <CompleteAcceptModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ username: info.name_th }} />
      <CompleteRejectModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ username: info.name_th }} />
    </div>
  )

  const renderContent = (
    <div className="topSection px-4 pt-2">
      <div className="row">
        <div className="col">
          <label className="mt-2">ประเภท</label>
          {/* <p className="font-weight-bold">{info.membershipType}</p> */}
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
            <p className={info.payment_evidence ? "link" : "text-muted"} id={info.payment_evidence} onClick={handlePDF}>
              ดูเอกสาร
            </p>
          </div>
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
            setShowModalInfo({ ...showModalInfo, showConfirmReject: true })
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
    <div className="VerifyExtend mt-4">
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
  )
}

export default VerifyExtend
