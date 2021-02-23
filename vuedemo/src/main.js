import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/antui' //ant 局部组件引入
import 'ant-design-vue/dist/antd.css'; //引入ant样式
import './scss/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
