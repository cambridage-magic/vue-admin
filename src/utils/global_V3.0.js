import { MessageBox, Form } from 'element-ui';
import { ref, reactive } from '@vue/composition-api';
import {GetCate,GetCategoryAll,GetInfoList}  from "../api/news.js"
import {requestUrl}  from "../api/requestUrl"
import {loadTableData} from "../api/common"
export function global(){
    const str = ref('');
    const confirm = (params) => {
        MessageBox.confirm(params.content,  params.tip || "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: params.type || "warning",
            center: true
        }).then(() => {
            str.value = params.id || '';
            params.fn && params.fn(params.id || '')
        }).catch(() => {
            params.catchFn && params.catchFn()
        });
    }

    return {
        str,
        confirm
    }
}
export function  common(){
    const Catedata = reactive({
        item:[]
    })
    const CatedataAll = reactive({
        item:[]
    })
    //获取一级分类
    const  getCategroy  = () =>{
        GetCate({}).then(response=>{
            Catedata.item= response.data.data
        }).catch((error)=>{})
    }
    //获取全部分类
    const  getCategroyAll  = () =>{
        GetCategoryAll({}).then(response=>{
            CatedataAll.item= response.data
        }).catch((error)=>{})
    }
      
  return {
     getCategroy,
     Catedata,
     getCategroyAll,
     CatedataAll
  }
        

}
//获取用户列表数据
export  function loadTable (params){
    const tableData = reactive({
        item:[
            
        ],
        total: 0
    })
    const getUserList =(params)=>{
       /* let requestJson = params  */
      const reqdata = {
          url:requestUrl[params.url],
          data:params.requestInfo,
          method:params.method
      }
     loadTableData(reqdata).then((response)=>{
        /*  console.log('table') */
        /*  console.log(response) */
         tableData.item = response.data.data    
         tableData.total = response.data.data.length === 0 ? 0 : response.data.total
        
     }).catch((error)=>{
    console.log(console.error)
     })
    }
    return{
        tableData,
        getUserList
    }
}











