<template>
    <el-dialog title="新增" :visible.sync="data.dialog_info_flag" @close="close" width="580px"  @opened="openDialog" >
        <el-form :model="data.form" ref="addInfoForm">
            <el-form-item label="用户名：" :label-width="data.formLabelWidth" prop="username">
              <el-input     v-model="data.form.username" placeholder="请输入邮箱" ></el-input>
            </el-form-item>
            <el-form-item label="姓名：" :label-width="data.formLabelWidth" prop="truename">
                <el-input v-model="data.form.truename" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="密码：" :label-width="data.formLabelWidth" prop="password">
                <el-input v-model="data.form.password" placeholder="请输入6~20数字+字母" ></el-input>
            </el-form-item>
            <el-form-item label="手机号：" :label-width="data.formLabelWidth" prop="phone">
                <el-input  v-model="data.form.phone" placehoder="请输入手机号"></el-input>
            </el-form-item>
           <el-form-item label="地区：" :label-width="data.formLabelWidth" prop="region">
          <CityPicker   :cityPickerData.sync="data.cityPickerData"  :initData="['province','city','area','street']" /> 
            </el-form-item>
             <el-form-item label="是否启用：" :label-width="data.formLabelWidth" prop="status">
                <el-radio v-model="data.form.status" label="1">禁用</el-radio>
                <el-radio v-model="data.form.status" label="2">启用</el-radio>
            </el-form-item>
            <el-form-item label="系统：" :label-width="data.formLabelWidth" prop="role">
               <el-checkbox-group v-model="data.form.role"  >
    <el-checkbox  @change="handChange"  v-for="item in data.roleMenu" :label="item.role" :key="item.role"> {{item.name}}</el-checkbox>
  </el-checkbox-group>   
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" :loading="data.submitLoading" @click="submit('addInfoForm')">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>

import { reactive, ref, watch } from '@vue/composition-api';
import CityPicker  from "../../../components/CityPicker/CityPicker.vue"
import  {GetSystem,Adduser, EditUser,GetUser,}  from  "../../../api/user"
import sha1 from 'js-sha1'
export default {
    name: 'dialogInfo',
    props: {
        flag: {
            type: Boolean,
            default: false
        },
        category: {
            type: Array,
            default: () => []
        },
        id: {
            type: String,
            default: ""
        },
         userData:{
             type:Object,
             default:()=>{}
         }
    },
   components:{
CityPicker
   } ,
    setup(props, { emit, root, refs }){

        /**
         * 数据
         */

        const data = reactive({
            dialog_info_flag: false,  // 弹窗标记
            formLabelWidth: '100px',
            cityPickerData:{},
            form:{
                username: "",
                truename: "",
                password: "",
                phone: "",
                region: "",
                status: "2",
                role:[],
               /*  btnPerm: [] */
            },
            //角色菜单
             roleMenu:[],
            // 分类下拉
            categoryOption: [],
            // 按钮加载
            submitLoading: false
        });
      

watch(()=>props.flag,(value)=>{
     data.dialog_info_flag = value
})
        const close = () => {
           data.dialog_info_flag = false
            emit("update:flag",false)
        }
//弹窗打开动画结束时，请求用户角色
 const openDialog = ()=>{
    /*  getSystem() */
         getUser()
  let editData = props.userData

  if(editData.id){//编辑
    editData.role = editData.role.split(',');
    for(let key in editData){
      //id有的时候直接赋值否则为空
      data.form[key] = editData.id ? editData[key] : ""
     
  }
  }else{  //删除添加用户时产生的id
      data.form.id && delete data.form.id
  }
  
  
 }
//获取用户系统
const getSystem= ()=>{
 GetSystem().then((response)=>{
     data.roleMenu = response.data 
 })
}
//获取用户角色
const getUser =()=>{
    GetUser().then((response)=>{
        data.roleMenu = response.data
    })
}
//清除地址
const resetForm = ()=>{
   
    data.cityPickerData = {}
}
  const submit = (addInfoForm) => {
    let requestUserData  = Object.assign({},data.form) 
    console.log('role')
  console.log(data)

          requestUserData.role = requestUserData.role.join()
          requestUserData.region  =  JSON.stringify(data.cityPickerData)
          console.log(requestUserData)
            if(!data.form.username) {
                root.$message({
                    message: '用户名不能为空！！',
                    type: 'error'
                })
                return false;
            }
   //添加状态，需要密码，并且加密
   //编辑状态，值存在，需要密码，并且加密码，负责删除
            data.submitLoading = true
            if(requestUserData.id){
              if(requestUserData.password)
              {   
              requestUserData.password = sha1(requestUserData.password) 
              }
             else{
                 delete requestUserData.password 
              }
           editUser(requestUserData)
          }
           else{
               requestUserData.password = sha1(requestUserData.password)
                addUser(requestUserData)
            }
           
        }
       const handChange = (val) =>{
   
   
       }
        //添加用户
        const addUser =(requestUserData)=>{
            console.log('添加')
      Adduser(requestUserData).then(response => {
                root.$message({
                    message: response.message,
                    type: 'success'
                })
                data.submitLoading = false
                /**
                 * 两种刷新数据方式
                 * 1、暴力型，直接刷新接口
                 * 2、返回列表，手动修改指定的数据
                 */
               
                // 重置表单
              
               resetForm()
               refs[addInfoForm].resetFields(); 
               
            }).catch(error => {
                data.submitLoading = false
            })
        }
        
       //编辑用户
       const editUser =(requestUserData)=>{
            console.log('编辑')
            console.log(requestUserData)
             data.submitLoading = false
            EditUser(requestUserData).then(response => {
                root.$message({
                    message: response.message,
                    type: 'success'
                })
               
                /**
                 * 两种刷新数据方式
                 * 1、暴力型，直接刷新接口
                 * 2、返回列表，手动修改指定的数据
                 */
               
                // 重置表单
               
               resetForm()
               refs[addInfoForm].resetFields(); 
               
            }).catch(error => {
                data.submitLoading = false
            })
       }
        return {
            data,
            // methods
            close, submit,openDialog,
            handChange,
            
        }
    }
}
</script>
<style scoped>

</style>