<!--  -->
<template>
<div  id="category">
    <hr class="hr-e9e9e9">
    <el-button type="danger" @click="addFirst({type:'category_first_add'})"> 
    添加一级分类
    </el-button>
    <div>
        <el-row :gutter="30">
            <el-col :span = "8">
                <div class="category-wrap">
                <div class="category" v-for="firstItem in category.item" :key="firstItem.id">
                    <h4 >
                         <svg-icon iconClass="plus" className="plus"></svg-icon>
                        {{firstItem.category_name}}  -- {{firstItem.id}}
                    <div class="button-group">
                        <el-button round size="mini"  @click="editCategory({ data:firstItem,type:'category_first_edit'})" type="danger">编辑</el-button>
                        <el-button round size="mini"  @click="addSec({ data:firstItem,type:'category_children_add'})" type="success"> 添加子级</el-button>
                        <el-button size="mini" round @click="delete_first_item(firstItem.id)">删除</el-button>
                    </div>
                    </h4>
                    <ul  v-if="firstItem.children">
                  <li v-for="childrenItem in firstItem.children" :key="childrenItem.id" >
                      {{childrenItem.category_name}} 
                    <div class="button-group">
             <el-button round size="mini" type="danger">编辑</el-button>
             <el-button size="mini" round>删除</el-button>
                           </div>
                        </li>
                      
                    </ul>
                </div>

               </div>          
            </el-col>
            <el-col :span="16">
        <h4 class="menu-title">一级分类编辑</h4>
     <el-form label-width="142px" class="form-wrap" >
  <el-form-item label="一级分类名称" v-if="first_cate" >
    <el-input v-model="formLabelAlign.name" :disabled="first_dis"></el-input>
  </el-form-item>
  <el-form-item label="二级分类名称" v-if="sec_cate">
    <el-input v-model="formLabelAlign.region" :disabled="sec_dis"></el-input>
  </el-form-item>
   <el-form-item>
    <el-button type="danger" @click="submit" :loading="submit_button_loading">确定</el-button>
  </el-form-item>
</el-form>  
            </el-col>
        </el-row>
    </div>
</div>

</template>

<script>
import { reactive, ref, isRef, toRefs,onMounted,watch} from "@vue/composition-api"
import {AddFirstCate,GetCate,DeleteFirst,EditCategory,AddSecondCategory,GetCategoryAll}  from "../../api/news"
import { global,common } from "@/utils/global_V3.0";
export default {
  setup(props,{root}) {

  const { str, confirm } = global();
  const { getCategroyAll,CatedataAll} = common();
  const { Catedata ,getCategroy} =common();
  const first_dis = ref(true)
   const sec_dis = ref(true)
   const first_cate = ref(true)
   const submit_type = ref('')
   const sec_cate = ref(true) 
   const valueId = ref()
   const  submit_button_loading  = ref(false)
   const   formLabelAlign =reactive ({
       name: '',
       region: '',
       type: ''
     })
 
  const category = reactive({
    item:[
      
      
    
     ],
        
     current:[

     ]   
        }
  )

/* 生命周期  初始化，获取category */
 
onMounted(()=>{
getCategroyAll()})

watch(()=>CatedataAll.item,(value)=>{
  console.log(value)
    category.item =  value

})

   /* 方法 */
   const addFirst =(params)=>{
       submit_type.value = params.type 
       first_cate.value = true
       sec_cate.value = false
       first_dis.value = false
   }
//添加子级
 const addSec = (params) =>{
    submit_type.value = params.type 
     sec_cate.value = true
     sec_dis.value = false
      first_dis.value = true
     formLabelAlign.name =params.data.category_name
     category.current = params.data
 }
const addSecondCategory =() =>{
  if(!formLabelAlign.region){
    root.$message({
      message:'不能为空',
      type:'error'
      
    })
    return false
  }
  let requestData = {
      categoryName:formLabelAlign.region,
      parentId:category.current.id
  }
  AddSecondCategory(requestData).then((response)=>{
   root.$message({
   message:response.message,
   type:'success'
   
 })
   console.log(response)
  })
}


/* 编辑 */
  const  editCategory  =(params) =>{
       submit_type.value = params.type 
        first_cate.value = true
        sec_cate.value = false
        formLabelAlign.name =params.data.category_name
        category.current = params.data
  }
  const editFirstCategory = (current) =>{
      if(formLabelAlign.name===''){
     root.$message({
    message: '不能为空',
    center: true
  });
  return false
      }
      let  data ={
          id:current.id,
          categoryName:formLabelAlign.name
      }
      EditCategory(data).then((response)=>{
          console.log(response)
   root.$message({
   message: response.message,
   center: true,
   type:'success'
 })
       category.current.category_name = response.data.data.categoryName
   
      }).catch(()=>{

      })
  }

   const submit = ()=>{
     if(submit_type.value ==='category_first_add'){
         addFirstCategory()
     }
      if(submit_type.value ==='category_first_edit'){
       editFirstCategory(category.current)
 }   
       if(submit_type.value ==='category_children_add'){
         addSecondCategory()
   }
   }
   /* 请求 */
   const addFirstCategory =()=>{
       if(!formLabelAlign.name){
            root.$message({
          message: '不能为空',
          center: true
        });
        return 
       }
       submit_button_loading.value = true
       let data = {
           categoryName:formLabelAlign.name
       }
        AddFirstCate(data).then((response)=>{
        /*  console.log('a') */
        /*  console.log(response) */
         if(response.resCode===0){
            root.$message({
             message: response.message,
             center: true,
             type: 'success'
             });
          let  newValue = response.data
        category.item.push(newValue)
        console.log(category.item)
         submit_button_loading.value = false
         }
        }).catch(()=>{
         submit_button_loading.value = false
        })
   }
   /* 删除一级分类 */
     let delete_first_item =(Id) =>{
         valueId.value = Id
       confirm({
       content:'确认删除',
        tip:'提示',
        type:'warning',
        fn:delete_first,
        catchFn:cancelDelete
       })
   }

   
   

/*  */
  let delete_first = () =>{
       let data ={
           categoryId:valueId.value
       }
      DeleteFirst(data).then((response)=>{
         console.log(valueId.value)
         if(response.resCode===0){
       root.$message({
            message: response.message,
            center: true,
            type: 'success'
       })
       let index = category.item.findIndex((i)=>{
         return  i.id === valueId.value
       }) 
        category.item.splice(index,1)
       }
     }).catch((error)=>{

     })

}
let cancelDelete =() =>{
     valueId.value = ''
}




  return{
       formLabelAlign,
       first_cate,
       sec_cate,
       submit,
       addFirst,
       category,
       submit_button_loading,
       delete_first_item,
       editCategory,
       submit_type,
       first_dis,
       sec_dis,
       addSec
      
  }
  }
}

</script>
<style lang='scss' scoped>
@import "../../styles/config.scss";
.category-wrap{
    div:first-child{
        &:before{ top: 20px; }
    }
    div:last-child{
        &:before{bottom: 21px;}
    }
}
.menu-title{
    line-height: 44px;
    padding-left: 22px;
    background-color: #f3f3f3;
}
  .category{
     position: relative;
     line-height: 44px;
     svg{
         position: absolute;
          left: 14px; 
          top: 15px; 
          background-color: #ffffff;
          font-size: 17px;
     }
    &:before{
     content: '';
     position:absolute;
     left:20px;
     top: 0px;
     width:32px;
     bottom: 0px;
     border-left: 1px dotted #000;
 }
      h4{
          padding-left: 40px;
        
      }
      li{
          position: relative;
          padding-left: 36px;
          margin-left: 24px;
          &:before{
              content: '';
              position: absolute;
              left:0;
              top: 22px;
              width:32px;
              border-bottom: 1px dotted #000;
          }
      }
      li, h4{
          @include webkit(transition,all .3s ease 0s);
          &:hover{
            background-color:#f3f3f3;
          .button-group{
              display: block;
          }
          }

      }
      h4:hover{
           + .button-group{
           display: block;
 }
      }
  }
.button-group{
    display: none;
    position: absolute;
    z-index: 2;
    right: 11px;
    top: -1px;
    button{
        font-size: 12px;
    }
}
.form-wrap{
    width: 410px;
    margin-top: 26px;
}
.hr-e9e9e9{
    width: calc(100% + 60px);
    margin-left: -30px;
    border: none;
    border-bottom: 1px solid  #e9e9e9;
    margin-top: 30px;
    margin-bottom: 30px;
   
}
svg{
  color: red !important;
}
</style>