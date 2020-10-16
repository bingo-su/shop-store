#Vue的第一个项目

##改造新闻资讯路由链接

##制作新闻资讯页面
1.绘制界面 使用MUI 中media-list.html
2.使用 vue-resource 获取数据
3.渲染真实数据

##实现新闻资讯列表 实现跳转到新闻详情
1.把列表中的每一项改造为 router-link,同时,跳转的时候提供唯一ID的标识符
2.创建新闻详情的组件页面 NewsInfo.vue
3.在新闻模块中，将新闻详情的路由地址 和组件页面对应起来

##实现新闻详情页面 的 页面布局 和 数据渲染

##单独封装一个comment.vue 的子组件
1.先创建一个单独的 comment.vue 组件模板
2.在需要使用 comment 组件的页面中，手动导入 comment 组件，`import comment from "./comment.vue"`
3.在父组件中，使用`components` 属性，将刚才导入的 comment 组件，注册为自己的子组件
4.将注册时候的 子组件名称 ，以标签的形式，在页面中引用

##获取所有的评论数据，显示到页面中

##实现点击加载更多评论功能
1.为加载更多按钮，绑定点击事件，在事件中去请求下一页数据
2.点击加载更多，让pageIndex ++ ，然后重新调用getComments(),获取下一页数据
3.为了防止新数据覆盖老数据，我们再点击加载更多时候，每当获取新数据，应该让老数据拼接上新数据

##实现点击发表评论
1.把文本框实现数据双向绑定
2.为发表按钮绑定事件
3.校验评论内容是否为空，若为空，则Toast提示用户	，评论内容不能为空
4.通过 vue-resource 发送一个请求，把评论内容提交给服务器
5.提交数据后，刷新评论数据，渲染到页面
+如果调用getcomments()重新刷新列表，可能只能得到最后一页的评论，
+换一种思路，当提交评论后，在客户端，手动拼接出一个最新的评对象，然后调用数组unshift方法，把最新的评论，追加到data中的comments的开头。

##改造图片分享列表路由,添加PhotoList.vue组件

##绘制 图片列表组件页面结构并优化样式
1.制作头部的滑动条
2.制作底部的图片列表

###制作顶部滑动条的坑：
1.	需要借助MUI中的 tab-top-webview-main
2.	需要把slider区域的 mui-fullscreen 去除
3.	滑动条无法正常出发滑动，因为这是一个JS组件，需要被初始化
 + 导入mui.js
 + 调用官方提供的方式初始化：
 ```mui('.mui-scroll-wrapper').scroll({
	 deceleration:0.0005
 })
 ```
4.在初始化滑动条时，导入mui.js ,但是控制台报错mui.js:3444 Uncaught TypeError: 'caller', 'callee', and 'arguments' 
properties may not be accessed on strict mode functions or the arguments objects for calls to them
+原因是：mui.js中用到的'caller', 'callee', and 'arguments' ，但是和webpack打包好的bundle.js中默认是严格模式，	两者冲突了。
+解决方案：把webpack中的严格模式禁用，因为修改mui.js中不现实
```
安装
	cnpm i @babel/plugin-transform-modules-commonjs @babel/plugin-transform-strict-mode -D
	在.babelrc中配置
"plugins": [
      ["@babel/plugin-transform-modules-commonjs", { "strictMode": false }]
    ]
```
5.刚进入图片分享页面时，滑动条无法正常工作，原因是此时DOM元素，还没有加载完毕。所以，把初始化滑动
条的代码，搬到了mounted生命周期函数中。
6.当滑动条 调试Ok后，发现tabbar无法正常工作了，这时候把tabbar 按钮的样式类	`mui-tab-item` ,复制
到style中 重新改一下名字。
7.获取所有分类，渲染分类列表。

##制作图片列表区域
1.图片列表需要使用懒加载技术，可以使用Mint-UI 提供的组件 `lazy-load`
2.根据`lazy-load`的使用文档，尝试使用
3.渲染图片列表数据

###实现了图片列表的懒加载和图片美化

##实现了点击图片跳转到图片详情页面
1.在改造li 成 router-link 时，需要使用 tag 标签指定渲染为 li 标签

##实现详情页面的布局和美化，同时获取数据渲染页面

##实现图片详情中缩略图的功能
1.使用插件 vue-preview 
2.获取到所有图片列表，然后使用 v-for 指令渲染数据
3.注意:img 标签上的class不能去掉
4.注意：每个图片数据对象中，必须有 H 和 W 属性	

##绘制商品列表布局并美化

##拉取商品列表数据并渲染

##安卓手机运行项目
++1.电脑和手机处于同一局域网
++2.在 package.json 中 dev 里添加 --host ip