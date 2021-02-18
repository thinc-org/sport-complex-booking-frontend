import * as yup from "yup"

const englishRegex = /^[A-Za-z0-9]+$/
const thaiRegex = /^[\u0E00-\u0E7F0-9' ]+$/

export const addSportSchema = yup.object().shape({
  sport_name_th: yup.string().required("กรุณากรอกข้อมูล").matches(thaiRegex, "กรุณาระบุชื่อภาษาไทย"),

  sport_name_en: yup.string().required("กรุณากรอกข้อมูล").matches(englishRegex, "กรุณาระบุชื่อภาษาอังกฤษ"),
  quota: yup.string().required("กรุณากรอกข้อมูล"),
  required_user: yup.string().required("กรุณากรอกข้อมูล"),
})
