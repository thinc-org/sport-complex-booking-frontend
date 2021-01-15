import { useState, useEffect } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import { useAuthContext } from "../../../controllers/authContext"
import { setCookie } from "../../../contexts/cookieHandler"
import { setIsFirstLogin, getIsFirstlogin } from "../../../../constant"

import { client } from "../../../../axiosConfig"
import { AxiosResponse } from "axios"
import { useTranslation } from "react-i18next"
import { ErrorOption } from "react-hook-form"
import { LoginDTO } from "../../pages/staff-pages/staffHooks"
import { DefaultAccount } from "../../../contexts/UsersContext"

interface UserResponse {
  token: string
  is_first_login: boolean
  is_thai_language: boolean
  jwt: string
}

export const useLogin = (setError: (name: string, error: ErrorOption) => void) => {
  const { setToken } = useAuthContext()
  const history = useHistory()
  const { path } = useRouteMatch()
  const [isLoading, setLoading] = useState(false)
  const { i18n, t } = useTranslation()

  const onLogin = (data: LoginDTO) => {
    setLoading(true)
    console.log(data)
    client
      .post<UserResponse>(`/users/login`, {
        username: data.username,
        password: data.password,
      })
      .then((res: AxiosResponse<UserResponse>) => {
        setLoading(false)
        setCookie("is_thai_language", res.data.is_thai_language, 5)
        setCookie("token", res.data.token, 1)
        setCookie("token", res.data.jwt, 1)
        setToken(res.data.token)
        setIsFirstLogin(false)
        if (res.data.is_first_login) history.push(`${path}/personal`)
        else history.push("/home")
        if (res.data.is_thai_language) i18n.changeLanguage("th")
        else i18n.changeLanguage("en")
        window.location.reload()
      })
      .catch(() => {
        setLoading(false)
        setError("invalidInput", {
          type: "async",
          message: t("invalidInput"),
        })
      })
  }

  useEffect(() => {
    if (history.location.search) {
      const params = history.location.search
      const ticket = params.slice(params.indexOf("=") + 1)
      setLoading(true)
      client
        .post<UserResponse>(`/users/validation`, {
          appticket: ticket,
        })
        .then((res: AxiosResponse<UserResponse>) => {
          setLoading(false)
          setCookie("token", res.data.token, 1)
          setToken(res.data.token)
          const first_time_login = res.data.is_first_login
          setIsFirstLogin(first_time_login)
          if (res.data.is_first_login) history.push(`${path}/personal`)
          else history.push("/home")
          if (res.data.is_thai_language) i18n.changeLanguage("th")
          else i18n.changeLanguage("en")
        })
        .catch((err) => {
          setLoading(false)
          setError("invalid", {
            type: "async",
            message: t("badResponse"),
          })
        })
    }
  }, [i18n, history, path, setError, setToken, t])

  return { isLoading, onLogin }
}

export const usePreventUserFromSignIn = () => {
  const history = useHistory()
  const { isUser } = useAuthContext()
  useEffect(() => {
    if (isUser) history.push("/home")
  }, [history, isUser])
}
export const usePersonalInfo = () => {
  const { token } = useAuthContext()
  const history = useHistory()
  const onSubmit = (data: DefaultAccount) => {
    client
      .put(
        `/users/validation`,
        {
          is_thai_language: data.is_thai_language,
          personal_email: data.personal_email,
          phone: data.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setIsFirstLogin(false)
        history.push("/home")
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    if (!getIsFirstlogin()) {
      history.push("/home")
    }
  }, [history])
  return { onSubmit }
}
