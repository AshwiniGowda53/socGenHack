import { getRefreshToken } from "../auth/tokenService"

export const loginApi = async (customerId, password) => {
  const res = await fetch("/login", {
    method: "POST",
    body: JSON.stringify({ customerId, password })
  })

  if (!res.ok) throw new Error("Invalid credentials")

  return res.json()
}

export const refreshApi = async () => {
  const res = await fetch("/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken: getRefreshToken() })
  })

  if (!res.ok) throw new Error("Session expired")

  return res.json()
}