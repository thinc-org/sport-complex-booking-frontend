import React, { useContext, useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import { getCookie } from "../contexts/cookieHandler"
interface AuthContextConstruct {
  token: string | undefined
  isUser: boolean
  setToken: (token: string) => void
  isAdmin: boolean
  setIsAdmin: (isAdmin: boolean) => void
}

export const AuthContext = React.createContext({} as AuthContextConstruct)

export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({ ...props }) => {
  const [token, setToken] = useState(getCookie("token") ?? "")
  const [isAdmin, setIsAdmin] = useState(false)
  const isUser = !!(token ? jwt_decode(token) : "")
  const value = { token, isUser, setToken, isAdmin, setIsAdmin }

  useEffect(() => {
    const cookieToken = getCookie("token") ?? ""
    setToken(cookieToken)
  }, [isUser])

  return <AuthContext.Provider value={value} {...props} />
}

export default AuthProvider
