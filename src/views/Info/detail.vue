<!--  -->
<template>
<div>
  <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="信息分类">
    <el-select v-model="form.categoryId" placeholder="请选择活动区域">
         <el-option
     v-for="item in options.category"
     :key="item.id"
     :label="item.category_name"
     :value="item.id"
   ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="新闻标题">
  <el-input v-model="form.title"></el-input>
</el-form-item>
   <el-form-item label="缩略图" >
     <UpLoadImgage  :imgUrl.sync ="form.imageUrl" :token ="data.uploadKey.token" />
  </el-form-item>
  <el-form-item label="发布日期">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.createDate" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="详细内容" >
     <quillEditor v-model="form.content" ref="myQuillEditor" :options="form.editorOption"/>
 </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="edit" >保存</el-button>
    <el-button>返回</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
import { reactive, ref, isRef, toRefs,watch,onMounted } from "@vue/composition-api"
import {common} from  "../../utils/global_V3.0"
import {GetInfoList,EditInfo} from  "../../api/news"
import {UpLoadImg} from  "../../api/common"
import {format}  from "../../utils/common"
//富文本
import { quillEditor } from "vue-quill-editor"; 
//引入缩略图
import UpLoadImgage from "../../components/UpLoadImg/UploadImg"
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {

    components:{
    quillEditor,
    UpLoadImgage
  },
  setup(props,{root}){
   const { Catedata ,getCategroy} =common();
   const data = reactive({
     id:root.$route.params.id || root.$store.getters["infoDetail/infoId"],
     title: root.$route.params.title ||root.$store.getters["infoDetail/infoTitle"],
     uploadKey:{
       token:"",
       key:''
     }
   })
   const form = reactive({ 
          title: '',
          categoryId: '',
          createDate:'',
          content:'',
          editorOption:{},
          imageUrl: ''
   })
   const options = reactive({
   category:[

 ]
   })
   onMounted(()=>{
         getCategroy()
         getInfoList()
         uploading()
  })
   
  const toDate = (date) =>{
     
      return format(date)
  }
  //获取分类
  watch(()=>Catedata.item,(value)=>{ options.category=value})
const getInfoList =()=>{
   let requestData = {
       pageNumber:1,
       pageSize:1,
       id:data.id

   }
     GetInfoList(requestData)
     .then((response)=>{ 
       console.log(response)
        console.log('a')
      let resdata= response.data.data
       form.title = resdata[0].title
       form.categoryId = resdata[0].categoryId
       form.createDate = toDate(resdata[0].createDate)
       form.content = resdata[0].content
       form.imageUrl = resdata[0].imgUrl;
     }).catch((error)=>{
      
     })
}
//保存编辑
const edit = () =>{
    let requestData={
      id: data.id,
      categoryId: form.categoryId,
      title: form.title,
      content:form.content,
      imgUrl:form.imageUrl
  }
 
  EditInfo(requestData).then((response)=>{
      root.$message({
        message:response.message,
        type:'success'
      })
  }).catch((error)=>{
  })

}
//上传图片
const uploading =() =>{
  let requestData ={
    accesskey:"WCodyrIXt2CU3rFu7wIMf3d2C5-uYdo57ksqvQ_T",
    secretkey:"8m3tf_ltU7kM44EE0C-y-PiKziIaAA_OoQao28nG",
    buckety:"webte"
  }
  console.log('up')
  UpLoadImg(requestData).then((response)=>{
    console.log(response)
    data.uploadKey.token = response.data.token
    console.log( data.uploadKey.token)
  })
}

   return{
     options,toDate,
     data,
     //方法
     edit,
     form
   }
  }
  
  }
  
  
</script>
<style lang='scss' scoped>
 
</style>