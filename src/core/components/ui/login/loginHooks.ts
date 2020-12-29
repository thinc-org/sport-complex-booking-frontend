import { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useAuthContext } from '../../../controllers/authContext'
import { setCookie } from '../../../contexts/cookieHandler'
import { setIsFirstLogin } from '../../../../constant'
import { getIsFirstlogin } from '../../../../constant'
import { client } from '../../../../axiosConfig'
import Axios, { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'

interface UserResponse {
    token: string,
    is_first_login: boolean
    is_thai_language: boolean
    jwt: string
}
export const useLogin = (setError) => {
    const { setToken } = useAuthContext()
    const history = useHistory()
    const { url, path } = useRouteMatch()
    const [isLoading, setLoading] = useState(false)
    const { i18n, t } = useTranslation()
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }
    const onLogin = async (data) => {
        setLoading(true)
        await client.post<UserResponse>(`/users/login`, {
            username: data.username,
            password: data.password
        })
            .then((res: AxiosResponse<UserResponse>) => {
                setLoading(false)
                setCookie('is_thai_language', res.data.is_thai_language, 5)
                setCookie('token', res.data.token, 1)
                setCookie('token', res.data.jwt, 1)
                setToken(res.data.token)
                setIsFirstLogin(false)
                console.log(res)
                if (res.data.is_first_login) history.push(`${path}/personal`)
                else history.push('/account')
                if (res.data.is_thai_language) changeLanguage('th')
                else changeLanguage('e')
                window.location.reload()
            })
            .catch((err) => {
                setLoading(false)
                setError('invalid', {
                    type: 'async',
                    message: t("invalidInput")
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
                    if (res.data.is_thai_language) changeLanguage('th')
                    else changeLanguage('e')
                })
                .catch((err) => {
                    setLoading(false)
                    setError('invalid', {
                        type: 'async',
                        message: t('badResponse')
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



