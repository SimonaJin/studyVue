export default [
	{
		path: "/article",
		name: "article",
		component: () => import(/*webpackChunkName:'article'*/'@/views/article/article.vue'),
		meta:{
			needLogin: true
		}
	}
]