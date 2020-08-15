<!--  -->
<template>
<div>
 <el-table :data="data.table" style="width: 100%"  @selection-change="handleSelectionChange">
    <el-table-column  v-if="data.tableHead.selectState" type="selection"   width="55">
    </el-table-column>
     <template v-for="item in data.tableHead.thead">  
     <el-table-column v-if="item.columnType==='slot'"  :key="item.field" :prop="item.field" :label="item.label" :width="item.width">
       <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
  </el-table-column>
      <el-table-column v-else :key="item.field" :prop="item.field" :label="item.label" :width="item.width"></el-table-column>
     </template>
    </el-table>
    <div class="table-footer">
        <el-row>
    <el-col :span="4">
    <slot name="tableFooterLeft"></slot>
    </el-col>
<el-col :span="20">
 <el-pagination
  class="pull-right"
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="pageData.currentPage"
  :page-sizes="[19, 20, 30, 40]"
  layout="total, sizes, prev, pager, next, jumper"
  :total="pageData.total">
</el-pagination>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script>
import { reactive, ref, isRef, toRefs,watch,onMounted,onBeforeMount,onUpdated} from "@vue/composition-api"
import {loadTable}  from "../../utils/global_V3.0"
import {pagenation} from "./pagenation"
export default {
     props:{
     tableHead:{
         type:Object,
         default:()=>{}
     },
     selectTable:{
         type:Object,
         default:()=>{}
     }
     },
     setup(props,{root,emit}){
     const{handleCurrentChange,handleSizeChange,pageData,totalCount} =pagenation()
      const  { getUserList,tableData}  = loadTable()
         const data =reactive({
            tableHead:{
                thead:[],
                selectState:true,
                requestData:{},
                recordCheckbox:false,

            },
             table:[  
             ]
         })
   onBeforeMount(()=>{
       initTable()
       getUserList(data.tableHead.requestData)
   })
  watch([()=>tableData.item,()=>tableData.total],([tableDataI,tableTotal])=>{
        data.table = tableDataI
        totalCount(tableTotal)
  })
   watch([
            () => pageData.currentPage,
            () => pageData.pageSize
        ], ([currentPage, pageSize]) => {
            let requestData = data.tableHead.requestData;
            
            if(requestData.requestInfo) {
                requestData.requestInfo.pageNumber = currentPage;
                requestData.requestInfo.pageSize = pageSize;
                 getUserList(data.tableHead.requestData);
            }
        })

  // 刷新数据
        const refreshData = () => {
            getUserList(data.tableHead.requestData);
        }
 //带参数刷新数据
   const refreshParams =(params) =>{
       let requestData = Object.assign({},params,{
           pageNumber:1,
           pageSize:10
       })
       console.log('requestData')
       
       data.tableHead.requestData.requestInfo = requestData
       getUserList(data.tableHead.requestData)
       
   }
   const initTable =()=>{
        let thead = props.tableHead
        //得到json对象的属性
        let keys =  Object.keys(data.tableHead)
        for( let key in thead){
         if(keys.includes(key)){
             data.tableHead[key] = thead[key]
         }
        }
   }
   //选项更改时触发
   const handleSelectionChange = (selectData) =>{
      let  idItems  =  selectData.map(item=>item.id)
     
      emit("update:selectTable",{idItems})
    
   }
         return{
             data,
             pageData,
             handleCurrentChange,
             handleSizeChange,
             handleSelectionChange,
             refreshData,
             refreshParams
         }
     }
}

</script>
<style lang='scss' scoped>

</style>