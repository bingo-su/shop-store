<template>
	<div class="pic-container">
		<h1>{{info.title}}</h1>
		<hr />
		<div class="content" v-html="info.content"></div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				info:[],
			};
		},
		created(){
			this.getPicTextInfo();
		},
		methods:{
			getPicTextInfo(){
				this.$http.get("api/goods/getdesc/" + this.$route.params.id).then( result => {
					if(result.body.status === 0){
						this.info = result.body.message[0];
					}
				})
			},
		},
	}
</script>

<style lang="scss" >
	.pic-container{
		h1 {
			font-size: 16px;
			color: #226AFF;
		}
		.content{
			margin: 5px 10px;
		  img{
				width: 100%;
				
			}
		}
	}
</style>
