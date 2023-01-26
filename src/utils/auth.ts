import User from "src/types/user.type"
import { LocalStorage } from "./constants"

export const LocalStorageEventTarget = new EventTarget()

export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem(LocalStorage.accessToken, access_token)
}

export const clearLS = () => {
  localStorage.removeItem(LocalStorage.accessToken)
  localStorage.removeItem(LocalStorage.profile)
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent) // Xuất ra 1 cái event có type là clearLS
}

export const getAccessTokenFromLS = () => localStorage.getItem(LocalStorage.accessToken) || ''

export const getProfileFromLS = () => {
  const result = localStorage.getItem(LocalStorage.profile)
  return result ? JSON.parse(result) : null
}

export const saveProfileToLS = (profile: User) => {
  localStorage.setItem(LocalStorage.profile, JSON.stringify(profile))
}