import React, { FunctionComponent, useState, useEffect, useCallback } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Button, Card, Form, Collapse, Row, Col } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
import { SatitCuPersonel } from "../../../../contexts/UsersContext"
import { handlePDF } from "../list-of-all-users-pages/OtherViewInfoComponent"
import { renderLoading } from "../list-of-all-users-pages/ListOfAllUsers"
import {
  ConfirmRejectModal,
  UncomRejectModal,
  CompleteRejectModal,
  ConfirmAcceptModal,
  UncomAcceptModal,
  CompleteAcceptModal,
  ErrorModal,
} from "./VerifyModalsComopnent"
import { format, isValid } from "date-fns"
import { VerifyComponentSatitInfo, RejectInfoSatit, ModalVerify, RejectInfoSatitLabel, RejectInfoSatitLabelKey } from "../interfaces/InfoInterface"

/// start of main function ///
const VerifyInfoSatit: FunctionComponent = () => {
  // page state //
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showReject, setShowReject] = useState<boolean>(false)
  const [accountExpiredDate, setAccountExpiredDate] = useState<Date>()
  const [showModalInfo, setShowModalInfo] = useState<ModalVerify>("none")
  const [rejectInfo, setRejectInfo] = useState<RejectInfoSatit>({
    name_th: false,
    surname_th: false,
    name_en: false,
    surname_en: false,
    student_card_photo: false,
  })

  // Non CU state //
  const { _id } = useParams<{ _id: string }>()
  const [username, setUsername] = useState<string>("")
  const [info, setInfo] = useState<VerifyComponentSatitInfo>({
    name_th: "",
    surname_th: "",
    name_en: "",
    surname_en: "",
    username: "",
    personal_email: "",
    phone: "",
    student_card_photo: "",
  })

  const history = useHistory()
  const methods = useForm()
  const { register, handleSubmit } = methods

  const fetchUserData = useCallback(() => {
    client
      .get<SatitCuPersonel>(`/satit-approval/${_id}`)
      .then(({ data }) => {
        setUsername(data.username)
        setInfo({
          name_th: data.name_th,
          surname_th: data.surname_th,
          name_en: data.name_en,
          surname_en: data.surname_en,
          personal_email: data.personal_email,
          phone: data.phone,
          username: data.username,
          // Files //
          student_card_photo: data.student_card_photo,
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

  const confirmReject = () => {
    // check if at least one condition is checked
    let checked = false
    Object.entries(rejectInfo).forEach(([key, val], index) => {
      if (val) checked = true
    })
    if (!checked) setShowModalInfo("showUncomReject")
    else setShowModalInfo("showConfirmReject")
  }

  const requestReject = () => {
    const rejectList: string[] = []
    Object.entries(rejectInfo).forEach(([key, val], index) => {
      if (val) rejectList.push(key)
    })
    client({
      method: "PATCH",
      url: "/satit-approval/reject",
      data: {
        id: _id,
        reject_info: rejectList,
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
    const date = accountExpiredDate
    if (!date) return null
    // utc+0: 17.00, utc+7: 0.00
    const utc7Time = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 1, 17, 0, 0, 0))
    client({
      method: "PATCH",
      url: "/satit-approval/approve",
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

  // handles //
  const onSubmit = (data: { accountExpiredDate: string }) => {
    if (!data.accountExpiredDate || new Date(data.accountExpiredDate) < new Date()) setShowModalInfo("showUncomAccept")
    else {
      setAccountExpiredDate(new Date(data.accountExpiredDate))
      setShowModalInfo("showConfirmAccept")
    }
  }

  // renders //
  const renderForm = () => {
    return (
      <>
        <Row>
          <Col className="py-3">
            <p>ชื่อ (อังกฤษ)</p>
            <p className="font-weight-bold mb-0">{info.name_en}</p>
          </Col>
          <Col className="py-3">
            <p>นามสกุล (อังกฤษ)</p>
            <p className="font-weight-bold mb-0">{info.surname_en}</p>
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p>ชื่อ (ไทย)</p>
            <p className="font-weight-bold mb-0">{info.name_th}</p>
          </Col>
          <Col className="py-3">
            <p>นามสกุล (ไทย)</p>
            <p className="font-weight-bold mb-0">{info.surname_th}</p>
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <p>ชื่อผู้ใช้</p>
            <p className="font-weight-bold mb-0">{info.username}</p>
          </Col>
          <Col>
            <p>รูปภาพบัตรนักเรียน</p>
            <p className="link" id={(info as SatitCuPersonel).student_card_photo} onClick={handlePDF}>
              ดูเอกสาร
            </p>
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <p>อีเมลส่วนตัว</p>
            <p className="font-weight-bold mb-0">{info.personal_email}</p>
          </Col>
          <Col>
            <p>เบอร์โทร</p>
            <p className="font-weight-bold mb-0">{info.phone}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="mt-2">วันหมดอายุสมาชิก</label>
            <Form.Control
              ref={register}
              name="accountExpiredDate"
              type="date"
              style={{ width: "fit-content" }}
              max={"9999-12-31"}
              defaultValue={isValid(accountExpiredDate) ? format(new Date(accountExpiredDate!), "yyyy-MM-dd") : ""}
            />
          </Col>
        </Row>
        <div className="mt-5 text-center">
          <Button
            variant="danger"
            className="btn-normal btn-outline-red px-5 mr-5"
            onClick={() => {
              setShowReject(!showReject)
            }}
          >
            ปฏิเสธ
          </Button>
          <Button variant="success" className="btn-normal btn-outline-green px-5 ml-5" type="submit">
            ยอมรับ
          </Button>
        </div>
      </>
    )
  }

  const renderRejectionInfo = () => {
    const infoList = Object.keys(rejectInfo).map((name, index) => {
      return (
        <Form.Check
          key={index}
          label={RejectInfoSatitLabel[name as RejectInfoSatitLabelKey]}
          id={name}
          type="checkbox"
          defaultChecked={rejectInfo[name as keyof RejectInfoSatit]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement
            setRejectInfo({
              ...rejectInfo,
              [target.id]: e.target.checked,
            })
          }}
        />
      )
    })
    return (
      <Collapse in={showReject} className="mt-3 mx-5">
        <div className="rejection-info">
          <Card body className="p-2">
            <h5 className="form-label pb-2">เลือกข้อมูลที่ถูกปฏิเสธ</h5>
            <Form.Group>{infoList}</Form.Group>
            <Button variant="pink" className="btn-normal float-right" onClick={confirmReject}>
              ยืนยันการปฏิเสธ
            </Button>
          </Card>
        </div>
      </Collapse>
    )
  }

  const renderModal = () => {
    return (
      <div>
        <ConfirmRejectModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ requestReject }} />
        <ConfirmAcceptModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ requestAccept }} />
        <UncomAcceptModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} />
        <UncomRejectModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} />
        <ErrorModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} />
        <CompleteAcceptModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ username, accountType: `Satit` }} />
        <CompleteRejectModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ username, accountType: `Satit` }} />
      </div>
    )
  }

  return (
    <>
      <div className="VerifyInfo mt-4" style={{ display: isLoading ? "none" : "block" }}>
        {renderModal()}
        {/* Info start here */}
        <Link to="/staff/verifyApproveSatit">
          <Button variant="pink" className="btn-normal mb-3 px-5">
            กลับ
          </Button>
        </Link>
        <Card body className="mb-5 mr-4">
          <Form onSubmit={handleSubmit(onSubmit)}>
            {renderForm()}
            {renderRejectionInfo()}
          </Form>
        </Card>
      </div>
      {renderLoading(isLoading)}
    </>
  )
}

export default VerifyInfoSatit
