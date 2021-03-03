//用户模块 login reg forget
export default [
	{
		path: "/reg",
		name:'reg',
		component: () => import(/*webpackChunkName:'reg'*/'@/views/user/reg.vue')
	},
	{
		path: "/login",
		name: 'login',
		component: () => import(/*webpackChunkName:'login'*/'@/views/user/login.vue')
	},
	{
		path: "/forget",
		name:'forget',
		component: () => import(/*webpackChunkName:'forget'*/'@/views/user/forget.vue')
	}
]