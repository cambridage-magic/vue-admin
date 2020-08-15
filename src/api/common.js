//上传图片
import server  from  "../../src/utils/request"  
export const UpLoadImg  = (data)  =>{
    
    return  server.request({       
        url: '/uploadImgToken/',  
        method: 'post', 
        data
        
 })
}
//请求表格数据
export function loadTableData(params){
    return server.request({
        method: params.method || "post",
        url: params.url,
        data: params.data || {}
    })
}
//请求用户地址
export function GetAddress(data){
    return server.request({
            method: "post",
            url: "/cityPicker/",
            data
       
    })
}