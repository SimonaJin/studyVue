import Vue from 'vue'
import Vuex from 'vuex'
import rootModule from './rootModule'
Vue.use(Vuex);

const files = require.context('./modules', false, /\.js$/);


files.keys().forEach(key => {
	const store = files(key).default;
	let moudeleName = key.replace(/^\.\//,'').replace(/^.js$/,'');
	let moudeles = rootModule.modules = (rootModule.modules || {})
	moudeles[moudeleName] = store;
	moudeles[moudeleName].namespaced = true;
});
let store = new Vuex.Store(rootModule)
export default store;
