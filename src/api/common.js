//上传图片
import server  from  "../../src/utils/request"  
export const UpLoadImg  = (data)  =>{
    
    return  server.request({       
        url: '/uploadImgToken/',  
        method: 'post', 
        data
        
 })
}