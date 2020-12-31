import Axios, { AxiosResponse } from 'axios';
import { setCookie } from '../../../contexts/cookieHandler'
import { useAuthContext } from '../../../controllers/authContext'
import { useHistory } from 'react-router-dom'
import { client } from '../../../../axiosConfig'

interface StaffResponse {
    jwt: string,
    message: string,
    statusCode: string
}
export const useStaffLogin = (setError) => {
    const { setToken } = useAuthContext()
    let history = useHistory()
    const onLogin = async (data) => {
        await client.post<StaffResponse>(`/staffs/login`, { 'username': data.username, 'password': data.password })
            .then((res: AxiosResponse<StaffResponse>) => {
                setCookie('token', res.data.jwt, 1)
                setToken(res.data.jwt)
                history.push('/staff/profile')
            })
            .catch((err) => {
                setError('invalid', { type: 'async', message: 'Username หรือ Password ไม่ถูกต้อง' })
            })
    }
    return { onLogin }
}