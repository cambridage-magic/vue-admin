import axios from "axios";
import { Message } from 'element-ui';
import { getToKen, getUserName } from "./app";
//自定义 axios 实例添加拦截器
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';
const server = axios.create({
    baseURL:BASEURL,
    timeout: 15000,
});
// 添加请求拦截器
server.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers['Tokey'] =getToKen()
    config.headers['UserName'] =getUserName()
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
server.interceptors.response.use(function (response) {
    // 对响应数据做点什么
   /*  console.log('response') */
   /*  console.log(response) */
    let data = response.data
    // 业务需求

    if(data.resCode !== 0) {
        Message.error(data.message);
        return Promise.reject(data);
    }else{
       
         return Promise.resolve(data);
    }
  
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


export default server

















































