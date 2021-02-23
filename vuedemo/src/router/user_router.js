//用户模块 login reg forget
export default [
	{
		path: "/reg",
		component: () => import(/*webpackChunkName:'reg'*/'@/views/user/reg.vue')
	},
	{
		path: "/login",
		component: () => import(/*webpackChunkName:'login'*/'@/views/user/login.vue')
	},
	{
		path: "/forget",
		component: () => import(/*webpackChunkName:'forget'*/'@/views/user/forget.vue')
	}
]