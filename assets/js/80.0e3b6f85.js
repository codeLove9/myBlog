(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{432:function(e,s,t){"use strict";t.r(s);var r=t(2),a=Object(r.a)({},(function(){var e=this,s=e._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("blockquote",[s("p",[e._v("编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误？")])]),e._v(" "),s("h2",{attrs:{id:"问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#问题"}},[e._v("#")]),e._v(" 问题")]),e._v(" "),s("p",[e._v("编程式导航"),s("a",{attrs:{href:"https://so.csdn.net/so/search?q=%E8%B7%AF%E7%94%B1%E8%B7%B3%E8%BD%AC&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"}},[e._v("路由跳转"),s("OutboundLink")],1),e._v("到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误？")]),e._v(" "),s("p",[e._v("注意：编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。")]),e._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/e6dd718055b94ffa931bd7c01faa5387.png",alt:"img"}})]),e._v(" "),s("p",[e._v("这种异常，对于程序运行没有任何影响。")]),e._v(" "),s("p",[e._v("为什么会出现这种现象:")]),e._v(" "),s("p",[e._v("由于"),s("a",{attrs:{href:"https://so.csdn.net/so/search?q=vue-router&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"}},[e._v("vue-router"),s("OutboundLink")],1),e._v("最新版本3.5.2，引入了promise，push、replace方法会返回一个Promise。当传递参数多次且重复，或是没有写成功或失败的回调。会抛出异常，因此出现上面现象")]),e._v(" "),s("h2",{attrs:{id:"解决方案"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解决方案"}},[e._v("#")]),e._v(" 解决方案")]),e._v(" "),s("p",[e._v("第一种解决方案：是给push和replace方法，传入相应的成功的回调与失败的回调")]),e._v(" "),s("div",{staticClass:"language-vue line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[e._v('this.$router.push({name:"search",params:{keyword:this.keyword},query:{this.keyword.toUpperCase()}},()=>{},()=>{})\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("第一种解决方案可以暂时解决当前问题，治标不治本，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；")]),e._v(" "),s("p",[e._v("第二种解决方案：重写$router的push和replace方法")]),e._v(" "),s("p",[e._v("首先我们要清楚，在组件中：")]),e._v(" "),s("p",[e._v("this：表示当前组件实例对象(search组件，实质是Vuecomponent实例对象)")]),e._v(" "),s("p",[e._v("this.$router属性：表示的是"),s("a",{attrs:{href:"https://so.csdn.net/so/search?q=VueRouter&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"}},[e._v("VueRouter"),s("OutboundLink")],1),e._v("的一个实例。在入口文件main.js注册路由时，给每个组件身上都加了$route|$router属性")]),e._v(" "),s("p",[e._v("this.$router.push()方法：实际上是VueRouter这个构造函数的原型对象身上的方法（即VueRouter.prototype的方法）")]),e._v(" "),s("p",[e._v("我们使用this.$router.push()方法时，方法内部代码执行的上下文为VueRouter的一个实例（即用this.$router.push()和VueRouter.prototype.push()时，函数体内的this均指向VueRouter的一个实例，故重写push|replace方法时需要将this重新指向VueRouter实例）")]),e._v(" "),s("div",{staticClass:"language-vueRouter.js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("// 重写push|replace方法\n//先把VueRouter的push和replace方法保存一份\nlet originPush = VueRouter.prototype.push;\nlet originReplace = VueRouter.prototype.replace;\nVueRouter.prototype.push = function (location, resolve, reject) {\n    // 此函数上下文(this指向)为VueRouter的一个实例\n    if (resolve && reject) {    //如果我们自己指定了成功/失败的回调，则自己传入\n        originPush.call(this, location, resolve, reject)\n        //若此时直接使用originPush()方法，则函数内的this指向window（内部代码将无法执行）。故应用call或apply方法修改this指向\n    } else {    //如果我们没有指定成功/失败的回调，则自动帮我们生成，防止报错\n        originPush.call(this, location, () => { }, () => { })\n    }\n}\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br"),s("span",{staticClass:"line-number"},[e._v("9")]),s("br"),s("span",{staticClass:"line-number"},[e._v("10")]),s("br"),s("span",{staticClass:"line-number"},[e._v("11")]),s("br"),s("span",{staticClass:"line-number"},[e._v("12")]),s("br"),s("span",{staticClass:"line-number"},[e._v("13")]),s("br")])]),s("div",{staticClass:"language-vueRouter.js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("// replace方法同理\nVueRouter.prototype.replace = function (location, resolve, reject) {\n    if (resolve && reject) {\n        originReplace.call(this, location, resolve, reject)\n    } else {\n        originReplace.call(this, location, () => { }, () => { })\n    }\n}\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br")])])])}),[],!1,null,null,null);s.default=a.exports}}]);