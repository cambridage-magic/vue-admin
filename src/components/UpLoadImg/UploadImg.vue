<!--  -->
<template>
<div>
 <el-upload
  class="avatar-uploader"
  action="http://up-z1.qiniup.com"
  :data="data.uploadKey"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</div>
</template>

<script>
import { reactive, ref, isRef, toRefs,watch,onMounted } from "@vue/composition-api"


export default {
 props:{
     imgUrl:{
         type:String,
         default:''
     },
     token:{
         type:String,
         default:''
     }
 },
  setup(props, {emit,root}){
  const data = reactive({
    image:'',
     uploadKey:{
       token:'',
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
//监听
watch(()=>props.imgUrl,(value)=>{
form.imageUrl = value
})
watch(()=>props.token,(value)=>{
 data.uploadKey.token = value   
})
onMounted(()=>{
    console.log(props)
})
//方法
const handleAvatarSuccess =(res, file)=> {
        let image =`${root.$store.getters["common/imgUrl"]}${res.key}`
        data.image = image;
        emit("update:imgUrl", image);
        console.log(form.imageUrl)
      }
 const beforeAvatarUpload =(file) => {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          root.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          root.$message.error('上传头像图片大小不能超过 2MB!');
        }
        //文件名转码
        let suffix = file.name
        let key = encodeURI(`${suffix}`)
        data.uploadKey.key = key
       
        return isJPG && isLt2M;
}
return {
    form,
    data,
     handleAvatarSuccess,
     beforeAvatarUpload,
}








  }

}

</script>
<style lang='scss' scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>