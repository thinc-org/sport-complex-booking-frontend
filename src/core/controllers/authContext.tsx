import React, { useContext, useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import { getCookie } from "../contexts/cookieHandler"
interface AuthContextConstruct {
  token: string | undefined
  isUser: boolean
  setToken: (token: string) => void
  role?: string
}
interface Token {
  role: string
  exp: number
  iat: number
  userId: string
}

export const AuthContext = React.createContext({} as AuthContextConstruct)

export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({ ...props }) => {
  const [token, setToken] = useState(getCookie("token") ?? undefined)
  const decodedToken = token ? jwt_decode<Token>(token) : undefined
  const isUser = !!decodedToken
  const role = decodedToken?.role
  const value = { token, isUser, setToken, role }
  useEffect(() => {
    const cookieToken = getCookie("token") ?? undefined
    setToken(cookieToken)
  }, [isUser])
  return <AuthContext.Provider value={value} {...props} />
}

export default AuthProvider
