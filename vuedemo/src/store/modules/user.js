import * as user from '@/api/user';
import * as types from '../action-types';
import { setLocal, getLocal} from '@/utils/localstorage';
import router from '@/router'
import per from '@/router/per.js';

//过滤路由
const filterRouter = (authList)=>{//过滤路由的方法
  	//conosle.log(authList);//后端返回的数据中auth属性是进行权限鉴定的 
    let auths = authList.map(auth=>auth.auth);//获取到auths的名称进行筛选
    function filter(routes){
        return routes.filter(route=>{
	
            if(auths.includes(route.meta.auth)){//auths匹配上的就会有相对应的菜单
                if(route.children){//如果有娃儿的话就继续匹配
                    route.children = filter(route.children )
                }
                return route;
            }
        })
    }
    return filter(per)
}
export default {
	state:{
		userInfo: {}, //用户信息
		hasPermission: false, //代表用户权限
		menuPermission: false,//代表菜单权限
	},
	mutations:{
		[types.SET_USERINFO](state, userInfo){//用户信息
			state.userInfo = userInfo;
			if(userInfo && userInfo.token){
				setLocal('token',userInfo.token)
			}else{
				localStorage.removeItem('token');
			}
		},
		[types.SET_PERMISSION](state, has){// 是否登录
			state.hasPermission = has
		},
		[types.SET_MENU_PERMISSION](state, munePre){// 路由权限
			state.menuPermission = munePre
		},
	},
	actions:{
		// 设置用户信息
		async [types.SET_USERINFO] ({commit},{payload,permission}){
			commit(types.SET_USERINFO, payload);
			commit(types.SET_PERMISSION, permission)
		},
		//登录
		async [types.USER_LOGIN]({dispatch}, payload){
			try {
				let result = await user.userLogin(payload);
				dispatch(types.SET_USERINFO, {payload:result, permission:true})
			} catch (error) {
				return Promise.reject(error)
			}
			
		},
		//验证是否登录过
		async [types.USER_VALIDATE]({dispatch}){
			if(!getLocal('token')) return false;
			try {
				let result = await user.userValidate();
				dispatch(types.SET_USERINFO, {payload: result, permission: true});
				return true;
			} catch (error) {
				dispatch(types.SET_USERINFO, {payload:{}, permission: false});
				return false;
			}
		},
		// 退出登录
		async [types.USER_LOGINOUT]({dispatch}){
			dispatch(types.SET_USERINFO, {payload:{}, permission: false});
		},
		//动态添加路由
		async [types.ADD_ROUTE]({commit,state}){
			// 后端返回的权限列表
			let authList = state.userInfo.authList;
			if(authList){
				let routes = filterRouter(authList);
			
				 // 找到manager路由作为第一级 如/manager/articleManager.vue
        //在路由的配置信息上进行查找 --- manager这一条
				let route = router.options.routes.find(item=>item.path === '/manager');
        route.children = routes; // 给manager添加儿子路由
        router.addRoutes([route]); // 动态添加进去
        commit(types.SET_MENU_PERMISSION,true); // 权限设置完毕
			}else{
				commit(types.SET_MENU_PERMISSION,false); // 权限设置完毕
			}
			
		}
	}
}
