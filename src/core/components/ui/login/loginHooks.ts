import { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useAuthContext } from '../../../controllers/authContext'
import { setCookie } from '../../../contexts/cookieHandler'
import { setIsFirstLogin } from '../../../../constant'
import { getIsFirstlogin } from '../../../../constant'
import { client } from '../../../../axiosConfig'
import Axios, { AxiosResponse } from 'axios'
interface UserResponse {
    token: string,
    is_first_login: boolean
    is_thai_language: boolean
}
export const useLogin = (setError) => {
    const { setToken } = useAuthContext()
    const history = useHistory()
    const { url, path } = useRouteMatch()
    const [isLoading, setLoading] = useState(false)
    const onLogin = async (data) => {
        setLoading(true)
        await client.post<UserResponse>(`/users/login`, {
            username: data.username,
            password: data.password
        })
            .then((res: AxiosResponse<UserResponse>) => {
                setLoading(false)
                setCookie('token', res.data.token, 1)
                setToken(res.data.token)
                setIsFirstLogin(false)
                if (res.data.is_first_login) history.push(`${path}/personal`)
                else history.push('/account')
            })
            .catch((err) => {
                setLoading(false)
                setError('invalid', {
                    type: 'async',
                    message: 'Invalid Username or Password'
                })
            })
    }
    useEffect(() => {
        if (history.location.search) {
            const params = history.location.search
            const ticket = params.slice(params.indexOf('=') + 1)
            setLoading(true)
            client.post<UserResponse>(`/users/validation`, {
                'appticket': ticket
            }
            )
                .then((res: AxiosResponse<UserResponse>) => {
                    setLoading(false)
                    setCookie('token', res.data.token, 1)
                    setToken(res.data.token)
                    const first_time_login = res.data.is_first_login
                    setIsFirstLogin(first_time_login)
                    if (res.data.is_first_login) history.push(`${path}/personal`)
                    else history.push('/account')
                })
                .catch((err) => {
                    setLoading(false)
                    setError('invalid', {
                        type: 'async',
                        message: 'Something bad happened, please try again'
                    })
                })
        }
    }, [])

    return { isLoading, onLogin }
}

export const usePreventUserFromSignIn = () => {
    const history = useHistory()
    const { isUser } = useAuthContext()
    useEffect(() => {
        if (isUser) history.push('/account')
    }, [])
}
export const usePersonalInfo = () => {
    const { token } = useAuthContext()
    const history = useHistory()
    const onSubmit = (data) => {
        client.put(`/users/validation`, {
            is_thai_language: data.is_thai_language,
            personal_email: data.personal_email,
            phone: data.phone
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setIsFirstLogin(false)
                history.push('/account')

            })
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        if (!getIsFirstlogin()) {
            history.push('/account')
        }
    }, [])
    return { onSubmit }
}



