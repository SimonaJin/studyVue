import router from '.';
import store from '../store';
import * as types from '../store/action-types';
//校验用户登录权限
const loginPermission = async function (to, from, next) {
	let result = await store.dispatch(`user/${types.USER_VALIDATE}`);
	// 根据 meta 来判断是否登录过
	let needLogin = to.matched.some(item => item.meta.needLogin);
	if(!store.state.user.hasPermission){
		// 没登录过 
		if(needLogin){
			//但是需要登录
			if(result){//已登录过
				next();
			}else{
				next({ name: 'login' });
			}
		}else{
			//不需要权限
			next();
		}
	}else{
		// 登录过 访问登录页面 跳转到首页
		if(to.name === 'login'){
			next({ name: 'home' });
		}else{
			next();
		}
	}
		next();
}

// 路由权限动态添加
export const menuPermission = async function(to, from, next) {
	if(store.state.user.hasPermission){//已登录
		if(!store.state.user.menuPermission){// 没有获取菜单先获取
			// 添加路由完成，但是是属于异步加载，不会立即更新
			store.dispatch(`user/${types.ADD_ROUTE}`);
			//replace 相当于replaceState替换掉并不进入历史记录 把路径添加完全
			next({ ...to, replace: true }); // 如果是next()时，进入到页面时报404
		}else{
			next();
		}
	}else{
		next();
	}
}

export const createWebSockect = async function (to, from, next) {
	//先判断登录
	if(store.state.user.hasPermission && !store.state.ws){//调用创建ws方法
		store.dispatch(`${types.CREATE_WEBSOCKET}`);
		next();
	}else{//登录了并且创建ws
			next();
	}
}
export default {
	loginPermission,
	menuPermission,
	createWebSockect
}
