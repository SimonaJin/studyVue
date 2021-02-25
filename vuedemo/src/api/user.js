import config from './config/user';
import axios from '../utils/request'

// 注册
export const userReg = (options) => axios.post(config.reg,options);