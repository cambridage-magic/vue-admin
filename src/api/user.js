import server from "@/utils/request"

//获取角色
export  function GetUser(data = {}) {
    return server.request({
        url: '/role/', 
        method: 'post', 
        data
    })
}
//添加用data户
 export function Adduser(data){
    return server.request({
        url: '/user/add/', 
        method: 'post', 
        data
    })
 }
 //删除用户
 export function DeleteUser(data){
    return server.request({
        url: '/user/delete/', 
        method: 'post', 
        data
    })
 }
 //用户禁启用
 export function UserActives(data){
    return server.request({
        url: '/user/actives/', 
        method: 'post', 
        data
    })
 }
 //用户编辑
 export function EditUser(data){
    return server.request({
        url: '/user/edit/', 
        method: 'post', 
        data
    })
 }
//获取系统
export function GetSystem(data){
    return server.request({
        url: '/system/', 
        method: 'post', 
        data
    })
 }
