import { useState, useEffect } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import { useAuthContext } from "../../../controllers/authContext"
import { setCookie } from "../../../contexts/cookieHandler"
import { setIsFirstLogin, getIsFirstlogin } from "../../../../constant"
import { client } from "../../../../axiosConfig"
import axios, { AxiosResponse } from "axios"
import { PersonalInfo } from "../../../dto/account.dto"
import { useTranslation } from "react-i18next"
import { ErrorOption } from "react-hook-form"
import { LoginDTO } from "../../pages/staff-pages/staffHooks"
import { useLanguage } from "../../../i18n/i18n"

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
  const { changeLanguage } = useLanguage()

  const onLogin = (data: LoginDTO) => {
    setLoading(true)
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
        if (res.data.is_first_login) history.push("/personal")
        else history.push("/home")
        if (res.data.is_thai_language) changeLanguage("th")
        else changeLanguage("en")
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
      let isMounted = true
      const source = axios.CancelToken.source()
      const params = history.location.search
      const ticket = params.slice(params.indexOf("=") + 1)
      setLoading(true)
      client
        .post<UserResponse>(
          `/users/validation`,
          {
            appticket: ticket,
          },
          { cancelToken: source.token }
        )
        .then((res: AxiosResponse<UserResponse>) => {
          if (isMounted) {
            setLoading(false)
            setCookie("token", res.data.token, 1)
            setCookie("type", "CUStudent", 1)
            setToken(res.data.token)
            const first_time_login = res.data.is_first_login
            setIsFirstLogin(first_time_login)
            if (res.data.is_first_login) history.push("/personal")
            else history.push("/home")
            if (res.data.is_thai_language) changeLanguage("th")
            else changeLanguage("en")
          }
        })
        .catch((err) => {
          if (axios.isCancel(err)) console.log("cancelled")
          setLoading(false)
          setError("badResponse", {
            type: "async",
            message: "badResponse",
          })
        })
      return () => {
        isMounted = false
        source.cancel()
      }
    }
  }, [i18n, history, path, setError, setToken, changeLanguage])

  return { isLoading, onLogin }
}

export const usePersonalInfo = () => {
  const { changeLanguage, language } = useLanguage()
  const { token } = useAuthContext()
  const history = useHistory()
  const onSubmit = (data: PersonalInfo) => {
    client
      .put(
        `/users/validation`,
        {
          is_thai_language: language === "th",
          personal_email: data.personal_email,
          phone: data.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setIsFirstLogin(false)
        changeLanguage(data.is_thai_language === "true" ? "th" : "en")
        history.push("/home")
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    if (!getIsFirstlogin()) {
      history.push("/home")
    }
  }, [history])
  return { onSubmit, changeLanguage }
}
