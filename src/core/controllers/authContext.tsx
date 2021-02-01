import React, { useContext, useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import { getCookie } from "../contexts/cookieHandler"
import { client } from "../../axiosConfig"
interface AuthContextConstruct {
  token: string | undefined
  isUser: boolean
  setToken: (token: string) => void
  isAdmin: boolean
  setIsAdmin: (isAdmin: boolean) => void
}
interface Token {
  isStaff: boolean
  exp: number
  iat: number
  userId: string
}

export const AuthContext = React.createContext({} as AuthContextConstruct)

export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({ ...props }) => {
  const [token, setToken] = useState(getCookie("token") ?? undefined)
  const [isAdmin, setIsAdmin] = useState(false)
  const decodedToken = token ? jwt_decode<Token>(token) : undefined
  const isUser = !!decodedToken
  const isStaff = decodedToken?.isStaff
  const value = { token, isUser, setToken, isAdmin, setIsAdmin }
  // TODO: Extract isAdmin from token instead
  useEffect(() => {
    if (isStaff) {
      client
        .get("staffs/profile")
        .then((res) => {
          if (res.data.is_admin) setIsAdmin(true)
          else setIsAdmin(false)
        })
        .catch((err) => setIsAdmin(false))
    }
  }, [setIsAdmin, isStaff])
  //
  useEffect(() => {
    const cookieToken = getCookie("token") ?? undefined
    setToken(cookieToken)
  }, [isUser])
  return <AuthContext.Provider value={value} {...props} />
}

export default AuthProvider
