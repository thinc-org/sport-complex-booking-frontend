import React, { useContext, useEffect, useMemo, useState } from "react"
import jwt_decode from 'jwt-decode'
import { getCookie } from '../contexts/cookieHandler'
interface AuthContextConstruct {
  token: string | undefined
  isUser: Boolean,
  setToken: Function
  isAdmin: Boolean
}

export const AuthContext = React.createContext({} as AuthContextConstruct)

export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({ ...props }) => {
  const [token, setToken] = useState(getCookie('token') ?? '')
  const isUser = !!(token ? jwt_decode(token) : '')
  const isAdmin = false // this is currently unused
  const value = { token, isUser, setToken, isAdmin }
  return <AuthContext.Provider value={value} {...props} />
}

export default AuthProvider
