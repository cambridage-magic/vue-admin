import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import app  from  './modules/app.js'
import infoDetail  from './modules/infoDetail'
import common from './modules/common'
import   promission  from './modules/promission.js'
export default new Vuex.Store({
  
  modules:{
    app,
    infoDetail,
    common,
    promission
  }
  
})
