import VueRouter from 'vue-router'

import HomeContainer from "./components/tabbar/homeContainer.vue"
import MemberContainer from "./components/tabbar/memberContainer.vue"
import ShopcarContainer from "./components/tabbar/shopcarContainer.vue"
import SearchContainer from "./components/tabbar/searchContainer.vue"
import NewsList from "./components/news/NewsList.vue"
import NewsInfo from "./components/news/newsinfo/NewsInfo.vue"
import PhotoList from "./components/photolist/PhotoList.vue"
import PhotoInfo from "./components/photolist/PhotoInfo.vue"
import GoodsList from "./components/goodslist/GoodsList.vue"
import GoodsInfo from "./components/goodslist/GoodInfo.vue"
import PicTextInfo from "./components/goodslist/PicTextInfo.vue"
import GoodsComment from "./components/goodslist/GoodsComment.vue"
//3.创建路由对象
var router = new VueRouter({
	routes:[//路由匹配规则
		{path:"/", redirect:"/home"}, //路由重定向
		{path:"/home" , component:HomeContainer},
		{path:"/member" , component:MemberContainer},
		{path:"/shopcar" , component:ShopcarContainer},
		{path:"/search" , component:SearchContainer},
		{path:"/home/newsList" , component:NewsList},
		{path:"/home/newsList/newsInfo/:id" , component:NewsInfo},
		{path:"/home/photoList" , component:PhotoList},
		{path:"/home/photoList/photoInfo/:id" , component:PhotoInfo},
		{path:"/home/goodsList" , component:GoodsList},
		{path:"/home/goodsList/goodsInfo/:id" , component:GoodsInfo},
		{path:"/home/goodsList/goodsInfo/picTextInfo/:id", component:PicTextInfo,name:"pictextinfo"},
		{path:"/home/goodsList/goodsInfo/goodsComment/:id", component:GoodsComment,name:"goodscomment"}
	],
	linkActiveClass:'mui-active'//覆盖默认的路由高亮的类
});
export default router;