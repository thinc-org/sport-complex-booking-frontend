import { useAuthContext } from "../../../controllers/authContext"
function useSidebarData() {
  const { role } = useAuthContext()
  const data = [
    {
      icon: "",
      name: "โปรไฟล์",
      path: "/staff/profile",
    },
    {
      icon: "",
      name: "จัดการสตาฟ",
      path: "/staff/management",
    },
    {
      icon: "",
      name: "ผู้ใช้ทั้งหมด",
      path: "/staff/listOfAllUsers",
    },
    {
      icon: "",
      name: "การจองทั้งหมด",
      path: "/staff/allReservation/success",
    },
    {
      icon: "",
      name: "ห้องรอการจองทั้งหมด",
      path: "/staff/allReservation/waiting",
    },
    {
      icon: "",
      name: "การล็อคคอร์ด",
      path: "/staff/disableCourt",
    },
    {
      icon: "",
      name: "QR Code",
      path: "/staff/qrcodescanner",
    },
    {
      icon: "",
      name: "การตั้งค่า",
      path: "/staff/settings",
    },
  ]
  if (role === "Admin") return data
  else
    return data.filter((link) => {
      const name = link.name
      if (
        name === "การตั้งค่า" ||
        name === "การล็อคคอร์ด" ||
        name === "จัดการสตาฟ" ||
        name === "รับรองการลงทะเบียน" ||
        name === "รับรองนักเรียนสาธิต"
      )
        return false
      else return true
    })
}

export default useSidebarData
