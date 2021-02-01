import { useAuthContext } from "../../../controllers/authContext"
function useSidebarData() {
  const { isAdmin } = useAuthContext()
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
      name: "รับรองการลงทะเบียน",
      path: "/staff/verifyApprove",
    },
    {
      icon: "",
      name: "การปิดคอร์ด",
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
  if (isAdmin) return data
  else
    return data.filter((link) => {
      const name = link.name
      if (name === "การตั้งค่า" || name === "การปิดคอร์ด" || name === "จัดการสตาฟ") return false
      else return true
    })
}

export default useSidebarData
