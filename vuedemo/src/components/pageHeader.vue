<!--  -->
<template>
  <a-row type="flex" justify="space-between">
    <a-col :span="10" class="pageHeader_left">
      <img src="../assets/logo.png" alt="" class="pageHeader_logo" />
      <!-- 导航 -->
      <a-menu v-model="current" mode="horizontal" class="pageMenu">
        <a-menu-item @click="handleRouter()">首页</a-menu-item>
        <a-menu-item @click="handleRouter('article')"> 文章 </a-menu-item>
      </a-menu>
    </a-col>
    <a-col :span="14">
      <template v-if="!hasPermission">
        <a-menu v-model="userCurrent" mode="horizontal" class="pageMenu">
          <a-menu-item key="login" @click="handleRouter('login')">
            登陆
          </a-menu-item>
          <a-menu-item key="reg" @click="handleRouter('reg')">
            注册
          </a-menu-item>
        </a-menu>
      </template>
      <template v-else>
        <a-menu v-model="userCurrent" mode="horizontal" class="pageMenu">
					<a-sub-menu class="pageMenu">
						<span slot="title" class="submenu-title-wrapper"><a-icon type="user" />{{ userInfo.username }}</span>
					<a-menu-item-group>
          <a-menu-item key="user:1"  @click="handleRouter('manager')">
            管理
          </a-menu-item>
          <a-menu-item key="user:2" @click="logout">
           	退出
          </a-menu-item>
        	</a-menu-item-group>
				</a-sub-menu>
          <!-- <a-menu-item key="user">{{ userInfo.username }}</a-menu-item>
          <a-menu-item key="loginOut" @click="logout"></a-menu-item> -->
        </a-menu>
      </template>
    </a-col>
  </a-row>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let { mapState, mapActions } = createNamespacedHelpers("user");
import * as types from "../store/action-types";
export default {
  data() {
    return {
      current: ["mail"],
      userCurrent: ["reg"],
    };
  },
  computed: {
    ...mapState(["hasPermission", "userInfo"]),
  },
  created() {},
  mounted() {},
  methods: {
		//页面跳转
    handleRouter(routerName) {
      if (routerName) {
				this.$router.push({name: routerName});
      } else {
        this.$router.push({name:'home'});
      }
    },
    ...mapActions([types.USER_LOGINOUT]),
    logout() {
      this[types.USER_LOGINOUT]();
    },
  },
};
</script>
<style lang='scss' scoped>
.pageHeader_left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .pageHeader_logo {
    width: 80px;
    height: 100%;
    display: inline-block;
  }
}

.pageMenu {
  text-align: right;
  background-color: cornflowerblue;
  color: white;
}
.ant-menu-horizontal {
  border-bottom: none;
}
.ant-menu-horizontal > .ant-menu-item:hover,
.ant-menu-horizontal > .ant-menu-submenu:hover,
.ant-menu-horizontal > .ant-menu-submenu-active,
.ant-menu-horizontal > .ant-menu-item-open,
.ant-menu-horizontal > .ant-menu-submenu-open,
.ant-menu-horizontal > .ant-menu-item-selected,
.ant-menu-horizontal > .ant-menu-submenu-selected {
  color: white !important;
  border-bottom: 2px solid white;
}
.ant-menu-horizontal > .ant-menu-submenu-active,
.ant-menu-horizontal > .ant-menu-item-open,
.ant-menu-horizontal > .ant-menu-submenu-open,
.ant-menu-horizontal > .ant-menu-item-selected,
.ant-menu-horizontal > .ant-menu-submenu-selected {
  font-size: 18px;
}
</style>