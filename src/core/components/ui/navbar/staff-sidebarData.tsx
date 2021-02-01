function useSidebarData(type: string) {
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
  // This removes StaffManagement, DisableCourt, and Settings pages from Staff acccount's sidebar
  if (type === "admin") return data
  else return data.filter((link) => link !== data[1] && link !== data[6] && link !== data[8])
}

export default useSidebarData
