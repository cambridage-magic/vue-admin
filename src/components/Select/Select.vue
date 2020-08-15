<!-- 
 -->
<template>
 <el-select v-model="data.slectValue"   @change="select" placeholder="请选择" style="width:100%;">
    <el-option
v-for="item in data.initOptions"
:key="item.value"
:label="item.label"
:value="item.value"
    ></el-option>
  </el-select>



</template>

<script>
import { reactive, ref, isRef, toRefs,watch,onMounted } from "@vue/composition-api"
export default {
    props:{
     selectValue:{
         type:Array,
         default:()=>[]
     },
     selectData:{
         type:Object,
         defalult:()=>{}
     }
    },
     setup(props,{root,emit}){
    const data = reactive({
    slectValue:"",
    initOptions:[],
    options:[
                { value: "truename", label: "姓名" },
                { value: "phone", label: "手机号" },
                { value: "username", label: "邮箱" },
                { value: "id", label: "ID" },
                { value: "title", label: "标题" },
         ]

        
 })

 onMounted(()=>{
filter()
 })
  //选择
   const select =(val)=>{
       let filterData = data.options.filter(item=>item.value == val)[0]
       emit("update:selectData",filterData)
   }

 //遍历数据
   const filter =()=>{
       let initArr = []
       props.selectValue.forEach( item=>{
        let arr = data.options.filter((elem)=>{
              return    item === elem.value
          })
          initArr.push(arr[0])
       })
       data.initOptions = initArr
   }
    return{
        data,
        select
    }
}
}

</script>
<style lang='scss' scoped>

</style>