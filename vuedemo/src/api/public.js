import config from './config/public';
import axios from '../utils/request'

// 获取轮播图功能
export const getSlider = () => axios.get(config.getSlider);
//调用接口有两种方式
//1.在页面中直接调用
//2.vuex 获取数据 --actions  <=选择
//用第二种的好处：数据是全局的，复用性高，做缓存功能