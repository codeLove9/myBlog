(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{299:function(t,e,n){},351:function(t,e,n){"use strict";n(299)},359:function(t,e,n){"use strict";n.r(e);var o=n(350),i=n.n(o),m={mounted(){setTimeout(()=>{this.loadComment()},500)},watch:{$route(t,e){t.path!==e.path&&setTimeout(()=>{this.loadComment()},500)}},methods:{clearComment(){const t=document.querySelector("#vcomments");t&&t.remove()},loadComment(){this.clearComment();const t=document.createElement("div");t.setAttribute("id","vcomments"),this.$refs.valineBox.appendChild(t),new i.a({el:"#vcomments",path:window.location.pathname,...this.$themeConfig.blog.comment})}}},s=(n(351),n(2)),a=Object(s.a)(m,(function(){var t=this._self._c;return t("div",{ref:"valineBox",staticClass:"valine-box"},[t("div",{attrs:{id:"vcomments"}})])}),[],!1,null,null,null);e.default=a.exports}}]);