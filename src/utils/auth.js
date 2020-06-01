import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const NameKey = 'Admin-Name'
const MenuKey = 'adminMenus'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUsername() {
  return Cookies.get(NameKey)
}

export function setUsername(name) {
  return Cookies.set(NameKey, name)
}

export function setMenu(menu) {
  return localStorage.setItem(MenuKey,menu)
}
export function getMenu() {
  return localStorage.getItem(MenuKey)
}

