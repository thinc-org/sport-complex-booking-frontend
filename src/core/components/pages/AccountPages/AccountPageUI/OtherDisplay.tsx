import React, { useContext } from "react"
import { UserContext } from "../../../../contexts/UsersContext"
import { Link } from "react-router-dom"
import { WarningMessage } from "../../../ui/Modals/AccountPageModals"
import { useTranslation } from "react-i18next"
import { AccountProps } from "../../../../dto/account.dto"
import Button from "react-bootstrap/esm/Button"

export default function OtherAaccountDisplay({ toggleEditButton }: AccountProps) {
  const { otherAccount: user } = useContext(UserContext)
  const { t } = useTranslation()

  return (
    <div className="mx-auto col-md-6">
      {user && <WarningMessage show={user.verification_status !== ""} verification_status={user.verification_status} account={user.account_type} />}
      <div className="default-mobile-wrapper mt-3 animated-card">
        <div className="">
          {/* START OF THE FORM */}
          <div className="row">
            <div className="col-8">
              <h4>{t("memberInformation")}</h4>
            </div>
            <div className="col-4">
              <Button className="btn-secondary btn-sm float-right" onClick={toggleEditButton}>
                {t("edit")}
              </Button>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label className="form-label mt-2">{t("prefix")}</label>
              <p>{user?.prefix}</p>
            </div>
            <div className="col-md-6">
              <label className="form-label mt-2">{t("gender")}</label>
              <p>{user?.gender}</p>
            </div>
          </div>
          <hr />
          <label className="form-label mt-2">{t("name_th")}</label>
          <p>{user?.name_th}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">{t("surname_th")}</label>
          <p>{user?.surname_th}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">{t("name_en")}</label>
          <p>{user?.name_en}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">{t("surname_en")}</label>
          <p>{user?.surname_en}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">{t("birthday")}</label>
          <div className="row">
            <div className="col-sm-4">
              <p>{user?.birthday?.toString().substring(0, 10)}</p>
              <div className="valid-feedback"></div>
            </div>
          </div>

          <label className="form-label mt-2">{t("national_id")}</label>
          <p>{user?.national_id}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">{t("marital_status")}</label>
          <p>{user?.marital_status}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">{t("address")}</label>
          <p>{user?.address}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">{t("email")}</label>
          <p>{user?.personal_email}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">{t("home_phone")}</label>
          <p>{user?.home_phone}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">{t("mobile_phone")}</label>
          <p>{user?.phone}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">{t("medical_condition")}</label>
          <p>{user?.medical_condition}</p>
          <div className="valid-feedback"></div>
        </div>
      </div>
      <br />
      <div className="default-mobile-wrapper">
        <h4>{t("emergency_contact")}</h4>

        <label className="form-label mt-2">{t("contact_person_prefix")}</label>
        <p>{user?.contact_person.contact_person_prefix}</p>
        <hr />

        <label className="form-label mt-2">{t("contact_person_name")}</label>
        <p>{user?.contact_person.contact_person_name}</p>
        <div className="valid-feedback"></div>
        <hr />
        <label className="form-label mt-2">{t("contact_person_surname")}</label>
        <p>{user?.contact_person.contact_person_surname}</p>
        <div className="valid-feedback"></div>
        <hr />
        <label className="form-label mt-2">{t("contact_person_home_phone")}</label>
        <p>{user?.contact_person.contact_person_home_phone}</p>
        <div className="valid-feedback"></div>
        <hr />
        <label className="form-label mt-2">{t("contact_person_phone")}</label>
        <p>{user?.contact_person.contact_person_phone}</p>
        <div className="valid-feedback"></div>
      </div>
      <br />
      <div className="default-mobile-wrapper">
        <h4>{t("memberDocuments")}</h4>
        <label className="form-label my-2">{t("user_photo")}</label>
        <div className="form-file">
          {user?.user_photo ? (
            <div>
              <a type="button" className="btn-normal btn-secondary" href={"openFile/" + user.user_photo} target="_blank" rel="noopener noreferrer">
                {t("viewFile")}
              </a>
            </div>
          ) : (
            <p>{t("noFile")}</p>
          )}
        </div>
        <hr />
        <label className="form-label my-2">{t("national_id_photo")}</label>
        <div className="form-file">
          {user?.national_id_photo ? (
            <a className="btn-normal btn-secondary" href={"openFile/" + user.national_id_photo} target="_blank" rel="noopener noreferrer">
              {t("viewFile")}
            </a>
          ) : (
            <p>{t("noFile")}</p>
          )}
        </div>
        <hr />
        <label className="form-label my-2">{t("medical_certificate")}</label>
        <div className="form-file">
          {user?.medical_certificate ? (
            <a className="btn-normal btn-secondary" href={"openFile/" + user.medical_certificate} target="_blank" rel="noopener noreferrer">
              {t("viewFile")}
            </a>
          ) : (
            <p>{t("noFile")}</p>
          )}
        </div>
        <hr />
        <label className="form-label my-2">{t("house_registration_number")}</label>
        <div className="form-file">
          {user?.house_registration_number ? (
            <a className="btn-normal btn-secondary" href={"openFile/" + user.house_registration_number} target="_blank" rel="noopener noreferrer">
              {t("viewFile")}
            </a>
          ) : (
            <p>{t("noFile")}</p>
          )}
        </div>
        <hr />
        <label className="form-label my-2">{t("relationship_verification_document")}</label>
        <div className="form-file">
          {user?.relationship_verification_document ? (
            <a
              className="btn-normal btn-secondary"
              href={"openFile/" + user.relationship_verification_document}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("viewFile")}
            </a>
          ) : (
            <p>{t("noFile")}</p>
          )}
        </div>
      </div>
      {/* END OF FORM */}
      <div className="button-group col-md-12 mt-4">
        <Link to={"/changePassword"}>
          <button className="btn-normal btn-outline-black">{t("changePassword")}</button>
        </Link>
      </div>
      <br />
      <br />
    </div>
  )
}
