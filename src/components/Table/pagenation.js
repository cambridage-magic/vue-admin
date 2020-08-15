import { reactive} from "@vue/composition-api"

export function pagenation () {
  const  pageData  = reactive({
        total:'',
        currentPage:1,
        pageSize:'',
    })
   let handleSizeChange = (val)=> {
    console.log(`每页 ${val} 条`);
    pageData.pageSize = val
  }
   let  handleCurrentChange = (val)=> {
    console.log(`当前页: ${val}`);
    pageData.currentPage = val
  }
   let totalCount = (val) => pageData.total = val;
  return{
      pageData,
      handleCurrentChange,
      handleSizeChange,
      totalCount
  }

}