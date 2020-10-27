<template>
	<div class="mui-numbox" data-numbox-min='1' style="height: 25px;">
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" 
			ref="numboxcount" readonly/>
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js"
export default{
	methods:{
		countChanged(){//监听数量改变了
			//console.log(this.$refs.numboxcount.value)
			this.$store.commit("updateGoodsInfo",{
				id: this.goodsid,
				count: this.$refs.numboxcount.value
			});
		}
	},
	mounted() {
		//初始化数字选择框
		mui(".mui-numbox").numbox();
		console.log(this.initcount)
	},
	props:["initcount","goodsid"],
}
</script>

<style>
</style>
