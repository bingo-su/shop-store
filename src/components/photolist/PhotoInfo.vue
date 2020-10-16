<template>
	<div class="photoinfo-container">
		<h1>{{photoInfo.title}}</h1>
		<p class="subtitle">
			<span>发表时间：{{photoInfo.add_time|dateFormat}}</span>
			<span>点击：{{photoInfo.click}}次</span>
		</p>
		<hr />
		<!-- 缩略图区域 -->
		<div class="thumbs">
			<vue-preview :slides="list" @close="handleClose" tag="img"></vue-preview>
		</div>
		<!-- 图片内容区域 -->
		<div class="content" v-html="photoInfo.content">
			
		</div>
		<!-- 评论子组件 -->
		<cmt-box :id="id"></cmt-box>
	</div>
</template>

<script>
	//导入评论子组件
	import comment from "../subcompnent/comment.vue";
	export default{
		data(){
			return {
				id:this.$route.params.id,
				photoInfo:{},
				list:[],
			};
		},
		created(){
			this.getPhotoInfo();
			this.getThumbs();
		},
		methods:{
			getPhotoInfo(){
				this.$http.get('api/getimageInfo/' + this.id).then( result => {
					if(result.body.status === 0){
						this.photoInfo = result.body.message[0];
					}
				});
			},
			getThumbs(){
				this.$http.get('api/getthumimages/'+ this.id).then( result =>{
					if(result.body.status === 0){
						result.body.message.forEach(item =>{
							item.msrc=item.src;
							item.h=400;
							item.w=600;
							item.alt = "picture" + this.id;
							item.title = "Image Caption" + this.id;
						});
						this.list = result.body.message;
					}
				})
			},
			handleClose () {
			        console.log('close event');
			      },
		},
		components:{//注册评论子组件
			'cmt-box':comment,
		},
	};
</script>

<style lang="scss" scoped="scoped">
	.photoinfo-container{
		padding: 3px;
		h1 {
			color:#26A2FF;
			font-size: 15px;
			text-align: center;
			margin: 15px 0;
		}
		.subtitle{
			display: flex;
			justify-content: space-between;
			font-size: 13px;
		}
		.content{
			font-size: 13px;
		}
		.thumbs{
			img{
				margin: 10px;
				box-shadow: 0 0 8px #999;
				height: 100px;
			}
		}
	}
</style>
