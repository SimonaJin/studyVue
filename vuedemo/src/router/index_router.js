// 公共模块路由
export default [
	{
		path: "/",
		name: 'home',
		component: () => import(/*webpackChunkName:'home'*/'@/views/home.vue')
	},
	{
		path: "/manager",
		name:'manager',
		component: () => import(/*webpackChunkName:'manager'*/'@/views/manager/index.vue'),
		meta:{
			needLogin: true
		}
	},
	{// 这个*会被处理到当前所有路由的最后面
		path: "*",
		component: () => import(/*webpackChunkName:'404'*/'@/views/404.vue')
	}
]