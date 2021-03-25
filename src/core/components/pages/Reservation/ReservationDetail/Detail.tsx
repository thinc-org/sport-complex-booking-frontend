import React from "react"
import { useTranslation } from "react-i18next"

import { timeConversion } from "../timeFormating"
import { useLanguage, useNameLanguage } from "../../../../utils/language"
import { DetailProps } from "./PropsInterface"

const Detail: React.FC<DetailProps> = ({ sport, courtNum, date, timeList, memberList }) => {
  const { t } = useTranslation()
  const language = useLanguage()
  const nameLanguage: "name_en" | "name_th" = useNameLanguage("name") as "name_en" | "name_th"
  const sportLanguage: "sport_name_th" | "sport_name_en" = language === "th" ? "sport_name_th" : "sport_name_en"

  return (
    <div className="box-container mb-4" style={{ width: "100%" }}>
      <div>
        <h4 className="mb-2"> {sport?.[sportLanguage]} </h4>
        <h6 className="mb-0 font-weight-light">
          {t("court")}: {courtNum}
        </h6>
        <h6 className="mb-0 font-weight-light">
          {t("bookingDate")}: {date}{" "}
        </h6>
        <h6 className="mb-0 font-weight-light">
          {t("bookingTime")}: {timeList && timeConversion(timeList)}{" "}
        </h6>
      </div>
      <hr />
      <div>
        <h6 className="mb-2"> {t("members")} </h6>
        {memberList?.map((eachMember, index) => {
          return (
            <h6 className="mb-0" style={{ fontWeight: 300 }} key={index}>
              {index + 1}. {eachMember[nameLanguage]}
            </h6>
          )
        })}
      </div>
    </div>
  )
}

export default Detail
