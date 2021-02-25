import Vue from 'vue';
import {Layout, Button, Row, Col, Menu, Carousel, FormModel, Input, message} from 'ant-design-vue';
const components = { Layout, Button, Row, Col, Menu, Carousel, FormModel, Input, message}

Object.entries(components).forEach(([key,component]) => {
	Vue.use(component)
})
Vue.prototype.$message = message