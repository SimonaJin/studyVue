<template>
  <div id="app">
		<div id="components-layout-demo-basic">
			<a-layout>
				<!-- header -->
				<a-layout-header class="pageHeader">
					<page-header></page-header>
				</a-layout-header>
				<!-- content -->
				<a-layout-content style="height:84vh">
					<router-view></router-view>
				</a-layout-content>
				<!-- footer -->
				<a-layout-footer>
					<page-footer></page-footer>
				</a-layout-footer>
			</a-layout>
		</div>
  </div>
</template>
<script>
import pageHeader from '@/components/pageHeader'
import pageFooter from '@/components/pagefooter'
export default {
	components:{pageHeader, pageFooter}
}
</script>

<style lang="scss" scoped>
.pageHeader{
	width: 100%;
	height: 60px;
	overflow: hidden;
	background-color: cornflowerblue;
}
.ant-layout-footer{
	background:#518fff5e;
	text-align: center;
	color: white;
}
</style>
