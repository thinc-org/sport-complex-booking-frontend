import React, { useContext, useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import { getCookie } from "../contexts/cookieHandler"
interface AuthContextConstruct {
  token: string | undefined
  isUser: boolean
  setToken: Function
  isAdmin: boolean
}

export const AuthContext = React.createContext({} as AuthContextConstruct)

export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({ ...props }) => {
  const [token, setToken] = useState(getCookie("token") ?? "")
  const isUser = !!(token ? jwt_decode(token) : "")
  const isAdmin = false // this is currently unused
  const value = { token, isUser, setToken, isAdmin }

  useEffect(() => {
    const cookieToken = getCookie("token") ?? ""
    setToken(cookieToken)
  }, [isUser])

  return <AuthContext.Provider value={value} {...props} />
}

export default AuthProvider
