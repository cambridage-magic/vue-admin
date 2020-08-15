<!--  -->
<template>
<div>
  <el-row :gutter="20">
    <el-col :span="4">
      <div class="label-warp category">
        <label for>类型:</label>
        <div class="warp-content">
          <el-select v-model="categoryValue" placeholder="请选择" style="width:100%;">
            <el-option
              v-for="item in options.category"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
    </el-col>
    <el-col :span="7">
      <div class="label-warp date">
        <label for>日期:&nbsp;&nbsp;</label>
        <div class="warp-content">
          <el-date-picker
            style="width:100%;"
            v-model="dateValue"
            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']"
          ></el-date-picker>
        </div>
      </div>
    </el-col>

    <el-col :span="3">
      <div class="label-warp key-word">
        <label for>关键字:&nbsp;&nbsp;</label>
        <div class="warp-content">
          <Select :selectValue="data.selectValue" />
        </div>
      </div>
    </el-col>

    <el-col :span="3">
      <el-input v-model="search_work" placeholder="请输入内容" style="width:100%;"></el-input>
    </el-col>

    <el-col :span="2">
      <el-button type="danger" style="width:100%;" @click="search" >搜索</el-button>
    </el-col>
    <el-col :span="3">&nbsp;</el-col>
    <el-col :span="2">
      <el-button class="pull-right" type="danger" style="width:100%;" @click="dialog_info = true">新增</el-button>
    </el-col>
  </el-row>
 
  <!-- 表格数据 -->
  <div class="black-space-30"></div>
  <el-table :data="tableData.item" border style="width: 100%"  @selection-change="handleSelectionChange">  v-loading="loading">
    <el-table-column type="selection" width="45"></el-table-column>
    <el-table-column prop="title" label="标题" width="750"></el-table-column>
    <el-table-column prop="categoryId" label="类型" width="130" :formatter= "toCategory"></el-table-column>
    <el-table-column prop="createDate" label="日期" width="237" :formatter= "toDate"></el-table-column>
  <!--   <el-table-column prop="user" label="管理员" width="115"></el-table-column> -->
    <el-table-column  label="操作" >
       <template slot-scope="scope">
        <el-button
          size="mini" @click="edit(scope.row.id)">编辑</el-button>
        <el-button
          @click="delete_item(scope.row.id)"
          size="mini"
          type="danger">删除</el-button>

            <el-button  class="margin-left-10"  @click="infoDetail(scope.row)"
     size="mini" >编辑详情</el-button> 
         
     
      </template>
    </el-table-column>
  </el-table>
  <div class="black-space-30"></div>
  <!-- 底部分页 -->
  <el-row>
  <el-col :span="12"> <el-button size="mini" @click="delete_select" >批量删除</el-button></el-col>
  <el-col :span="12">  
     <el-pagination class="pull-right"
     @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10,20,30,40]"
     background
    layout="total, prev, pager, next,jumper,sizes"
    :total="page.total">
  </el-pagination></el-col>
</el-row>
<!-- 新增弹窗 -->
<DialogInfo :flag.sync ="dialog_info " :category ="options.category"/>
<!-- 编辑弹窗 -->
<DialogInfoEdit :flag.sync ="dialog_info_edit " :category ="options.category" :id="EditID" @getInfoList="getInfoList"/>
</div>
</template>

<script>
import { reactive, ref, isRef, toRefs,watch,onMounted } from "@vue/composition-api"
import { global,common } from "@/utils/global_V3.0";
import DialogInfo from "./dialog/info"
import DialogInfoEdit from "./dialog/edit"
import Select from "../../components/Select/Select"
import {GetInfoList,DeleteInfoItem} from  "../../api/news"
import {format}  from "../../utils/common"
export default {
  components:{
   DialogInfo,
   DialogInfoEdit,
   Select
  },
  setup(props,{root}) {
    const { str: aaa, confirm } = global();
    const { Catedata ,getCategroy} =common();
    const options = reactive({
      category:[
    ]
    }
    );
     const data = reactive({
     selectValue:['id','title']
 })
    const tableData =reactive({
      item:[
      
      ]})
    const  EditID = ref('')
    const  CId  = ref([])       
    const loading = ref(false)
    const dialog_info = ref(false)
    const dialog_info_edit = ref(false)
    const categoryValue = ref("");
    const dateValue = ref("");
    const search_key = ref("");
    const search_work = ref("");
    const page = reactive({
      size:10,
      number:1,
      total:0
    })  
   /* 
   生命周期
   */
  onMounted(()=>{
     getCategroy()
     getInfoList()
  })
  watch(()=>Catedata.item,(value)=>{
        options.category =value
      
  })



 /*事件*/
let  handleSelectionChange  =(val)=>{
     let  id =  val.map((item)=>item.id )
    CId.value = d
  
} 

//传参
  const infoDetail =(data)=>{

     root.$store.commit("infoDetail/UPDATE_STATE_VALUE", {
                id: {
                    value: data.id,
                    sessionKey: "infoId",
                    session: true
                },
                title: {
                    value: data.title,
                    sessionKey: "infoTitle",
                    session: true
                }
            });
           root.$router.push({
                name: "InfoDetail",
                params: {
                    id: data.id, 
                    title: data.title
                }
            })        
  }

//筛选条件
 const formatData = () => {
            let requestData = {
                pageNumber:page.number,
                pageSize:page.size
            };
            // 分类ID
            if(categoryValue.value) { requestData.categoryId = categoryValue.value }
            // 日期
            if(dateValue.value.length > 0) {
                requestData.startTiem =dateValue.value[0]
                requestData.endTime = dateValue.value[1]
            }
            // 关键字
            if(search_work.value) { requestData[search_key.value] = search_work.value; }
            return requestData;
        }

/* 获取信息列表 */
const getInfoList =()=>{

loading.value = true
   let requestData = formatData()
     GetInfoList(requestData)
     .then((response)=>{ 
       console.log(response)
       tableData.item = response.data.data
       page.total = response.data.total
       loading.value = false
     }).catch((error)=>{
        loading.value = false
     })
 }
  //搜索
   let   search =() =>{
     getInfoList()
  
   }

  /* 删除 */
  let delete_item =(Id) =>{
     CId.value = [Id]
    confirm({
      content:'确认删除',
      tip:'提示',
      type:'warning',
      fn:confirm_item
    })
  }

    /* 删除选中 */
    let delete_select =()=>{
          if(!CID.value||CId.value.length==0){
         root.$message({
         message:'请选中',
          type:'warning'
  })
  return false
    }
    confirm({
   content:'确认删除选中',
   tip:'提示',
   type:'warning',
   fn:confirm_item
 })
    }

    //编辑
    const edit =(id) =>{
      dialog_info_edit.value = true
      EditID.value = id
    }
    /* ****************************** */
   let confirm_item = () =>{
      DeleteInfoItem({id:CId.value}).then((response)=>{
        root.$message({
          message:response.message,
          type:'success'
        })
      })
       getInfoList()
   }

  /* 切换页码 */    
  let  handleSizeChange = (val)=> {
      page.size= val
       console.log(`每页 ${val} 条`);
     }
  let handleCurrentChange=(val)=> {
      page.number  = val
      getInfoList()
       console.log(`当前页: ${val}`);
     }
/* 格式化日期 */
let toDate = (row, column, cellValue, index)  =>{
  return format(row.createDate)
}
/* 格式化类别 */
let toCategory = (row, column, cellValue, index)  =>{
             let categoryId = row.categoryId;
            let categoryData = options.category.filter(item => item.id == categoryId)[0];
            if(categoryData){
             return categoryData.category_name;
            }
           
}

    return {
      options,
      categoryValue,
      dateValue,
      data,
      search_key,
      search_work,
      tableData,
      page,
      loading,
      CId,
     EditID,
     dialog_info_edit,
      /* 方法 */
      handleSizeChange,
      handleCurrentChange,
      dialog_info,
      delete_item,
      delete_select,
      getInfoList,
      toDate,
      toCategory,
      handleSelectionChange,
      search,
      edit,
      infoDetail
      
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../styles/config.scss";
.label-warp {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.key-word {
    @include labelDom(right, 100, 40);
  }
}
</style>