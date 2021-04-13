import React, { useState, useEffect, useCallback } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { Button, Card, Form } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
import { Other } from "../../../../contexts/UsersContext"
import OtherViewInfoComponent from "./OtherViewInfoComponent"
import OtherEditInfoComponent from "./OtherEditInfoComponent"
import PasswordChangeModal from "./PasswordChangeModal"
import {
  DeleteModal,
  CompleteDeleteModal,
  SaveModal,
  CompleteSaveModal,
  ErrModal,
  UncomExpireDateModal,
  PasswordErrModal,
  ConfirmChangePasswordModal,
} from "./ListOfAllUserModals"
import { OtherComponentInfo, ModalUserInfo } from "../interfaces/InfoInterface"
import { renderLoading } from "./ListOfAllUsers"
import { format, isValid } from "date-fns"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { editInfoSchema } from "../../../../schemas/editUserInfo"

const UserInfo = () => {
  // page state //
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isEdit, setEdit] = useState<boolean>(false)
  const [uploadComplete, setUploadComplete] = useState<boolean>(true)
  const [uploaded, setUploaded] = useState<boolean>(false)
  const [newPassword, setNewPassword] = useState<string>("")
  const [showModalInfo, setShowModalInfo] = useState<ModalUserInfo>("none")

  // Non CU state //
  const [fileList, setFileList] = useState<(File | undefined)[]>()
  const [username, setUsername] = useState<string>("")
  const [membershipType, setMembershipType] = useState<string>("")
  const [isPenalize, setPenalize] = useState<boolean>(false)
  const [expiredPenalizeDate, setExpiredPenalizeDate] = useState<Date | null>(null)
  const [accountExpiredDate, setAccountExpiredDate] = useState<Date | null>(null)
  const [info, setInfo] = useState<OtherComponentInfo>({
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
    national_id_house_registration: "",
    relationship_verification_document: "",
    previous_payment_slips: [],
  })
  // temp data
  const [tempIsPenalize, setTempPenalize] = useState<boolean>(false)
  const [tempExpiredPenalizeDate, setTempExpiredPenalizeDate] = useState<Date | null>(null)
  const [tempAccountExpiredDate, setTempAccountExpiredDate] = useState<Date | null>(null)
  const [tempInfo, setTempInfo] = useState<OtherComponentInfo>(info)

  // react router dom
  const { _id } = useParams<{ _id: string }>()
  const methods = useForm({ resolver: yupResolver(editInfoSchema) })
  const { register } = methods
  const history = useHistory()

  // requests //
  const fetchUserData = useCallback(async () => {
    await client
      .get<Other>(`/list-all-user/id/${_id}`)
      .then(({ data }) => {
        setUsername(data.username)
        setMembershipType(data.membership_type)
        setPenalize(data.is_penalize)
        setExpiredPenalizeDate(
          data.expired_penalize_date === null || new Date(data.expired_penalize_date) < new Date() ? null : new Date(data.expired_penalize_date)
        )
        setAccountExpiredDate(
          data.account_expiration_date === null || new Date(data.account_expiration_date) < new Date() ? null : new Date(data.account_expiration_date)
        )
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
          membership_type: data.membership_type,
          // Files(Object id) //
          user_photo: data.user_photo,
          medical_certificate: data.medical_certificate,
          national_id_house_registration: data.national_id_house_registration,
          relationship_verification_document: data.relationship_verification_document,
          previous_payment_slips: data.previous_payment_slips,
        })
        setIsLoading(false)
      })
      .catch(({ response }) => {
        if (response && response.data.statusCode === 401) history.push("/staff")
      })
  }, [_id, history])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  useEffect(() => {
    if (uploaded) {
      const {
        email,
        phone,
        prefix,
        name_th,
        surname_th,
        name_en,
        surname_en,
        birthday,
        national_id,
        gender,
        marital_status,
        address,
        home_phone,
        contact_person,
        medical_condition,
      } = tempInfo
      client
        .put<Other>(`/list-all-user/other/${_id}`, {
          personal_email: email,
          phone,
          is_thai_language: true,
          prefix,
          name_th,
          surname_th,
          name_en,
          surname_en,
          birthday,
          national_id,
          gender,
          marital_status,
          address,
          home_phone,
          contact_person,
          medical_condition,
          // top section //
          account_expiration_date: tempAccountExpiredDate,
          is_penalize: tempIsPenalize,
          expired_penalize_date: tempExpiredPenalizeDate,
        })
        .then(({ data }) => {
          // set temp to data
          setPenalize(tempIsPenalize)
          setExpiredPenalizeDate(tempExpiredPenalizeDate!)
          setAccountExpiredDate(tempAccountExpiredDate!)
          setInfo({
            ...tempInfo,
            user_photo: data.user_photo,
            medical_certificate: data.medical_certificate,
            national_id_house_registration: data.national_id_house_registration,
            relationship_verification_document: data.relationship_verification_document,
          })
          // show save complete modal
          setShowModalInfo("showComSave")
          // back to view form
          setEdit(false)
        })
        .catch(() => {
          setShowModalInfo("showErr")
        })
    }
  }, [uploaded, _id, tempAccountExpiredDate, tempExpiredPenalizeDate, tempInfo, tempIsPenalize])

  // handles //
  const handleEdit = () => {
    setTempInfo(info)
    setTempPenalize(isPenalize)
    setTempExpiredPenalizeDate(expiredPenalizeDate)
    setTempAccountExpiredDate(accountExpiredDate)
    setEdit(true)
    setUploaded(false)
    setUploadComplete(true)
  }

  const handleSave = (canSave: boolean, newPenExp: Date, newAccExp: Date, newFileList: (File | undefined)[]) => {
    if (canSave && (!tempIsPenalize || (newPenExp >= new Date() && newAccExp >= new Date()))) {
      setTempExpiredPenalizeDate(newPenExp ? newPenExp : null)
      setTempAccountExpiredDate(newAccExp ? newAccExp : null)
      setFileList(newFileList)
      setShowModalInfo("showSave")
    } else setShowModalInfo("showUncomExpire")
  }

  const handleUpload = async (typename: string, file: File) => {
    const formData = new FormData()
    const selectedFile = file
    // Update the formData object
    if (selectedFile) {
      formData.append(typename, selectedFile, selectedFile.name)
      // Request made to the backend api
      await client({
        method: "POST",
        url: `/fs/admin/upload/${_id}`,
        data: formData,
      })
        .then(({ data }) => {
          setTempInfo({
            ...tempInfo,
            [Object.keys(data)[0]]: data[Object.keys(data)[0]],
          })
        })
        .catch(({ response }) => {
          setUploadComplete(false)
          setShowModalInfo("showUploadErr")
          console.log(response)
        })
    }
  }

  const uploadAllFile = async () => {
    type fileType = "user_photo" | "medical_certificate" | "national_id_house_registration" | "relationship_verification_document" | "payment_slip"
    const fileMapping = {
      user_photo: 0,
      medical_certificate: 1,
      national_id_house_registration: 2,
      relationship_verification_document: 3,
      payment_slip: 4,
    }
    if (fileList) {
      for (const fileName of [
        "user_photo",
        "medical_certificate",
        "national_id_house_registration",
        "relationship_verification_document",
        "payment_slip",
      ]) {
        let file: File | undefined
        if (fileName in fileMapping) file = fileList[fileMapping[fileName as fileType]]
        if (file) await handleUpload(fileName, file)
      }
    }
    if (uploadComplete) setUploaded(true)
  }

  const requestSave = () => {
    uploadAllFile()
  }

  const requestChangePassword = () => {
    client({
      method: "PATCH",
      url: `/list-all-user/password/${_id}`,
      data: {
        password: newPassword,
      },
    })
      .then(() => {
        setShowModalInfo("none")
      })
      .catch(() => {
        setShowModalInfo("showErr")
      })
  }

  const requestDelete = () => {
    client({
      method: "DELETE",
      url: `/list-all-user/${_id}`,
    })
      .then(() => {
        setShowModalInfo("showComDelete")
      })
      .catch(() => {
        setShowModalInfo("showErr")
      })
  }

  // renders //
  const renderTopSection = () => {
    return (
      <div className="topSection px-4 pt-2">
        <Form>
          <div className="row">
            <div className="col">
              <label className="mt-2">ประเภทบัญชี</label>
              <p className="font-weight-bold">อื่นๆ</p>
            </div>
          </div>
          <div className="row pb-2">
            <div className="col">
              <label className="mt-2">ชื่อผู้ใช้</label>
              <p className="font-weight-bold">{username}</p>
            </div>
          </div>
          <div className="row pb-2">
            <div className="col">
              <label className="mt-2">ประเภทสมาชิก</label>
              <p className="font-weight-bold">{membershipType}</p>
            </div>
          </div>
          <div className="row pb-2">
            <div className="col">
              <label className="mt-2">สถานะการแบน</label>
              {isEdit ? (
                <Form.Control
                  className="border m-0"
                  style={{ backgroundColor: "white" }}
                  as="select"
                  defaultValue={isPenalize ? 1 : 0}
                  onChange={(e) => {
                    setTempPenalize(e.target.value !== "0" ? true : false)
                  }}
                >
                  <option value={0}>ปกติ</option>
                  <option value={1}>โดนแบน</option>
                </Form.Control>
              ) : (
                <p className="font-weight-bold">{isPenalize ? "โดนแบน" : "ปกติ"}</p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="mt-2">สิ้นสุดการแบน</label>
              <div className="row">
                <div className="col pr-0" style={{ width: "60%" }}>
                  <Form.Control
                    ref={register}
                    name="tempExpiredPenalizeDate"
                    type="date"
                    disabled={!isEdit || !tempIsPenalize}
                    max={"9999-12-31"}
                    style={{ width: "min-content" }}
                    defaultValue={
                      isEdit
                        ? isValid(tempExpiredPenalizeDate) && tempIsPenalize
                          ? format(new Date(tempExpiredPenalizeDate!), "yyyy-MM-dd")
                          : ""
                        : isValid(expiredPenalizeDate) && isPenalize
                        ? format(new Date(expiredPenalizeDate!), "yyyy-MM-dd")
                        : ""
                    }
                  />
                </div>
                <div className="col" style={{ width: "40%" }}>
                  <Form.Control
                    ref={register}
                    name="tempExpiredPenalizeTime"
                    type="time"
                    disabled={!isEdit || !tempIsPenalize}
                    style={{ width: "min-content" }}
                    defaultValue={
                      isEdit
                        ? isValid(tempExpiredPenalizeDate) && tempIsPenalize
                          ? format(new Date(tempExpiredPenalizeDate!), "HH:mm")
                          : ""
                        : isValid(expiredPenalizeDate) && isPenalize
                        ? format(new Date(expiredPenalizeDate!), "HH:mm")
                        : ""
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <label className="mt-2">วันหมดอายุสมาชิก</label>
              <div className="row">
                <div className="col pr-0" style={{ width: "60%" }}>
                  <Form.Control
                    ref={register}
                    name="tempAccountExpiredDate"
                    type="date"
                    disabled={!isEdit}
                    max={"9999-12-31"}
                    style={{ width: "min-content" }}
                    defaultValue={
                      isEdit
                        ? isValid(tempAccountExpiredDate)
                          ? format(new Date(tempAccountExpiredDate!), "yyyy-MM-dd")
                          : ""
                        : isValid(accountExpiredDate)
                        ? format(new Date(accountExpiredDate!), "yyyy-MM-dd")
                        : ""
                    }
                  />
                </div>
                <div className="col" style={{ width: "40%" }}>
                  <Form.Control
                    ref={register}
                    name="tempAccountExpiredTime"
                    type="time"
                    disabled={!isEdit}
                    style={{ width: "min-content" }}
                    defaultValue={
                      isEdit
                        ? isValid(tempAccountExpiredDate)
                          ? format(new Date(tempAccountExpiredDate!), "HH:mm")
                          : ""
                        : isValid(accountExpiredDate)
                        ? format(new Date(accountExpiredDate!), "HH:mm")
                        : ""
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    )
  }

  const renderViewForm = () => {
    return (
      <div>
        <OtherViewInfoComponent info={info} type={"OtherInfo"} />
        <div className="mt-5">
          <Link to="/staff/listOfAllUsers">
            <Button variant="outline-secondary" className="btn-normal btn-outline-pink">
              กลับ
            </Button>
          </Link>

          <Button variant="pink" className="float-right btn-normal" onClick={handleEdit}>
            แก้ไข
          </Button>
          <Button
            variant="outline-danger"
            className="float-right btn-normal btn-outline-red mr-3"
            onClick={() => {
              setShowModalInfo("showDelete")
            }}
          >
            ลบผู้ใช้
          </Button>
        </div>
      </div>
    )
  }

  const renderEditForm = () => {
    return (
      <div>
        <OtherEditInfoComponent tempInfo={tempInfo} setTempInfo={setTempInfo} handleSave={handleSave} />
        <div className="mt-5">
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              setShowModalInfo("showChangePassword")
            }}
          >
            เปลี่ยนรหัสผ่าน
          </Button>
          <Button
            variant="outline-danger"
            className="float-right btn-normal btn-outline-pink mr-3"
            onClick={() => {
              setEdit(false)
            }}
          >
            ยกเลิก
          </Button>
        </div>
      </div>
    )
  }

  const renderModals = () => {
    return (
      <div>
        <DeleteModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ requestDelete, username }} />
        <CompleteDeleteModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ username }} />
        <SaveModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ requestSave }} />
        <CompleteSaveModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} />
        <ErrModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} />
        <UncomExpireDateModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} />
        <PasswordErrModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} />
        <ConfirmChangePasswordModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ requestChangePassword }} />
        <PasswordChangeModal showModals={showModalInfo} setShowModals={setShowModalInfo} setNewPassword={setNewPassword} />
      </div>
    )
  }

  return (
    <>
      <FormProvider {...methods}>
        <div className="UserInfo mt-4" style={{ display: isLoading ? "none" : "block" }}>
          {renderModals()}
          {/* Info start here */}
          <Card body className="mb-5 mr-4">
            {renderTopSection()}
            {isEdit ? renderEditForm() : renderViewForm()}
          </Card>
        </div>
      </FormProvider>
      {renderLoading(isLoading)}
    </>
  )
}

export default UserInfo
