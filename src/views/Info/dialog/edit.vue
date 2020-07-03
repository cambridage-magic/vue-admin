<!--  -->
<template>
<div>
<el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="580px" @opened="openDialog">
   <el-form :model="form"  ref="form">
   <el-form-item label="类别" :label-width="formLabelWidth">
    <el-select v-model="form.category" placeholder="请选择活动区域">
    <el-option 
    v-for="item in categoryOption.item"
    :key="item.id"
    :label="item.category_name" 
    :value="item.id">
    </el-option>
  </el-select>   
   </el-form-item>
    <el-form-item label="标题" :label-width="formLabelWidth">
      <el-input v-model="form.title" placeholder="请输入标题"></el-input>
    </el-form-item>
     <el-form-item label="概况" :label-width="formLabelWidth">
      <el-input type="textarea" v-model="form.content" placeholder="请输入内容"></el-input>
    </el-form-item>
 </el-form> 
 <div slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary"  @click="submit()"  :loading="data.witeLoading" >确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import { reactive, ref, isRef, toRefs, watchEffect,onMounted} from "@vue/composition-api";
import {AddInfo,EditInfo,GetInfoList} from  "../../../api/news"
export default {
    name:'dialogEdit',
      props:{
      flag:{
        type :Boolean,
        default:false
        },
       category:{
         type:Array,
         defalult:()=>[]
       },
       id:{
           type:String,
           default:''
       }
  },
   setup(props,{root,emit,refs}){
       const  dialog_info_flag = ref(false)
       const  formLabelWidth = ref('120px')
       const data  = reactive({
         witeLoading:false 
       })
       const  form = reactive({ 
          title: '',
          category:'',
          content:'',
        })
      const categoryOption = reactive({
        item:[]
      })
      //监视
      watchEffect(()=>dialog_info_flag.value= props.flag)


      /* 请求********************************** */ 
      //编辑信息
      const submit =() =>{
        let requestData={
           
      /*   id: props.id */
      /*   categoryId: 分类ID（string） */
      /*   title: 标题（string） */
      /*   updateDate: 日期（string） */
      /*   content: 内容（string） */
            id: props.id,
            categoryId: form.category,
            title: form.title,
            content:form.content
        }
        data.witeLoading = true
        EditInfo(requestData).then((response)=>{
            root.$message({
              message:response.message,
              type:'success'
            })
             data.witeLoading = false
             emit("getInfoList")
           resetForm ()
           
        }).catch((error)=>{

        })
        
      }
  
      /* 清除表单数据 */
      const resetForm = () =>{
           form.title = '',
           form.content='',
           form.category = ''
      }
         
    const close = ()=>{
        dialog_info_flag.value = false
        emit("update:flag",false)
    } 
    const openDialog =()=>{
     categoryOption.item = props.category
     getInfo()
     console.log(props.id)
    }
    const getInfo = () =>{
     let requestData = {
      pageNumber:1,
      pageSize:1,
      id:props.id
  }
  GetInfoList(requestData).then((response)=>{
    
let   resData = response.data.data[0]
 form.title = resData.title
 form.content=resData.content
 form.category = resData.categoryId
  })
    }
      /*  watchEffect(()=>categoryOption.item=props.category) */
       return {
           close,
           form,
           formLabelWidth,
           dialog_info_flag,
           categoryOption,
           openDialog,
           submit,
           data
          

       }
   }}
</script>
<style lang='scss' scoped>

</style>