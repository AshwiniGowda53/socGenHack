import Cookies from "js-cookie"
export const setTokens = (access, refresh) => {
  Cookies.set("accessToken", access)
  Cookies.set("refreshToken", refresh)
}

export const getAccessToken = () => Cookies.get("accessToken")
export const getRefreshToken = () => Cookies.get("refreshToken")

export const clearTokens = () => {
  Cookies.remove("accessToken")
  Cookies.remove("refreshToken")
}