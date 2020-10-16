<template>
	<mt-swipe :auto="4000">
	  <mt-swipe-item v-for="item in bannerList" :key="item.id">
			<img :src="item.img"  :class="{'full':isfull}"/>
		</mt-swipe-item>
	</mt-swipe>
</template>

<script>
	export default{
		props:["bannerList","isfull"]
	}
</script>

<style scoped="scoped">
	.mint-swipe{
		height: 200px;
		text-align: center;
	}
	.mint-swipe-item:nth-child(1){
		
	}
	.mint-swipe-item:nth-child(2){
	
	}.mint-swipe-item:nth-child(3){
		
	}
	img{
		/* width: 100%; */
		height: 100%;
	}
	.full{
		width: 100%;
	}
</style>
