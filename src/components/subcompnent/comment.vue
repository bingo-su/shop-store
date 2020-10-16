<template>
	<div class="comment-container">
		<h1>发表评论</h1>
		<textarea placeholder="请输入评论内容(最多不能超过120字)" maxlength="120" v-model="msg"></textarea>
		<mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
		<div class="comment-list">
			<div class="comment-item" v-for="(item,i) in comments" :key="item.add_time">
				<div class="comment-title">
					第{{ i+1 }}楼&nbsp;&nbsp;用户:{{ item.user_name }}&nbsp;&nbsp;发表时间:{{ item.add_time|dateFormat }}
				</div>
				<div class="comment-body">
					{{ item.content === "undefined" ? "此用户很懒，什么都没说" : item.content}}
				</div>
			</div>
		</div>
		
		<mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
	import { Toast } from "mint-ui";
	export default{
		data(){
			return {
				pageIndex:1 , //默认展示第一页数据
				comments:[], //存放评论信息
				msg:'', //评论输入的内容
			}
		},
		created(){
			this.getComment();
		},
		methods:{
			getComment(){//获取评论信息
				this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result =>{
					if(result.body.status === 0){
						// this.comments = result.body.message ;
						//每当获取新评论数据时，不要把老数据清空，而是拼接起来
						this.comments = this.comments.concat(result.body.message);
					}else{
						Toast("获取评论失败");
					}
				})
			},
			getMore(){
				this.pageIndex++;
				this.getComment();
				
			},
			postComment(){
				if(this.msg.trim().length === 0){
					return Toast("评论内容不能为空");
				}
				//post格式
				//参数1：发送请求的URL地址
				//参数2：提交给服务器的数据对象{content: this.msg}
				//参数3：定义 提交时候，表单中数据格式 { emulateJSON:true } ,此项目已做全局配置，所以不用设置
				this.$http.post("api/postcomment/"+this.$route.params.id,{ content: this.msg.trim() })
				.then(result => {
					if(result.body.status ===0 ){
						var cmt = {
							user_name:"匿名用户",
							add_time:Date.now(),
							content:this.msg.trim()
						};
						this.comments.unshift(cmt);
						this.msg = "";
					}else{
						Toast("提交失败")
					}
				});
			},
		},
		props:["id"]
	}
</script>

<style lang="scss" >
	.comment-container{
		h1{
			font-size: 18px;
		}
		textarea{
			font-size: 14px;
			height: 85px;
			margin: 0;
		}
		.comment-list{
			margin: 5px 0;
			.comment-item{
				font-size: 13px;
				.comment-title{
					line-height: 30px;
					background-color: #ccc;
				}
				.comment-body{
					line-height: 35px;
					text-indent: 2em;
				}
			}
		}
	}
</style>
