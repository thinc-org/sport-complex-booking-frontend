export interface StaffResponse {
  allStaff_length: number
  staff_list: AdminAndStaff[]
}

export interface AdminAndStaff {
  _id: string // MAJOR CHANGE
  name: string
  surname: string
  username: string
  password?: string
  recheckpasssword?: string | undefined
  is_admin: boolean | string
}

export interface DeleteStaffModalProps {
  show: boolean
  setShow: (value: boolean) => void
  mainFunction: (value: AdminAndStaff) => void
  data: AdminAndStaff
}

export interface EditStaffModalProps {
  show: boolean
  setShow: (value: boolean) => void
}

export interface AddStaffModalProps {
  show: boolean
  setShow: (value: boolean) => void
  onSubmitAddStaff: (staff: AdminAndStaff) => void
}

export interface HandleErrorModalProps {
  show: boolean
  setShow: (value: boolean) => void
}
