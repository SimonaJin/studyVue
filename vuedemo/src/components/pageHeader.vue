<!--  -->
<template>
	<a-row type="flex" justify="space-between">
		<a-col :span="10" class="pageHeader_left">
			<img src="../assets/logo.png" alt="" class="pageHeader_logo">
			<!-- 导航 -->
			<a-menu v-model="current" mode="horizontal" class="pageMenu">
      <a-menu-item key="mail">首页</a-menu-item>
      <a-menu-item key="app"> 文章 </a-menu-item>
    </a-menu>
		</a-col>
		<a-col :span="14">
			<a-menu v-model="userCurrent" mode="horizontal" class="pageMenu">
				<a-menu-item key="login" @click="handleRouter(item, key)">登陆</a-menu-item>
				<a-menu-item key="reg"> 注册 </a-menu-item>
				<a-menu-item key="username">张三</a-menu-item>
			</a-menu>
		</a-col>
	</a-row>
</template>

<script>
export default {
	data () {
		return {
			current: ['mail'],
			userCurrent:['username']
		};
	},

	components: {},

	computed: {

	},

	mounted() {},

	methods: {}
}

</script>
<style lang='scss' scoped>

	.pageHeader_left{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		.pageHeader_logo{
			width: 80px;
			height: 100%;
			display: inline-block;
		}
	}
	
	.pageMenu{
		text-align: right;
		background-color: cornflowerblue;
		color: white;
	
	}
	.ant-menu-horizontal{
		border-bottom: none;
	}
	.ant-menu-horizontal > .ant-menu-item:hover,
	.ant-menu-horizontal > .ant-menu-submenu:hover,
		.ant-menu-horizontal > .ant-menu-submenu-active,
	.ant-menu-horizontal > .ant-menu-item-open,
	.ant-menu-horizontal > .ant-menu-submenu-open,
	.ant-menu-horizontal > .ant-menu-item-selected,
	.ant-menu-horizontal > .ant-menu-submenu-selected{
		color: white !important;
    border-bottom: 2px solid white;
	}
	.ant-menu-horizontal > .ant-menu-submenu-active,
	.ant-menu-horizontal > .ant-menu-item-open,
	.ant-menu-horizontal > .ant-menu-submenu-open,
	.ant-menu-horizontal > .ant-menu-item-selected,
	.ant-menu-horizontal > .ant-menu-submenu-selected{
		font-size: 18px;
	}
</style>