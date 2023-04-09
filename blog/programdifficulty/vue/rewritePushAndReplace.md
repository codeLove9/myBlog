---
title: 重写VueRouter的push/replace方法，解决路由跳转相同路径抛出NavigationDuplicated的警告错误
date: 2023-04-09
author: XiaoChen
category: frontend
tags:
  - Vue
---

> 编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误？

## 问题

编程式导航[路由跳转](https://so.csdn.net/so/search?q=%E8%B7%AF%E7%94%B1%E8%B7%B3%E8%BD%AC&spm=1001.2101.3001.7020)到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误？

注意：编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。

![img](https://img-blog.csdnimg.cn/e6dd718055b94ffa931bd7c01faa5387.png)

这种异常，对于程序运行没有任何影响。

为什么会出现这种现象:

由于[vue-router](https://so.csdn.net/so/search?q=vue-router&spm=1001.2101.3001.7020)最新版本3.5.2，引入了promise，push、replace方法会返回一个Promise。当传递参数多次且重复，或是没有写成功或失败的回调。会抛出异常，因此出现上面现象

## 解决方案

第一种解决方案：是给push和replace方法，传入相应的成功的回调与失败的回调

this.$router.push({name:"search",params:{keyword:this.keyword},query:{this.keyword.toUpperCase()}},()=>{},()=>{})

第一种解决方案可以暂时解决当前问题，治标不治本，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；

第二种解决方案：重写$router的push和replace方法

首先我们要清楚，在组件中：

this：表示当前组件实例对象(search组件，实质是Vuecomponent实例对象)

this.$router属性：表示的是[VueRouter](https://so.csdn.net/so/search?q=VueRouter&spm=1001.2101.3001.7020)的一个实例。在入口文件main.js注册路由时，给每个组件身上都加了$route|$router属性

this.$router.push()方法：实际上是VueRouter这个构造函数的原型对象身上的方法（即VueRouter.prototype的方法）

我们使用this.$router.push()方法时，方法内部代码执行的上下文为VueRouter的一个实例（即用this.$router.push()和VueRouter.prototype.push()时，函数体内的this均指向VueRouter的一个实例，故重写push|replace方法时需要将this重新指向VueRouter实例）

```vueRouter.js
// 重写push|replace方法
//先把VueRouter的push和replace方法保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
    // 此函数上下文(this指向)为VueRouter的一个实例
    if (resolve && reject) {    //如果我们自己指定了成功/失败的回调，则自己传入
        originPush.call(this, location, resolve, reject)
        //若此时直接使用originPush()方法，则函数内的this指向window（内部代码将无法执行）。故应用call或apply方法修改this指向
    } else {    //如果我们没有指定成功/失败的回调，则自动帮我们生成，防止报错
        originPush.call(this, location, () => { }, () => { })
    }
}
```

```vueRouter.js
// replace方法同理
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
```
