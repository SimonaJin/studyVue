<!-- home -->
<template>
	<a-carousel autoplay>
    <div v-for="slider in sliders">
			<img :src="slider.url" alt="" class="sliderImgs">
		</div>
  </a-carousel>
</template>

<script>
import { mapActions, mapState } from "vuex";
import * as types from "../store/action-types";
export default {
	data () {
		return {
		};
	},
	computed: {
    ...mapState(["sliders"])
  },

	mounted() {
		//页面初始化时进行调用
		if (!this.sliders.length) {
      this[types.SET_SLIDERS]();
    }
		
	},

	methods: {
		...mapActions([types.SET_SLIDERS])
	}
}

</script>
<style lang='css' scoped>
/* For demo */
.ant-carousel >>> .slick-slide{
  text-align: center;
  height: 160px!important;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide .sliderImgs {
  width: 100%;
	height: 100%;
	display: block;
}

</style>