import { AxiosResponse } from "axios"
import { setCookie } from "../../../contexts/cookieHandler"
import { useAuthContext } from "../../../controllers/authContext"
import { useHistory } from "react-router-dom"
import { client } from "../../../../axiosConfig"
import { ErrorOption } from "react-hook-form"

interface StaffResponse {
  jwt: string
  message: string
  statusCode: string
}

export interface LoginDTO {
  username: string
  password: string
}

export const useStaffLogin = (setError: (name: string, error: ErrorOption) => void) => {
  const { setToken } = useAuthContext()
  const history = useHistory()
  const onLogin = async (data: LoginDTO) => {
    client
      .post<StaffResponse>(`/staffs/login`, data)
      .then((res: AxiosResponse<StaffResponse>) => {
        setCookie("token", res.data.jwt, 1)
        setToken(res.data.jwt)
        history.push("/staff/profile")
      })
      .catch(() => {
        setError("invalidInput", { type: "async", message: "Username หรือ Password ไม่ถูกต้อง" })
      })
  }
  return { onLogin }
}
