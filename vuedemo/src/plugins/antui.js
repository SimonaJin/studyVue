import Vue from 'vue';
import {Layout, Button, Row, Col, Menu, Carousel} from 'ant-design-vue';
const components = { Layout, Button, Row, Col, Menu, Carousel }

Object.entries(components).forEach(([key,component]) => {
	Vue.use(component)
})
