<!-- reg 注册 -->
<template>
  <div>
    <h1 class="reg_title">欢迎注册</h1>
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
				<a-form-model-item label="再次输入密码">
          <a-input-password v-model="form.secondPwd" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit"> 注册 </a-button>
          <a-button style="margin-left: 10px"> 重置 </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import * as user from '@/api/user'
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        userName: "",
        passWord: "",
				secondPwd: ""
      },
    };
  },

  mounted() {

	},

  methods: {
		 async onSubmit() {
			try {
				await user.userReg(this.form);
				this.$message.success('注册成功，去登录！');
				setTimeout(()=>{
					this.$router.push('/login')
				},1000)
			} catch (error) {
				console.log(error,'reg error')
				this.$message.error(error);
			}
			
    },
	},
};
</script>
<style lang='scss' scoped>
.reg_title {
  margin: 20px auto;
  text-align: center;
}
</style>