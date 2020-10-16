<template>
	<div class="goodslist-container">
		<router-link class="item" v-for="item in goodslist" :key="item.id"
		 :to="'/home/goodsList/goodsInfo/' + item.id" tag="div">
			<img :src="item.img_url"/>
			<h1>
				<span class="title">{{item.title}}</span>	
			</h1>
			<div class="info">
			<p class="price">
				<span class="new">￥{{item.sell_price}}</span>
				<span class="old">￥{{item.market_price}}</span>
			</p>
			<p class="sell">
				<span>热卖中</span>
				<span>剩{{item.stock_quantity}}件</span>
			</p>
			</div>
		</router-link>
		<mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				pageindex:1,
				goodslist:[],
				};
		},
		created(){
			this.getGoodsList();
		},
		methods:{
			getGoodsList(){//获取商品列表数据
				this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result=>{
					if(result.body.status === 0){
						// this.goodslist = result.body.message;
						this.goodslist = this.goodslist.concat(result.body.message);
					}
				})
			},
			getMore(){
				this.pageindex++;
				this.getGoodsList();
			}
		},

	}
</script>

<style lang="scss" scoped="scoped">
.goodslist-container{
	display: flex;
	flex-wrap: wrap;
	padding: 7px;
	justify-content: space-between ;
	.item{
		width: 49%;
		border: 1px solid #ccc;
		box-shadow: 0 0 8px #ccc;
		margin: 4px 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 188px;
		h1{
			font-size: 16px;
		}
		img{
			width: 100%;
		}
		.info{
			background-color: #eee;
			p{
				margin: 0;
			}
			.price{
				padding-left: 4px;
				.new{
					color: red;
					font-weight: bold;
					font-size: 16px;
				}
				.old{
					text-decoration: line-through;
					font-size: 12px;
					margin-left: 10px;
				}
			}
			.sell{
				margin: 2px 2px;
				display: flex;
				justify-content: space-between;
			}
		}
	}
}
</style>
