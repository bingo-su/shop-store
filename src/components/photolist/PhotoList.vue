<template>
	
<div>
	<!-- 顶部滑动条区域 -->
	<div id="slider" class="mui-slider ">
		
		<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
			<div class="mui-scroll">
				<a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cate" :key= "item.id" 
				@click="getPhotoList(item.id)">
					{{ item.title }}
				</a>
			
			</div>
		</div>
	</div>
  <!-- 图片列表区域 -->
	
		<ul class="photo-list">
		  <router-link v-for="item in list" :key="item.id" :to="'/home/photoList/photoInfo/'+item.id" tag="li">
		    <img v-lazy="item.img_url">
				<div class="info">
					<h1 class="info-title">{{ item.title }}</h1>
					<div class="info-body">{{ item.zhaiyao }}</div>
				</div>
		  </router-link>
		</ul>
	
</div>
	</template>

<script>
		import mui from "../../lib/mui/js/mui.min.js";
		
	export default {
		data(){
			return {
				
				cate:[],//分类列表数组
				list:[],//图片数据数组
				
			}
		},
		created(){
			this.getAllCategory();
			this.getPhotoList(0);
		},
		mounted(){
			//当组件被渲染到页面后，初始化滚动条才有意义
			mui('.mui-scroll-wrapper').scroll({
				 deceleration:0.0005
			});		
		},
		methods:{
			//渲染顶部滑动区域分类列表数据
			getAllCategory(){
			this.$http.get("api/getimgcategory").then(result =>{
				if(result.body.status === 0){
				//手动添加  全部
				result.body.message.unshift({title:"全部" , id: 0});
				this.cate = result.body.message;
				}
			});
			},
			//渲染图片数据的方法
			getPhotoList(cateId){
				this.$http.get("api/getimages/" + cateId).then(result =>{
					if(result.body.status === 0){
						this.list = result.body.message;
					}
				})
			}
		},
	};
</script>

<style lang="scss" scoped="scoped">
	// 使用全局样式样式去掉滑动默认行为，让滑动更流畅，取消滑动警告
	 * { touch-action: pan-y; } 
	 
	 .photo-list{
		 list-style: none;
		 margin: 0;
		 padding: 10px;
		 padding-bottom: 0;
		 li {
			 background-color: #939393;
			 text-align: center;
			 margin-bottom: 10px;
			 box-shadow: 0 0 9px #999;
			 position: relative;
			 img{
				 width: 100%;
				 vertical-align: middle;
			 }
			 img[lazy=loading] {
			   width: 40px;
			   height: 300px;
			   margin: auto;
			 }
			 .info{
			 		text-align: left;
					color: white;
					position: absolute;
					bottom: 0;
					background-color: rgba(0,0,0,0.4);
					max-height: 84px;
			 		 .info-title{
			 			font-size: 14px;
			 		 }
			 		 .info-body{
			 			 
						font-size: 12px;
			 		 }
			 }
		 }
	 }
	
	
	 
</style>
