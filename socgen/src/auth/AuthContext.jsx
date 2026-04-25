import { createContext, useContext, useEffect, useState } from "react"
import { loginApi, refreshApi } from "../api/authApi"
import { setTokens, clearTokens, getAccessToken } from "./tokenService"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = async (customerId, password) => {
    const data = await loginApi(customerId, password)
    setTokens(data.accessToken, data.refreshToken)
    setUser(data.user)
  }

  const logout = () => {
    clearTokens()
    setUser(null)
  }

  useEffect(() => {
    const init = async () => {
      try {
        if (getAccessToken()) {
          const data = await refreshApi()
          setTokens(data.accessToken, data.refreshToken)
        }
      } catch {
        logout()
      }
    }
    init()
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)