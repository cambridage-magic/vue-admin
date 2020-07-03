import cookie from "cookie_js";
/*  */
const adminToKen = "admin_toKen";
const usernameKey = "username";

export function getToKen(){
    return  cookie.get(adminToKen)
}

export function setToKen(token){
    return  cookie.set(adminToKen,token)
}

export function getUserName(){
    return  cookie.get(usernameKey) || ''
}

export function  setUserName(username){
    return  cookie.set(usernameKey,username)
}
export function removeToken (){
    return cookie.remove(adminToKen)
}
export function removeUserName(){
    return cookie.remove(usernameKey)
}