import { getSlider } from '../api/public.js';
import * as types from './action-types';//存放所有方法的类型，为了直观看到哪些方法调用

//console.log(types)
export default {
    state: {
        sliders: [],
    },
    mutations: {
        [types.SET_SLIDERS](state, payload) {
            state.sliders = payload;
				}
		},
    actions: {
      //调用getSlider()的api
        async [types.SET_SLIDERS]({ commit }) {
            let data = await getSlider();
            commit(types.SET_SLIDERS, data)
        }
    }
}