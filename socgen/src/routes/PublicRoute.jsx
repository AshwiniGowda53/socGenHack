import { Navigate } from "react-router-dom"
import { getAccessToken } from "../auth/tokenService"

const PublicRoute = ({ children }) => {
  const token = getAccessToken()

  return token ? <Navigate to="/dashboard" replace /> : children
}

export default PublicRoute