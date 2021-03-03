<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height: 100%">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
			<MyMenu></MyMenu>
      <!-- <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1" @click="handleRouter('myArticle')">
          <a-icon type="user" />
          <span >文章</span>
        </a-menu-item>
        <a-menu-item key="2" @click="handleRouter('personal')">
          <a-icon type="video-camera" />
          <span>个人中心</span>
        </a-menu-item>
      </a-menu> -->
    </a-layout-sider>
    <a-layout>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import MyMenu from '../../components/MyMenu'
export default {
	components:{MyMenu},
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
  
  },
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
</style>
