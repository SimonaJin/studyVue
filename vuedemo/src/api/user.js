import config from './config/user';
import axios from '../utils/request'

// 注册
export const userReg = (options) => axios.post(config.reg,options);
// 登录 权限 +用户信息 全局数据 vuex
export const userLogin = (options) => axios.post(config.login,options);
// token 验证
export const userValidate = () => axios.get(config.validate);