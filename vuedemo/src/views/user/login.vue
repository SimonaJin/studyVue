<!-- login 登陆 -->
<template>
	<div>
    <h1 class="reg_title">欢迎登录</h1>
    <div class="reg_wrapper">
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="用户名">
          <a-input v-model="form.userName" />
        </a-form-model-item>
        <a-form-model-item label="输入密码">
         <a-input-password placeholder="input password"  v-model="form.passWord"/>
        </a-form-model-item>
				<a-form-model-item label="验证码" class="disFlex">
          <a-input v-model="form.smsCode"  style="width:100px"/>
					<div class="smscode_box">
						<div v-html="verify" @click="getCaptcha"></div>
						<a>忘记密码？</a>
					</div>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit"> 登录 </a-button> </a-button>
          <a-button style="margin-left: 10px"> 重置 </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import {v4} from 'uuid';
import { getLocal, setLocal } from '@/utils/localstorage';
import * as apipublic from '@/api/public';

import {createNamespacedHelpers} from 'vuex';
let {mapActions} = createNamespacedHelpers('user');
import * as types from "../../store/action-types";

export default {
	data () {
		return {
			labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        userName: "",
        passWord: "",
				smsCode: "",
      },
			verify:""
		};
	},
	created(){
		this.uid = getLocal('uuid');
		if(!this.uid){
			setLocal('uuid', v4());
		}
			//获取验证码
		this.getCaptcha()
	},
	mounted() {

	},

	methods: {
	...mapActions([types.USER_LOGIN]),
	//获取验证码
	async getCaptcha(){
		let data = await apipublic.getCaptcha();
		this.verify= data.data
	},
		// 登录
	async onSubmit() {
			
				if(!this.uid && getLocal('uuid')){
					this.uid = getLocal('uuid');
				}else {
					setLocal('uuid', v4());
				}
			try {
				this[types.USER_LOGIN]({...this.form, uid:this.uid}).then(res =>{
					this.$message.success('登录成功！');
					setTimeout(()=>{
						this.$router.push('/')
					},1000)
				}).catch(err=>{
					this.$message.error(err.message);
				});				
			} catch (error) {			
				this.$message.error(error);
			}
			
    }
	}
}

</script>
<style lang='css' scoped>
.reg_title {
  margin: 20px auto;
  text-align: center;
}
.disFlex >>> .ant-form-item-children,.smscode_box{
	display: flex;
	align-items: center;
}
.smscode_box{
	justify-content: space-between;
	width: 100%;
}
.login_smscode{
	cursor: pointer;
	margin-left: 15px;
}
</style>