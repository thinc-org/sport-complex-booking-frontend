import React, { useContext, useMemo, useState } from "react"

interface AuthContextConstruct {
  token: string | undefined
  isUser: Boolean
  isAdmin: Boolean
}

export const AuthContext = React.createContext({} as AuthContextConstruct)

export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({ ...props }) => {
  const [token, setToken] = useState<string>()
  const isUser = useMemo(() => true, [])
  const isAdmin = useMemo(() => true, [])

  const value = { token, isUser, isAdmin }
  return <AuthContext.Provider value={value} {...props} />
}

export default AuthProvider
