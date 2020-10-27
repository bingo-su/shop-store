<template>
	<div class="shopcar-container">
		<!-- 商品列表项目区域 -->
		<div class="goods-list" v-for=" (item, i) in goodslist " :key = " item.id ">
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model=" $store.getters.getGoodsSelected[item.id] "
						@change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
						<img :src=" item.thumb_path " />
						<div class="info">
							<h1>{{ item.title }}</h1>
							<p>
								<span class="price">￥{{ item.sell_price }}</span>
								<numbox :initcount=" $store.getters.getGoodsCount[item.id] " :goodsid=" item.id "></numbox>
								<!-- 问题：如何从购物车中获取商品的数量
								 1.可以先创建一个 空对象 ，然后循环购物车中所有商品的数据，把 当前循环这条商品的id ,作为对象的属性名，
									count 值作为属性值，这样，当所有商品循环一遍，就会得到一个对象eg:{ 88:2 , 89:1 , 90:3}-->
								<a href="#" @click.prevent="remove(item.id, i)">删除</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 结算区域 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
					<div class="left">
						<p>总计(不含运费)</p>
						<p>已勾选商品 <span class="red">{{$store.getters.getAmount.count}}</span> 件,
						总价 <span class="red">￥{{$store.getters.getAmount.amount}}</span></p>
					</div>
					<mt-button type="danger" >去结算</mt-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import numbox from "../subcompnent/Numbox.vue"

export default{
	data(){
		return {
			goodslist:[], //保存购物车商品数据
		};
	},
	methods:{
		getGoodsList(){		//获取购物车商品列表
		//1.先从store中拿到所有商品的id,然后根据接口文档拼接出 用逗号分隔 的字符串
			var idArr = [];
			this.$store.state.car.forEach(item => idArr.push(item.id));
		//2.如果购物车中没有商品则返回
		if( idArr.length <= 0){
			return;
		}
		//3.根据id，拿到购物车商品列表
		this.$http.get("api/goods/getshopcarlist/" + idArr.join(","))
		.then( result => {
			if ( result.body.status === 0){
				this.goodslist = result.body.message;
				
			}
		});
		},	
		remove(id,index){
			//根据id删除 store 中对应的商品删除，同时，根据 index 删除当前组件中的 goodslist 中对应的商品
			this.goodslist.splice(index, 1);
			this.$store.commit("removeFormCar", id);
		},
		selectedChanged(id,val){
			this.$store.commit("updateGoodsSelected",{id,val})
		}
	},
	created(){
		this.getGoodsList();
	},
	components:{
		numbox
	},
}
</script>

<style lang="scss" scoped="scoped">
	.shopcar-container{
		background-color: #eee;
		overflow: hidden;
		.goods-list{
			.mui-card-content-inner{
				display: flex;
				align-items: center;				
			}
			img{
				width: 60px;
				height: 60px;
			}
			h1{
				font-size: 14px;
			}
			.info{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.price{
					color:red;
					font-weight: bold;
				}
			}
		}
		.jiesuan{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.red{
				color: red;
				font-size: 16px;
				font-weight: bold;
			}
		}
	}
</style>
