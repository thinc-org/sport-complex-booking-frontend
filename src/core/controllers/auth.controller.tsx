import React, { useContext, useMemo, useState } from "react"
import jwt_decode from 'jwt-decode'
import { getCookie } from '../contexts/cookieHandler'
interface AuthContextConstruct {
  token: string | undefined
  isUser: Boolean,
  setToken: Function
  // isAdmin: Boolean
}

export const AuthContext = React.createContext({} as AuthContextConstruct)

export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({ ...props }) => {
  const [token, setToken] = useState<string>(getCookie('token') ?? '')
  const isUser = useMemo(() => {
    const decodedToken = token ? jwt_decode(token) : ''
    return decodedToken ? true : false
  }, [token])
  // const isAdmin = useMemo(() => true, [])
  const value = { token, isUser, setToken }
  return <AuthContext.Provider value={value} {...props} />
}

export default AuthProvider
