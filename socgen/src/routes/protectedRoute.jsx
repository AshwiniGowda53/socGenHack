import { Navigate } from "react-router-dom"
import { getAccessToken } from "../auth/tokenService"

const ProtectedRoute = ({ children }) => {
  return getAccessToken() ? children : <Navigate to="/" />
}

export default ProtectedRoute