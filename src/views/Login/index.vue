<template>
  <div id="login">
    <h1 class="h1">山西能源学院</h1>
    <h2 class="p">机器人创新中心</h2>
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{current:item.current}"
          @click="toggle(item)"
          v-for="(item,index) in menu"
          :key="index"
        >{{item.title}}</li>
      </ul>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pwd" class="item-form">
          <label for>密码</label>
          <el-input
            type="text"
            v-model="ruleForm.pwd"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pwds" class="item-form" v-show="buttonState[0].model==='register'">
          <label for>重复密码</label>
          <el-input
            type="text"
            v-model="ruleForm.pwds"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label for>验证码</label>
          <el-row :gutter="10" class="row">
            <el-col :span="16">
              <el-input v-model="ruleForm.code" minlength="6" maxlength="20"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button
                :disabled="buttonState[2].vCodeState"
                type="success"
                class="block"
                @click="getSms()"
              >{{buttonState[2].text}}</el-button>>
            </el-col>
          </el-row>
        </el-form-item>
        <!--                                     -->
        <el-form-item class="form-btn">
          <el-button
            class="btn"
            :disabled="buttonState[1].loginState"
            type="danger"
            @click="submitForm('ruleForm')"
          >{{buttonState[0].model==='login'?'登录':'注册'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
//引入vue3.0
/* import { Message } from 'element-ui'; */
import sha1 from 'js-sha1'
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
import {
  stripscript,
  validateEmail,
  validatePass,
  validateVCode
} from "../../utils/validate";
import { GetSms, Register,Login } from "../../api/login";
export default {
  setup(prop, { refs, root }) {
    /* 验证**********************************8 */
    //验证码
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式错误"));
      } else {
        buttonState.vCodeState = false;
        callback();
      }
    };
    //密码
    var validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6到20喂数字+字母"));
      } else {
        callback();
      }
    };
    //重复密码
    var validatePwds = (rule, value, callback) => {
      if (buttonState.model=== "login") {
        callback();
      }
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== ruleForm.pwd) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    /* 验证码 */
    var checkCode = (rule, value, callback) => {
      if (validateVCode(value)) {
        return callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };
    /* 获取验证码 */
    let getSms = () => {
      if (ruleForm.username === "") {
        return root.$message.error("用户名不能为空");
      } else if (validateEmail(ruleForm.username)) {
        return root.$message.error("邮箱格式错误");
      }
      const userinfo = {
        username: ruleForm.username,
        model: buttonState.model
      };
      vUpdate({
      vCodeState:true,
      text:'发送中'
      })
      
       countDown(6);
       GetSms(userinfo)
        .then(response => {
          //修改注册按钮状态
        buttonState[0].loginState = false
          root.$message({
            message: response.message,
            type: "success"
          });
        })
        .catch(error => {
          console.log(error);
        });
    };

    const ruleForm = reactive({
      username: "1300282894@qq.com",
      pwd: "bk990126",
      code: "",
      pwds: "bk990126"
    });
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      pwd: [{ validator: validatePwd, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }],
      pwds: [{ validator: validatePwds, trigger: "blur" }]
    });
    const menu = reactive([
      { title: "登录", current: true, type: "login" },
      { title: "注册", current: false, type: "register" }
    ]);
    /*  基础数据类型（响应）***************************************************************/

    //验证码按钮状态
    const buttonState = reactive([
    {
     model:'login'
    } , 
    {
        loginState: false ,
    
    },
    {
        vCodeState: false,
        text:'获取验证码'
    }
    
    ]);
    //定时器
    const timer = ref(null);

    /* 方法***********************************************************************************/
    let toggle = item => {
     
      menu.forEach(e => {
        e.current = false;
      });
      //修改高亮
      item.current = true;
      //修改界面状态
      buttonState[0].model= item.type;
      refs["ruleForm"].resetFields();
      vUpdate({
        vCodeState:false,
        text:'获取验证码'
      })
      //清除定时器
      clearTime()
    };

    //更新验证码状态
    let vUpdate =(params)=>{
         buttonState[2].vCodeState = params.vCodeState,
         buttonState[2].text = params.text
    }
    //注册
    let submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          buttonState[0].model === "login" ? login() : register()
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    //登录
    let login = () => {
      const LoginData = {
        username: ruleForm.username,
        password: sha1(ruleForm.pwd),
        code: ruleForm.code
      }
     console.log( '1')
      root.$store.dispatch('app/login',LoginData)
        .then(response => {
          root.$message({
            message: response.message,
            type: "success"
          });
            clearInterval(timer.value);
            root.$router.push({
              name:'Console'
            })
        })
        .catch(error => {
          console.log(error);
        });
    };
    //注册
    let register = () => {
      const RegisterData = {
        username: ruleForm.username,
        password: sha1(ruleForm.pwd),
        code: ruleForm.code
      };
      Register(RegisterData)
        .then(response => {
          root.$message({
            message: response.message,
            type: "success"
          });
          clearInterval(timer.value);
          toggle(menu[0]);
        })
        .catch(error => {
          console.log(error);
        });
    };
  //计时器
    let countDown = time => {
       if (timer) {
   clearInterval(timer.value);
 }
      timer.value = setInterval(() => {
        if (time === 0) {
          clearInterval(timer);
          vUpdate({
            vCodeState:false,
            text:'重新获取'
          })
        } else {
           vUpdate({
        vCodeState:true,
        text:`倒计时(${time})`
         })
          time--;
        }
      }, 1000);
    };
    //清除计时器
    let clearTime =()=>{
      clearInterval(timer.value)
    }
    onMounted(() => {});

    return {
      menu,
      ruleForm,
      rules,
      toggle,
      submitForm,
      getSms,
      buttonState,
      timer
    };
  }
};
</script>
<style lang="scss" scoped>
#login:before {
  display: table;
  content: "";
}
#login {
  height: 100vh;
  width: 100vw;
  background:url(../../img/bg.jpg) ;
   background-size: cover;
  .p {
    letter-spacing: 8px;
    color: #42b983;
    font: 24px georgia;
    margin: 20px auto;
    text-align: center;
  }
  .h1 {
    letter-spacing: 12px;
    color: #42b983;
    font: 30px georgia;
    margin-top: 90px;
    text-align: center;
  }
  .login-wrap {
    width: 330px;
    margin: 0px auto;

    .menu-tab {
      text-align: center;
      li {
        width: 88px;
        line-height: 36px;
        display: inline-block;
        border-radius: 2px;
        color: #ffffff;
        font-size: 14px;
        cursor: pointer;
        margin: 0px 20px;
      }
      .current {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    .login-form {
      width: 100%;
      .item-form {
        margin-top: 10px;
        color: rgb(121, 186, 190);
      }
      .form-btn {
        .btn {
          margin-top: 20px;
          width: 100%;
          display: block;
        }
      }
    }
  }
}
</style>