<template>
	<div class="goodsinfo-container">
		<transition 
		@before-enter="beforEnter"
		@enter="enter"
		@after-enter="afterEnter">
		<div class="ball" v-show="ballflag" ref="ball"></div>
		</transition>
		<!-- 商品轮播图区域 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :bannerList="lunbotu" :isfull="false"></swiper>
				</div>
			</div>
		</div>
		<!--  商品购买区域-->
		<div class="mui-card">
			<div class="mui-card-header">{{goodsinfo.title}}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
						市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;
						销售价:<span class="now_price">￥{{goodsinfo.sell_price}}</span>
					</p>
					<div class="numbox">
						<p>购买数量:</p>
						<div class="mui-numbox" data-numbox-min='1' >
							<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
							<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" 
							ref="numboxcount"/>
							<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
						</div>
					</div>
					<p>
						<mt-button type="primary" size="small">立即购买</mt-button>
						<mt-button type="danger" size="small" @click="switchBall">加入购物车</mt-button>
						<!-- 分析：如何实现加入购物车时，拿到 选择的数量-->
					</p>
				</div>
			</div>
		</div>
		<!--  -->
		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>
						商品货号: {{goodsinfo.goods_no}}
					</p>
					<p>
						库存情况: {{goodsinfo.stock_quantity}}件
					</p>
				
					<p>
						上架时间: {{goodsinfo.add_time|dateFormat}}
					</p>

				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type="primary" size="large" @click="getPicText(id)">图文介绍</mt-button>
				<mt-button type="danger" size="large" @click="getComment(id)">商品评论</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	import swiper from "../subcompnent/swiper.vue"
	import mui from "../../lib/mui/js/mui.min.js"
	export default{
		data(){
			return {
				lunbotu:[],//把商品轮播图数据保存在data
				goodsinfo:[],//把商品详情数据保存在data
				id:this.$route.params.id,//将路由参数中的id挂载到 data ，方便后期调用			
				ballflag:false,//保存小球显示或者隐藏的状态，
				selectcount:1,//购物数量，默认为1
			};
		},
		created(){
			this.getLunbo();
			this.getGoodsInfo();
			
		},
		mounted() {
			//初始化数字选择框
			mui(".mui-numbox").numbox();
		},
		beforeUpdate(){
			mui(".mui-numbox")
			.numbox()
			.setOption("max",this.goodsinfo.stock_quantity);
			
		},
		methods:{
			getLunbo(){//获取轮播图数据
				this.$http.get("api/getthumimages/" + this.id).then(result=>{
					if(result.body.status === 0){
						//需要先循环每一项添加img属性，因为轮播图只认识item.img,不认识item.src属性
						result.body.message.forEach(item => {
							item.img = item.src;
						});
						this.lunbotu = result.body.message;
					}
				})
			},
			getGoodsInfo(){
				this.$http.get("api/goods/getinfo/" + this.id).then(result => {
					if(result.body.status === 0){
						this.goodsinfo = result.body.message[0];
					}
				})
			},
			getPicText(id){
				this.$router.push({name:"pictextinfo",params:{id}});
			},
			getComment(id){
				this.$router.push({name:"goodscomment",params:{id}});
			},
			switchBall(){
				this.ballflag = !this.ballflag
			},
			beforEnter(el){
				el.style.transform = "translate(0,0)";
			},
			enter(el,done){
				el.offsetWidth;
				//解决小球不同适配和滚动条滚拖动后，轨迹固定的问题
				/* 分析：原因是小球运动轨迹局限在固定位移长度了
						1.用徽标坐标 - 小球坐标， 得到小球要位移的横纵距离
						2.用domObject,getBoundingClientRect() 获取徽标和小球坐标
						*/
				//获取小球的位置
				const ballPosition = this.$refs.ball.getBoundingClientRect();
				//获取徽标的位置
				const badgePosition =document.getElementById("badge").getBoundingClientRect();
				
				const xDist = badgePosition.left - ballPosition.left;
				const yDist = badgePosition.top - ballPosition.top;
				
				el.style.transform = `translate(${xDist}px, ${yDist}px)`;
				el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
				done();
			},
			afterEnter(el){
				this.ballflag = !this.ballflag;
			},
			countChanged(){
				this.selectcount = this.$refs.numboxcount.value;
			},
		},
		components:{
			swiper
		},
		
	}
</script>

<style lang="scss" scoped="scoped">
	.goodsinfo-container{
		overflow: hidden;
		background-color: #eee;
		.ball{
			width: 15px;
			height: 15px;
			background-color: orangered;
			border-radius: 50%;
			z-index: 99;
			position: absolute;
			top: 413px;
			left: 148px;
		}
		.now_price{
			color: red;
		}
		.numbox{
			display: flex;
			text-align: center;
			margin: 15px 2px;
			.mui-numbox{
				margin: 0 10px;
				
			}
		}
	}
</style>
