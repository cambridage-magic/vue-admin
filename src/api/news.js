
import server from "@/utils/request"
/* 获取信息列表 */
export const GetInfoList = (data)=>{
   
    return server.request({
        url: '/news/getList/',    
        method: 'post', 
        data
     })
} 
/* 新增 */
export const AddInfo =(data) =>{
     return server.request({
        url: '/news/add/',    
        method: 'post', 
        data
     })
}
/* 编辑信息 */
export const EditInfo = (data) =>{
    return server.request({
        url: '/news/editInfo/',    
        method: 'post', 
        data
     })
}

/* 删除一级分类 */
export const DeleteFirst =(data) =>{
     return server.request({
        url: '/news/deleteCategory/ ',    
        method: 'post', 
        data
     })
}

/* 信息分类添加一级 */
export const AddFirstCate = (data)=>{
    
    return  server.request({  
          // `url` 是用于请求的服务器 URL
         url: '/news/addFirstCategory/',
         // `method` 是创建请求时使用的方法
         method: 'post', // default
         data
         
  })
  }

/*获取信息分类 */
export const GetCate = (data)=>{
    return  server.request({       
       url: '/news/getCategory/ ',     
       method: 'post', 
       data
       
})
}
/* 修改 */
export const EditCategory = (data)=>{
    return  server.request({       
       url: '/news/editCategory/',     
       method: 'post', 
       data
       
})
}
//删除信息
export const DeleteInfoItem  = (data)  =>{
    console.log('se')
    return  server.request({       
        url: '/news/deleteInfo/',  
        method: 'post', 
        data
        
 })
}
//信息分类添加子级
export const AddSecondCategory  = (data)  =>{
    
    return  server.request({       
        url: '/news/addChildrenCategory/',  
        method: 'post', 
        data
        
 })
} 
//获取全部分类
export const GetCategoryAll  = (data)  =>{
    
    return  server.request({       
        url: '/news/getCategoryAll/',  
        method: 'post', 
        data
        
 })
}