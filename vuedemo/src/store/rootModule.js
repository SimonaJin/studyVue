import { getSlider } from '../api/public.js';
import * as types from './action-types';//存放所有方法的类型，为了直观看到哪些方法调用
import WS from '@/utils/websocket.js';
//console.log(types)
export default {
    state: {
      sliders: [],
			ws:null,
      message:''
    },
    mutations: {
        [types.SET_SLIDERS](state, payload) {
            state.sliders = payload;
				},
				[types.CREATE_WEBSOCKET](state, ws){
					state.ws = ws;
				},
				[types.SET_MESSAGE](state,msg){//存放msg信息
					state.message = msg
				}
		},
    actions: {
      //调用getSlider()的api
        async [types.SET_SLIDERS]({ commit }) {
            let data = await getSlider();
            commit(types.SET_SLIDERS, data)
        },
				async [types.CREATE_WEBSOCKET]({ commit }){
					let ws = new WS();
					ws.create();
					commit(types.CREATE_WEBSOCKET,ws);
				}
    }
}