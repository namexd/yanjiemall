import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const NameKey = 'Admin-Name'
const MenuKey = 'adminMenus'
const SubMenuKey = 'adminSubMenus'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


export function removeMenus() {
  return localStorage.removeItem(MenuKey)
}


export function removeSubMenus() {
  return localStorage.removeItem(SubMenuKey)
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

export function setSubMenu(menu) {
  return localStorage.setItem(SubMenuKey,menu)
}
export function getSubMenu() {
  return localStorage.getItem(SubMenuKey)
}

