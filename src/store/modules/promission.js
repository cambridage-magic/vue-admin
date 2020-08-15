import {getUserRole} from "../../api/login.js";
import {defaultRouterMap,asyncRouterMap}  from "../../router/index.js"
function hasPremission(roles,router){
    if(router.meta && router.meta.role){
        return roles.some(item=>router.meta.role.indexOf(item) >= 0)
    }
}
  const  state ={       
        allRouters:defaultRouterMap,
        addRouters:[],
      }


  const getters = {
      
       allRouters:state=> state.allRouters,
       addRouters:state => state.addRouters
   }
  const  mutations = {
      SET_ROUTER(state,routers){
       state.addRouters = routers
       state.allRouters = defaultRouterMap.concat(routers)
      }
      
         }
   const  actions = {

    getRoles({commit},requestData){
        return new Promise((reslove,reject)=>{
          getUserRole().then((response)=>{
              let role  = response.data.role
              /* commit('SET_ROLES',role) */
                reslove(role)
               
          })
        })
    },
    //创建动态路由
       creatRouters({commit},data){
           return new Promise((resolve,reject)=>{
         let role = data
         let addRouters = []
         if(role.includes('admin')){
             console.log('admin')
             addRouters = asyncRouterMap
         }else{
         /*  addRouters = asyncRouterMap.filter((item)=> {
             if(role.includes(item.meta.system)) {
             return item
     
            }
        
        }) */

        addRouters = asyncRouterMap.filter((item)=> {
            if(hasPremission(role,item)){
              if(item.children && item.children.length>0){
                     item.children = item.children.filter(child =>{
                         if(hasPremission(role,child)){
                             return child
                         }
                     })
              }
                return item     
            }
        })
         console.log('其他')
         console.log(role)
    }
         //更新路由
        commit('SET_ROUTER',addRouters)
        resolve()
        })

}
   }



export default {
   namespaced: true,
   state,
   mutations,
   actions,
   getters
   
}