import Cookies from 'js-cookie'

const TokenKey = 'csrftoken'
const ReginonId = 'regionid'
const ZoneId = 'zoneid'
const Vnc = 'hasVnc'
const RegionType = 'regionType'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setRegionId(uuid){
	return localStorage.setItem(ReginonId,uuid)
}

export function getRegionId(){
	return localStorage.getItem(ReginonId)
}

export function SetZoneId(zoneid){
	return localStorage.setItem(ZoneId,zoneid)
}

export function getZoneId(){
	return localStorage.getItem(ZoneId)
}

export function GetVnc(){
	return localStorage.getItem(Vnc)
}
export function SetVnc(hasVnc){
	return localStorage.setItem(Vnc,hasVnc)
}

export function SetRegionType(type){
	return localStorage.setItem(RegionType,type)
}
export function getRegionType(){
	return localStorage.getItem(RegionType)
}
export function setRoute(route){
  return localStorage.setItem('route',route)
}
export function getRoute(){
  return localStorage.getItem('route')
}
