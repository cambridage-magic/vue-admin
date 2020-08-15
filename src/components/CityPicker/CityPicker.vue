<!--  -->
<template>
 <div class="overflow-h">
        <el-row :gutter="10">
            <el-col :span="6" v-if="initShow.province" >
                <el-select   v-model="data.provinceValue" @change="handlerProvince">
                    <el-option v-for="item in data.provinceData" :key="item.PROVINCE_CODE" :value="item.PROVINCE_CODE" :label="item.PROVINCE_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6"  v-if="initShow.city">
                <el-select v-model="data.cityValue" @change="handlerCity">
                    <el-option v-for="item in data.cityData" :key="item.CITY_CODE" :value="item.CITY_CODE" :label="item.CITY_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6"  v-if="initShow.area">
                <el-select v-model="data.areaValue" @change="handlerArea">
                    <el-option v-for="item in data.areaData" :key="item.AREA_CODE" :value="item.AREA_CODE" :label="item.AREA_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="initShow.street"  >
                <el-select v-model="data.streetValue"  @change="handlerStreet" >
                    <el-option v-for="item in data.streetData" :key="item.STREET_CODE" :value="item.STREET_CODE" :label="item.STREET_NAME"></el-option>
                </el-select>
            </el-col>
        </el-row>
        </div>
</template>

<script>
import { reactive, ref, watch,onBeforeMount} from '@vue/composition-api';
import {selectAdd} from  "../../views/User/dialog/dialogAdd"
export default {
props:{
   cityPickerData:{
       type:Object,
       default:()=>{}
   },
   init:{
       type:Array,
       default:()=>[]
   }
},
   setup(props,{root,emit}){


  const{ 
 data,
 handlerCity,
 handlerArea,
 handlerProvince,
 handlerStreet,
 getProvince,
 resultData
 }  = selectAdd()

watch([
    ()=>resultData.provinceValue,
    ()=>resultData.cityValue,
    ()=>resultData.areaValue,
    ()=>resultData.streetValue,
   
],([province, city, area, street])=>{
 emit("update:cityPickerData",resultData)
 
})

watch(()=>{
    props.cityPickerData
},(value)=>{
})
const initShow = reactive({
    province:true,
    city:true,
    area:true,
    street:true
})

const initStatus = ()=>{
  /*  const initData = props.init */
  /*  if(initData.length){ */
  /*  initData.forEach((item)=>{ */
  /*    init[item]  = true */
  /*  })}else{ */
  /*      for(let key in init){ */
  /*        init.key = true */
  /*      } */
  /*  } */
}



onBeforeMount(()=>{
    getProvince()
    initStatus()
})
       return{
 data,
 handlerCity,
 handlerArea,
 handlerProvince,
 handlerStreet,
 getProvince,
 initShow
       }
   }
}

</script>
<style lang='scss' scoped>

</style>