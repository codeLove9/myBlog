(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{391:function(t,s,a){"use strict";a.r(s);var r=a(2),n=Object(r.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"项目场景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#项目场景"}},[t._v("#")]),t._v(" 项目场景：")]),t._v(" "),s("p",[t._v("使用li:nth-child（4n）选择第4个第8个li盒子清除右侧外边距")]),t._v(" "),s("hr"),t._v(" "),s("h2",{attrs:{id:"问题描述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#问题描述"}},[t._v("#")]),t._v(" 问题描述")]),t._v(" "),s("p",[t._v("当我在box盒子中左边创建了一个left盒子，右边创建了多个li盒子时，想用nth-child（4）选择第四个li盒子时，发现选择的是第三个li盒子。")]),t._v(" "),s("hr"),t._v(" "),s("h2",{attrs:{id:"原因分析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#原因分析"}},[t._v("#")]),t._v(" 原因分析：")]),t._v(" "),s("blockquote",[s("p",[t._v("我发现当右边右很多li盒子，左边有个盒子的情况时，尽管是用li:nth-child（4n）选择所有li盒子中的4的倍数盒子，也会出现选中错误的bug，网页会把前面的left盒子也算进li的里面来计算。")])]),t._v(" "),s("hr"),t._v(" "),s("h2",{attrs:{id:"解决方案"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解决方案"}},[t._v("#")]),t._v(" 解决方案：")]),t._v(" "),s("blockquote",[s("p",[t._v("所有li盒子外面需要包一个大盒子right，在right盒子中选li盒子，网页就能正确选中了。")]),t._v(" "),s("div",{staticClass:"language-css line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".box .right li:nth-child(4n)")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    margin-left=0\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);