<template>
	<div>
		<!-- 轮播图区域 -->
		<swiper :bannerList="bannerList" :isfull="true"></swiper>
		<!-- 九宫格改造区域 -->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/newsList">
							<img src="../../images/menu1.png" />
							<div class="mui-media-body">新闻资讯</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/photoList">
							<img src="../../images/menu2.png" />
							<div class="mui-media-body">图片分享</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/goodsList">
							<img src="../../images/menu3.png" /></span>
							<div class="mui-media-body">商品购买</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
							<img src="../../images/menu4.png" /></span>
							<div class="mui-media-body">留言反馈</div></a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
							<img src="../../images/menu5.png" /></span>
							<div class="mui-media-body">视频专区</div></a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
							<img src="../../images/menu6.png" /></span>
							<div class="mui-media-body">联系我们</div></a></li>
		</ul> 
	</div>
</template>

<script>
	import swiper from "../subcompnent/swiper.vue";
	import { Toast } from "mint-ui";
	export default{
		data(){
			return{
				bannerList:[],
			}
		},
		methods:{
			getBanner(){//获取轮播图数据
				this.$http.get("api/getlunbo").then(result => {
					if (result.body.status ===0 ){
						this.bannerList = result.body.message;
					}else{
						Toast("加载轮播图失败");
					}
				});
			},
		},
		created() {
			this.getBanner();
		},
		components:{
			swiper
		}
	}
</script>

<style scoped="scoped">
	img{
		width: 50%;
		height: 50%;
	}
	.mui-grid-view.mui-grid-9{
		background-color: white;
		border: none;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border: none;
	}
</style>
