import { reactive, ref, watch,toRefs } from '@vue/composition-api';
import  {GetAddress }  from "../../../api/common"

export  function  selectAdd(){

const data  = reactive({
    provinceValue: "",
    cityValue: "",
    areaValue: "",
    streetValue: "",
    provinceData: [],
    cityData: [],
    areaData: [],
    streetData: []
})

const resultData = reactive({
    provinceValue: "",
    cityValue: "",
    areaValue: "",
    streetValue: "",
})

/* 获取省份 */
const getProvince = () => {
    getData({ type: "province" });
}
/**
 * 选择省份，获取城市
 */
const handlerProvince = (val) => {
    console.log(val)
    console.log(data.provinceValue)
     reset({type:"city"})
    getData({ type: "city", province_code: val });
}
/**
 * 选择城市，获取区县
 */
const handlerCity = (val) => {
    reset({type:"area"}) 
    getData({ type: "area", city_code: val });
}
/**
 * 选择区县，获取街道
 */
const handlerArea = (val) => {
    reset({type:"street"})
    getData({ type: "street", area_code: val });
}
/**
 * 选择街道
 */
const handlerStreet = (val) => {
    reset({type: ""})
}

 const  getData = (requestData)=>{
       GetAddress(requestData).then((response)=>{
          
          
                data[`${requestData.type}Data`] =response.data.data
            
       })
 }
const reset =(params) =>{
         const selectData ={
            city: ['cityValue', 'areaValue', 'streetValue'],
            area: ['areaValue', 'streetValue'],
            street: ['streetValue']
         }
         
         const arrObj = selectData[params.type];
         // 清空指定的key值
         if(arrObj) { arrObj.forEach(item => data[item] = '')
}
  result()
}
const result = () => {
    for(let key in resultData)(
        resultData[key] = data[key]
    )
}
//省市选择

return{
         data,
         resultData,
         handlerArea,
         handlerCity,
         handlerProvince,
         getProvince,
         handlerStreet,
         
    }

}