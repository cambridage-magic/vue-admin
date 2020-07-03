import { MessageBox, Form } from 'element-ui';
import { ref, reactive } from '@vue/composition-api';
import {GetCate,GetCategoryAll}  from "../api/news.js"
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











