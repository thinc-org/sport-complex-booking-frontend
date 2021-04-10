import React, { FunctionComponent, useState, useEffect, useCallback } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
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
import { format, isValid } from "date-fns"
import { VerifyExtendInfoOther, ModalVerify } from "../interfaces/InfoInterface"
import { renderLoading } from "../list-of-all-users-pages/ListOfAllUsers"

/// start of main function ///
const VerifyExtend: FunctionComponent = () => {
  // page state //
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showModalInfo, setShowModalInfo] = useState<ModalVerify>("none")

  // Non CU state //
  const [accountExpiredDate, setAccountExpiredDate] = useState<Date>()
  const [info, setInfo] = useState<VerifyExtendInfoOther>({
    username: "",
    name_th: "",
    surname_th: "",
    name_en: "",
    surname_en: "",
    membership_type: "",
    payment_slip: "",
    account_expiration_date: new Date(),
  })
  // router state //
  const history = useHistory()
  const { _id } = useParams<{ _id: string }>()
  const methods = useForm()
  const { register, handleSubmit } = methods

  // useCallback //
  const fetchUserData = useCallback(() => {
    client
      .get<Other>(`/approval/${_id}`)
      .then(({ data }) => {
        setInfo({
          username: data.username,
          name_th: data.name_th,
          surname_th: data.surname_th,
          name_en: data.name_en,
          surname_en: data.surname_en,
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
  const onSubmit = (data: { accountExpiredDate: string }) => {
    if (!data.accountExpiredDate || new Date(data.accountExpiredDate) < new Date()) setShowModalInfo("showUncomAccept")
    else {
      setAccountExpiredDate(new Date(data.accountExpiredDate))
      setShowModalInfo("showConfirmAccept")
    }
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
      .catch(() => {
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
      .catch(() => {
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
      <CompleteAcceptModal
        showModalInfo={showModalInfo}
        setShowModalInfo={setShowModalInfo}
        info={{ username: info.username, accountType: `Other` }}
      />
      <CompleteRejectModal
        showModalInfo={showModalInfo}
        setShowModalInfo={setShowModalInfo}
        info={{ username: info.username, accountType: `Other` }}
      />
    </div>
  )

  const renderContent = (
    <Form className="topSection px-4 pt-2" onSubmit={handleSubmit(onSubmit)}>
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
          <label className="mt-2">ชื่อ (ภาษาอังกฤษ)</label>
          <p className="font-weight-bold">{info.name_en}</p>
        </div>
        <div className="col">
          <label className="mt-2">นามสกุล (ภาษาอังกฤษ)</label>
          <p className="font-weight-bold">{info.surname_en}</p>
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
            ref={register}
            name="accountExpiredDate"
            type="date"
            style={{ width: "fit-content" }}
            max={"9999-12-31"}
            defaultValue={isValid(accountExpiredDate) ? format(new Date(accountExpiredDate!), "yyyy-MM-dd") : ""}
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
        <Button variant="success" className="btn-normal btn-outline-green px-5 ml-5" type="submit">
          ยอมรับ
        </Button>
      </div>
    </Form>
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
