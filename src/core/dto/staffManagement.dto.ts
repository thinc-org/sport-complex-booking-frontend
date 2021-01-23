import { NormalModalProps } from "./settings.dto"

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

export interface DeleteStaffModalProps extends NormalModalProps {
  mainFunction: (value: AdminAndStaff) => void
  data: AdminAndStaff
}

export interface AddStaffModalProps extends NormalModalProps {
  onSubmitAddStaff: (staff: AdminAndStaff) => void
}
