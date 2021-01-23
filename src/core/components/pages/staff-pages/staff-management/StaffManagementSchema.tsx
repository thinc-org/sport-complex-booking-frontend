import * as yup from "yup"

export const passwordSchema = yup.object().shape({
  name: yup.string().required("กรุณากรอกข้อมูล"),
  surname: yup.string().required("กรุณากรอกข้อมูล"),
  username: yup.string().required("กรุณากรอกข้อมูล"),
  password: yup.string().required("กรุณากรอกข้อมูล"),
  recheckpassword: yup
    .string()
    .required("กรุณากรอกข้อมูล")
    .oneOf([yup.ref("password"), null], "รหัสผ่านไม่ตรงกัน กรุณากรอกใหม่"),
})
