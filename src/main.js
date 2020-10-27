//入口文件
import Vue from "vue";

//配置vuex
// 1.装包cnpm i vuex -S
// 2.导入包
import Vuex from "vuex"
// 3.注册vuex到Vue中
Vue.use(Vuex);

//每次进入网站，肯定会调用 main.js ，在刚调用的时候把本地的数据读取到 state
var car = JSON.parse(localStorage.getItem("car")||'[]');
// 4.new Vuex.Store()实例，得到一个数据仓储对象
var store = new Vuex.Store({
	state:{//可以把state 当作　data　存储数据
		car:car//把购物车中，商品的数据用数组保存起来，设置存储对象样式为：
					//{id:商品的id ， count:要购买的数量 , price:商品的价格 , selected:false }
	},
	mutations:{/* 如果要操作state中的数据，推荐调用mutation中的方法，才能操作对应的数据，不推荐直接操作数据，容易造成数据紊乱,
不能快速定位错误原因 */
//注意：组件想要调用mutation 中的方法，只能通过this.$store.commit('方法名')
		addToCar(state, goodsinfo){
			//点击加入购物车，把商品信息保存到 store 的 car 中
			//分析：
			//1.如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
			//2.如果没有，则把商品数据，push 到 car 中
			var flag = false;
			state.car.some(item => {
				if(item.id === goodsinfo.id){
					//item.count += parseInt(goodsinfo.count);
					item.count = parseInt(item.count) + parseInt(goodsinfo.count);
					flag = true;
					return true;
				}
			});
			if(!flag){
				state.car.push(goodsinfo);
			}
			//当更新car之后，把数据保存到本地的localStorage中
			localStorage.setItem("car", JSON.stringify(state.car));
		},
		updateGoodsInfo(state, goodsinfo){//修改购物车商品中的数量值
			state.car.some(item => {
				if(item.id == goodsinfo.id){
					item.count = parseInt(goodsinfo.count);
					return true;
				}
			});
			//当修改完商品的数量，把最新的数量保存到本地存储中
			localStorage.setItem("car",JSON.stringify(state.car))
		},
		removeFormCar(state, id){
			state.car.some((item, i) => {
				if(item.id == id){
					state.car.splice(i,1)
					return true;
				}
			})
			localStorage.setItem("car",JSON.stringify(state.car));
		},
		updateGoodsSelected(state, info){
			state.car.some(item => {
				if(item.id == info.id){
					item.selected = info.val;
				}
			});
			localStorage.setItem("car",JSON.stringify(state.car))
		}
	},
	getters:{
		getAllCount(state){
			var c = 0;
			state.car.forEach(item => {
				c += parseInt(item.count);
			})
			return c;
		},
		getGoodsCount(state){
			var o = {};
			state.car.forEach(item => {
				o[item.id] = item.count;
			});
			return o;
		},
		getGoodsSelected(state){
			var o = {};
			state.car.forEach(item => {
				o[item.id] = item.selected;
			})
			return o;
		},
		getAmount(state){
			var o ={
				count:0,
				amount:0
			}
			state.car.forEach(item => {
				if(item.selected) {
					o.count += item.count;
					o.amount += (item.price * item.count);
				}
			})
			return	o;
		}
	}
})

import app from "./APP.vue";
//全局导入css
import "./lib/css/golbal.css";

//导入mint-ui
import "mint-ui/lib/style.css";
import "./lib/mui/css/mui.css";
import "./lib/mui/css/icons-extra.css";
//按需导入Header、Swipe、SwipeItem
/* import { Header , Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload); */
//懒加载不能按需导入，需要全部导入
import MintUI from 'mint-ui';
Vue.use(MintUI);

//导入路由
import VueRouter from "vue-router";
Vue.use(VueRouter);
import router from "./router.js";

//导入时间插件
import moment from "moment";
//设置全局时间过滤器
Vue.filter("dateFormat", function (dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
	return moment(dataStr).format(pattern);
});

//安装图片预览插件
import VuePreview from "vue-preview";
Vue.use(VuePreview);

//导入vue-resource
import VueResource from "vue-resource";
Vue.use(VueResource);
//设置全局的请求路径，必须放在 vue-resource 之后
Vue.http.options.root = "http://api.cms.liulongbin.top";
//设置全局post 提交表单格式的组织形式
Vue.http.options.emulateJSON = true;

var vm = new Vue({
	el:"#app",
	render: c => c(app),
	router,
	store,
});