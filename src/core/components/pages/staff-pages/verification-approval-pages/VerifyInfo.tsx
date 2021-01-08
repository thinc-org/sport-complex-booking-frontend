import React, { FunctionComponent, useState, useEffect, useCallback } from "react"
import { RouteComponentProps, Link, useHistory } from "react-router-dom"
import { Button, Card, Form, Collapse } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
import OtherViewInfoComponent from "../list-of-all-users-pages/OtherViewInfoComponent"
import {
  ConfirmRejectModal,
  UncomRejectModal,
  CompleteRejectModal,
  ConfirmAcceptModal,
  UncomAcceptModal,
  CompleteAcceptModal,
  ErrorModal,
} from "./VerifyModalsComopnent"
import format from "date-fns/format"
import Info, { RejectInfo, ModalVerify, RejectInfoLabel, RejectInfoLabelKey } from "../interfaces/InfoInterface"

/// start of main function ///
const VerifyInfo: FunctionComponent<RouteComponentProps<{ _id: string }>> = (props) => {
  // page state //
  const [showReject, setShowReject] = useState<boolean>(false)
  const [accountExpiredDate, setAccountExpiredDate] = useState<Date>()
  const [showModalInfo, setShowModalInfo] = useState<ModalVerify>({
    showConfirmAccept: false,
    showUncomAccept: false,
    showCompleteAccept: false,
    showConfirmReject: false,
    showUncomReject: false,
    showCompleteReject: false,
    showErr: false,
  })
  const [rejectInfo, setRejectInfo] = useState<RejectInfo>({
    prefix: false,
    gender: false,
    name_th: false,
    surname_th: false,
    name_en: false,
    surname_en: false,
    birthday: false,
    national_id: false,
    marital_status: false,
    address: false,
    personal_email: false,
    home_phone: false,
    phone: false,
    medical_condition: false,
    contact_person_prefix: false,
    contact_person_name: false,
    contact_person_surname: false,
    contact_person_home_phone: false,
    contact_person_phone: false,
    user_photo: false,
    medical_certificate: false,
    national_id_photo: false,
    house_registration_number: false,
    relationship_verification_document: false,
  })

  // Non CU state //
  const [_id] = useState<string>(props.match.params._id)
  const [username, setUsername] = useState<string>("")
  const [membershipType, setMembershipType] = useState<string>("")
  const [info, setInfo] = useState<Info>({
    prefix: "",
    name_th: "",
    surname_th: "",
    name_en: "",
    surname_en: "",
    gender: "",
    birthday: new Date(),
    national_id: "",
    marital_status: "",
    address: "",
    email: "",
    phone: "",
    home_phone: "",
    medical_condition: "",
    contact_person: {
      contact_person_prefix: "",
      contact_person_name: "",
      contact_person_surname: "",
      contact_person_home_phone: "",
      contact_person_phone: "",
    },
    membership_type: membershipType,
    // object id //
    user_photo: "",
    medical_certificate: "",
    national_id_photo: "",
    house_registration_number: "",
    relationship_verification_document: "",
  })

  const history = useHistory()

  const fetchUserData = useCallback(() => {
    client({
      method: "GET",
      url: "/approval/" + _id,
    })
      .then(({ data }) => {
        setUsername(data.username)
        setMembershipType(data.membershipType)
        setInfo({
          prefix: data.prefix,
          name_th: data.name_th,
          surname_th: data.surname_th,
          name_en: data.name_en,
          surname_en: data.surname_en,
          gender: data.gender,
          birthday: new Date(data.birthday),
          national_id: data.national_id,
          marital_status: data.marital_status,
          address: data.address,
          email: data.personal_email,
          phone: data.phone,
          home_phone: data.home_phone,
          medical_condition: data.medical_condition,
          contact_person: data.contact_person
            ? data.contact_person
            : {
                contact_person_prefix: "",
                contact_person_name: "",
                contact_person_surname: "",
                contact_person_home_phone: "",
                contact_person_phone: "",
              },
          // Files //
          membership_type: data.membershipType,
          user_photo: data.user_photo,
          medical_certificate: data.medical_certificate,
          national_id_photo: data.national_id_photo,
          house_registration_number: data.house_registration_number,
          relationship_verification_document: data.relationship_verification_document,
        })
      })
      .catch(({ response }) => {
        console.log(response)
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
    if (!checked) setShowModalInfo({ ...showModalInfo, showUncomReject: true })
    else setShowModalInfo({ ...showModalInfo, showConfirmReject: true })
  }

  const requestReject = () => {
    // console.log("request rejected!!!")
    const rejectList: string[] = []
    Object.entries(rejectInfo).forEach(([key, val], index) => {
      rejectList.push(key)
    })
    // send request //
    client({
      method: "PATCH",
      url: "/approval/reject",
      data: {
        id: _id,
        reject_info: rejectList,
      },
    })
      .then((res) => {
        setShowModalInfo({ ...showModalInfo, showConfirmReject: false, showCompleteReject: true })
      })
      .catch((err) => {
        console.log(err)
        setShowModalInfo({ ...showModalInfo, showConfirmReject: false, showErr: true })
      })
  }

  const requestAccept = () => {
    const date = accountExpiredDate
    // utc+0: 17.00, utc+7: 0.00
    const utc7Time = new Date(Date.UTC(date!.getFullYear(), date!.getMonth(), date!.getDate() - 1, 17, 0, 0, 0))
    // send request //
    client({
      method: "PATCH",
      url: "/approval/approve",
      data: {
        id: _id,
        newExpiredDate: utc7Time,
      },
    })
      .then(({ data }) => {
        setShowModalInfo({ ...showModalInfo, showConfirmAccept: false, showCompleteAccept: true })
      })
      .catch((err) => {
        console.log(err)
        setShowModalInfo({ ...showModalInfo, showConfirmAccept: false, showErr: true })
      })
  }

  // handles //
  const handleChangeExpire = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const date = target.value
    if (new Date(date) < new Date()) setAccountExpiredDate(new Date())
    else setAccountExpiredDate(new Date(date))
  }

  const handleAccept = () => {
    if (accountExpiredDate && !isNaN(accountExpiredDate.getDate())) {
      setShowModalInfo({ ...showModalInfo, showConfirmAccept: true })
    } else setShowModalInfo({ ...showModalInfo, showUncomAccept: true })
  }

  // renders //
  const renderTopSection = () => {
    return (
      <div className="topSection px-4 pt-2">
        <div className="row">
          <div className="col">
            <label className="mt-2">ประเภท</label>
            <p className="font-weight-bold">{membershipType}</p>
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
            <label className="mt-2">ชื่อผู้ใช้</label>
            {<p className="font-weight-bold">{username}</p>}
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
      </div>
    )
  }

  const renderViewForm = () => {
    return (
      <div>
        <OtherViewInfoComponent info={info} />
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
          <Button variant="success" className="btn-normal btn-outline-green px-5 ml-5" onClick={handleAccept}>
            ยอมรับ
          </Button>
        </div>
      </div>
    )
  }

  const renderRejectionInfo = () => {
    const infoList = Object.keys(rejectInfo).map((name, index) => {
      return (
        <Form.Check
          key={index}
          label={RejectInfoLabel[name as RejectInfoLabelKey]}
          id={name}
          type="checkbox"
          defaultChecked={rejectInfo[name as keyof RejectInfo]}
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
        <CompleteAcceptModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ username }} />
        <CompleteRejectModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ username }} />
      </div>
    )
  }

  return (
    <div className="VerifyInfo mt-4">
      {renderModal()}
      {/* Info start here */}
      <Link to="/staff/verifyApprove">
        <Button variant="pink" className="btn-normal mb-3 px-5">
          กลับ
        </Button>
      </Link>
      <Card body className="mb-5 mr-4">
        {renderTopSection()}
        {renderViewForm()}
        {renderRejectionInfo()}
      </Card>
    </div>
  )
}

export default VerifyInfo
