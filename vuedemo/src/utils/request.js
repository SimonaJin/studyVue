//封装请求axios
import axios from 'axios';
import config from '../config/index'
class HttpRequest{
	constructor(){
		//可以增加实例属性 后台接口的路径 开发模式和生产模式
		this.baseURL = config.baseURL
		this.timeout = 3000; //3s后请求超时
	}
	setInterceptors(instance){
		instance.interceptors.request.use(config => {
			// 一般增加一些token属性等
			return config
		})
		instance.interceptors.response.use(res => {
			if(res.status == 200){
				// 服务器返回的结果都放入data中
				return Promise.resolve(res.data)
			}else{
				return Promise.reject(res.data.data)
			}
		},err=>{
			//单独处理其他的状态码异常
			switch(err.response.status){
				case 400:
					return Promise.reject('参数不对')
					break;
				case 401:
					return Promise.reject('没权限')
					break;
				case 501:
					return Promise.reject('没权限')
					break;
			}
			return Promise.reject(err)
		})
	}
	mergeOptions(options){
		return {baseURL:this.baseURL,timeout: this.timeout, ...options}
	}
	request(options){
		const instance = axios.create();// 创建axios实例
		this.setInterceptors(instance);
		const opts = this.mergeOptions(options)
		return instance(opts)
	}
	get(url,config){// 路径参数 
		return this.request({
			method: 'get',
			url,
			...config
		})
	}
	post(url, data,config=null){// 请求体中
		return this.request({
			method: 'post',
			url,
			data:data,
			...config
		})
	}
}
export default new HttpRequest

