(window.webpackJsonp=window.webpackJsonp||[]).push([[119],{469:function(t,e,s){"use strict";s.r(e);var a=s(2),v=Object(a.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"一-vue中computed-watch-method三者的区别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#一-vue中computed-watch-method三者的区别"}},[t._v("#")]),t._v(" 一.Vue中computed ， watch， method三者的区别")]),t._v(" "),e("ol",[e("li",[t._v("computed 属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算，主要当作属性来使用")]),t._v(" "),e("li",[t._v("methods 方法表示一个具体的操作，主要书写业务逻辑")]),t._v(" "),e("li",[t._v("watch 一个对象，键是需要观察的表达式，值是对应回调函数。主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作；可以看作是 computed 和 methods 的结合体")])]),t._v(" "),e("h2",{attrs:{id:"二-computed与methods对比"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#二-computed与methods对比"}},[t._v("#")]),t._v(" 二.computed与methods对比")]),t._v(" "),e("p",[t._v("同样都可以达到计算属性的效果")]),t._v(" "),e("ol",[e("li",[t._v("computed是属性调用，而methods是函数调用")]),t._v(" "),e("li",[t._v("computed带有缓存功能，而methods不会被缓存")]),t._v(" "),e("li",[t._v("computed中的方法不能带参数，而methods中的方法可以带参数")])]),t._v(" "),e("p",[t._v("属性调用：\n(1)computed定义的方法我们是以属性访问的形式调用")]),t._v(" "),e("div",{staticClass:"language-vue line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-vue"}},[e("code",[t._v("{{ computedTest }}\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br")])]),e("p",[t._v("(2)methods定义的方法，我们必须要加上()来调用")]),t._v(" "),e("div",{staticClass:"language-vue line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-vue"}},[e("code",[t._v("{{ methodTest() }}\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br")])]),e("p",[t._v("缓存功能：\n计算属性具有缓存：只有当计算属性所依赖的属性发生改变时，才会重新去计算\nmethods不会被缓存：方法每次都会去重新计算结果。")]),t._v(" "),e("h2",{attrs:{id:"三-watch"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#三-watch"}},[t._v("#")]),t._v(" 三.watch")]),t._v(" "),e("ol",[e("li",[t._v("watch是观察某一个属性的变化，重新计算属性的值")]),t._v(" "),e("li",[t._v("computed是通过所依赖的属性的变化计算属性值")]),t._v(" "),e("li",[t._v("大部分下watch和computed是没有区别的，但是如果在数据变化的同时进行异步操作的情况下，watch则是最好的选择")])])])}),[],!1,null,null,null);e.default=v.exports}}]);