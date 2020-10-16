//入口文件
import Vue from "vue";
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
});