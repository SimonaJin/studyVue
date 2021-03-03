//websocket 可以实现双向通信 长链接 H5提供的 可以实时通信
import {
	getLocal
} from '@/utils/localstorage'
class WS {
	constructor(config = {}) {
		this.url = config.url || 'localhost';
		this.port = config.port || 3001;
		this.protocol = config.protocol || 'ws';
		//心跳检测
		this.time = config.time || 30 * 1000;
		this.ws = null;
	}
	onOpen = () => {
		//鉴权
		// 规定好 发的必须是对象，对象里面包含两个字段 type data
		// websocket 是基于tcp 第一次连接靠的是http 但是不能修改header
		this.ws.send(JSON.stringify({
			type: 'auth',
			data: getLocal('token')
		}))
	}
	onMessage = (e) => {
		let {
			type,
			data
		} = JSON.parse(e.data);

		switch (type) {
			case 'noAuth':
				console.log('没有权限');
				break;
			case 'heartCheck':
				this.checkServer(); //触发检查服务器的方法，为了防止断线
				this.ws.send(JSON.stringify({
					type: 'heartCheck'
				}));
				break;
			default: //默认情况下时提交消息
				store.commit(types.SET_MESSAGE, data);
		}
	}
	onClose = () => {
		this.ws.close();
	}
	onError = () => {
		setTimeout(() => {
			this.create(); //重新调用create方法 连线的 
		}, 1000);
	}
	checkServer(){//服务器回应
		clearTimeout(this.timer); // 防抖
		this.timer = setTimeout(() => {
				this.onClose();
				this.onError();
		}, this.time + 1000); //断线重连
	}
	create() {
		this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`);
		this.ws.onOpen = this.onOpen;
		this.ws.onMessage = this.onMessage;
		this.ws.onClose = this.onClose;
		this.ws.onError = this.onError;
	}
	send= (msg)=>{
		this.ws.send(JSON.stringify(msg))
	}
}
export default WS;