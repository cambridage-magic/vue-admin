<!--  -->
<template>
<div>
   <el-row >
       <el-col :span="20">
         <div class="label-warp">
               <div class="warp-content">
          <el-row :gutter="10">
              <el-col :span="1"><label for="">关键字: </label></el-col>
             <el-col :span="3">
         <Select :selectValue="data.selectValue" :selectData.sync="data.selectData" ></Select>
       </el-col>
       <el-col :span="5">
           <el-input  v-model="data.key_word" ></el-input>
       </el-col>
       <el-col :span="15">
         <el-button type="danger"  @click="search" >搜索</el-button>
          </el-col>
          </el-row>
          </div>
        </div>
    </el-col>   
    <el-col :span="4"> 
           <el-button type="danger"   @click="handlerAdd" class="pull-right">新增用户</el-button>
    </el-col>
   </el-row>
   <div class="black-space-30"></div>
    <Table   ref="userTable" :tableHead= "data.tableHead" :selectTable.sync ="data.selectTable" >
      <template v-slot:switchStatus="slotData">
    <el-switch
  v-model="slotData.data.status"
  active-value="2"
  inactive-value="1"
  @change="handerSwitch(slotData)"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
      </template>    
     <template v-slot:operation="slotData">
                <el-button size="small" type="danger" @click="deleteItem(slotData.data)" >删除</el-button>
                <el-button size="small" type="success"  @click="editUser(slotData)" >编辑</el-button>
      </template>
      <template v-slot:tableFooterLeft>
                <el-button size="small" @click="selectAllDel()">批量删除</el-button>
            </template>
    </Table>
     <DialogAdd :flag.sync="data.dialog_add" :userData.sync="data.userData" />
</div>
</template>

<script>
import { reactive, ref, isRef, toRefs,watch,onMounted } from "@vue/composition-api"
import  Select from "../../components/Select/Select"
import Table from  "../../components/Table/Table"
import  DialogAdd  from  "./dialog/DialogAdd.vue"
import { DeleteUser,UserActives,EditUser} from '../../api/user'
import {global,loadTable}  from  "../../utils/global_V3.0"
export default {
 components:{
     Select,
     Table,
     DialogAdd
 },   
setup(props,{root,refs}){
    const {confirm}  = global()
    const {getUserList}  = loadTable()
    const data = reactive({
        key_word:"",
        selectData:{},
        rowData:{
        username: "",
        truename: "",
        password: "",
        phone: "",
        region: "",
        status: "2",
        role: [],
        },
        userData:{},
        switchStatus:false,
        selectTable:{},
        dialog_add:false,
        selectValue:['truename','phone','username'],
        tableHead:{
            thead:[
                   { 
                        label: "邮箱/用户名",
                        field: "username",
                        width: 200
                    },
                    { 
                        label: "真实姓名",
                        field: "truename",
                        width: 120
                    },
                    { 
                        label: "手机号",
                        field: "phone"
                    },
                    { 
                        label: "地区",
                        field: "region"
                    },
                    { 
                        label: "角色",
                        field: "role"
                    },
                    {   label:'禁启用状态',
                        field:"status",
                        columnType:'slot',
                        slotName:'switchStatus'
                    },
                    {
                        label:'操作',
                        columnType:'slot',
                        slotName:'operation'
                    }
            ],
            selectState:true,
            //请求接口
            requestData:{
                  url:"getUserList",
                  method:'post',
                  requestInfo:{
                    username:"",
                    truename:"",
                    phone:"",
                    pageNumber:1,
                    pageSize:10  
                                          
                }
            }
    
    
        }
    })

//删除

 const  deleteItem = (col)=>{

     DeleteUser({id:[col.id]}).then((response)=>{
         root.$message({
             message:response.message,
             type:'success'
         })
        refs.userTable.refreshData()
     })
 }

//删除选中
const selectAllDel = () =>{
    DeleteUser({id:data.selectTable.idItems}).then((response)=>{
      root.$message({
     message:response.message,
     type:'success'
 })
   /* getUserList(data.tableHead.requestData) 无效*/
   refs.userTable.refreshData()
    })
}
//滑块
 const handerSwitch  = (rowData) =>{
     if(data.switchStatus){
         return false
     }
     const requestData = {
            id:rowData.data.id,
            status:rowData.data.status
     }
     data.switchStatus = true
     UserActives(requestData).then((response)=>{
         
           root.$message({
               message:response.message,
               type:'success'
           })
           data.switchStatus = false
     }).catch((error)=>{
         console.log(error)
          data.switchStatus = false
     })
 }      
//编辑
 const  editUser = (rowData) =>{
          data.dialog_add = true
          //浅拷贝
          data.userData = Object.assign({},rowData.data)

 }
 //添加用户
 const handlerAdd = (rowData) =>{
     data.dialog_add = true;
     data.userData = Object.assign({})
 }
 //搜索
 const search =()=>{
     let requestData = {
         [data.selectData.value] :data.key_word
     }
     
     refs.userTable.refreshParams(requestData)
     
 }
    return{
        search,
        data,
        editUser,
        deleteItem,
        selectAllDel,
        handerSwitch,
        handlerAdd
    }
}
}

</script>
<style lang='scss' scoped>
@import "../../styles/config.scss";
.label-warp {
  &.category {
    @include labelDom(left, 60, 40);
  }
}
label{
    line-height:40px;
}
</style>