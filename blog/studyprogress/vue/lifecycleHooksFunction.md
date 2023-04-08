---
title: Vue之生命周期钩子函数理解
date: 2023-04-08
author: XiaoChen
category: frontend
tags:
  - Vue
---
> 想要对Vue的理解的更深，学习生命周期是不可或缺的

<!-- more -->

## 生命周期钩子

**何为生命周期：**

* 通俗地讲，生命周期即**Vue实例或组件从创建到被消灭的一系列过程**，中间的各个节点被称为钩子

生命周期图示： ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc77a9d701624a4cb9a2091934b31855~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 浏览器渲染过程

要深刻理解生命周期的各个节点，就必须了解浏览器的渲染过程

* 构建DOM树
* 构建css规则树,根据执行顺序解析js文件。
* 构建渲染树Render Tree
* 渲染树布局layout
* 渲染树绘制

## 英语课堂

既然我们分析的是`created`和`mounted`钩子，单词对我们的理解也有所帮助

* created：已创建
* mounted：已挂载

## 生命周期中的浏览器渲染

| **生命周期** | **是否获取dom节点** | **是否获取data** | **是否获取methods** |
| :----------: | :-----------------: | :--------------: | :-----------------: |
| beforeCreate |         否          |        否        |         否          |
|   created    |         否          |        是        |         是          |
| beforeMount  |         否          |        是        |         是          |
|   mounted    |         是          |        是        |         是          |

从文章开头的生命周期图示可以看出

* `created`在模板渲染成html前调用
* `mounted`在模板渲染成html后调用

### beforeCreate阶段

对浏览器来说，整个渲染流程尚未开始或者说准备开始，对vue来说，实例尚未被初始化，data observer和 event/watcher也还未被调用，在此阶段，对data、methods或文档节点的调用现在无法得到正确的数据。

## created阶段

对浏览器来说，渲染整个HTML文档时,dom节点、css规则树与js文件被解析后，但是没有进入被浏览器render过程，上述资源是尚未挂载在页面上，也就是在vue生命周期中对应的`created`阶段，实例已经被初始化，但是还没有挂载至 **$el**上，所以我们无法获取到对应的节点，但是此时我们是可以获取到vue中data与methods中的数据的

### beforeMount阶段

实际上与`created`阶段类似，节点尚未挂载，但是依旧可以获取到data与methods中的数据。

## mounted阶段

对浏览器来说，已经完成了dom与css规则树的render，并完成对render tree进行了布局，而浏览器收到这一指令，调用渲染器的paint（）在屏幕上显示，而对于vue来说，在`mounted`阶段，vue的**template成功挂载在$el中**，此时一个完整的页面已经能够显示在浏览器中，所以在这个阶段，即可以调用节点了（关于这一点，在笔者测试中，在mounted方法中打断点然后run，依旧能够在浏览器中看到整体的页面）。

## 使用场景

通过浏览器的渲染过程，可以总结出`created`和`mounted`的使用场景

* created：通常用于**初始化某些属性值**，例如data中的数据，然后再渲染成视图。
* mounted：通常在初始化页面完成后，**对html的dom节点进行需要的操作**。

因此，在`created`中，是无法进行DOM操作的，而`mounted`可以获取渲染出来的所有属性值。

## 参考文档

[生命周期钩子 | Vue.js (vuejs.org)](https://link.juejin.cn?target=https%3A%2F%2Fv3.cn.vuejs.org%2Fapi%2Foptions-lifecycle-hooks.html "https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html")

[Vue生命周期中mounted和created的区别](https://link.juejin.cn?target=https%3A%2F%2Fblog.csdn.net%2Fxdnloveme%2Farticle%2Fdetails%2F78035065 "https://blog.csdn.net/xdnloveme/article/details/78035065")

[vue中created与mounted区别](https://link.juejin.cn?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000020058583 "https://segmentfault.com/a/1190000020058583")
