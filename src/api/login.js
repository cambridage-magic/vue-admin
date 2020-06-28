import server from "@/utils/request"

/* 获取验证码 */
export const GetSms = (data)=>{
    
  return  server.request({  
        // `url` 是用于请求的服务器 URL
       url: '/getSms/',
       // `method` 是创建请求时使用的方法
       method: 'post', // default
       data
       
})
}

/* 获取用户角色 */


/* 登录 */
 
export const Login = (data)=>{
  return server.request({
    url:'/login/',
    method:'post',
    data
})
}







/* 注册 */
export const Register = (data) =>{
 return   server.request({
     url:'/register/',
     method:'post',
     data
 })
}