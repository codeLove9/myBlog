---
title: JS如何判断两个对象是否相等(使用JSON.stringify())
date: 2023-05-30
author: XiaoChen
category: frontend
tags:
  - JS
---

在日常开发中，判断两个数据是否相等是再常见不过的事，偶然回想起之前刚接触JS的时候，曾被一段代码困扰过，直接上代码来看看吧~~

## 如图

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f002d048d3d47619f84f23bbdd89646~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f57b4265bdf0481da3f48b36d6a9a67d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

乍一看，这不就两个对象吗，然后判断是否相等，一个 ‘==’ 不就搞定咯。咋还扯出两种方法呢，而且答案还不一样？

今天便总结一下如何去判断两个对象是否相等，给以前的自己上一课~~手动滑稽

## 1\. ==

在判断两个值类型的数据是否相等时，==便已足够完成任务，但当其遇到引用类型的数据时，就只能灰溜溜的跑了，原因则是因为当两个引用类型的数据在==进行比较时，比较的是其在栈中的地址，而不是比较其在堆中的数据（哪怕数据看起来完全相等）

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2592984c55246c8bdbcd7db831866c3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

上图便能解释本文刚开始的代码中，为何console.log(obj1==obj2)的结果为false，可能有人会问到，为什么两个看着完全一样的代码，居然就是不相等呢？在此可以打个比方：你和你朋友在同一小区各买了一套房，这两套房的外观样式包括内部装修完全一样（家具、地板缝都一样），那你能说你朋友那套房是你的吗（回答‘是’的朋友，请问开发商能只给你俩一套房吗，不是相等吗，你有不就是他有咯）

## 如何让两个对象相等呢？

可以将obj1赋值给obj2，但本质是将obj1的栈地址赋值给obj2，使obj1和obj2都指向同一个堆内存中的数据。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9afb2d40c0574c64811316d2aa7176ad~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69eb7daa40b1408f8dcd6a82364f64a1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e3fb3a4a1744c4faef47923a3dcfb5c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

若改变obj2中的值，obj1的也会随之改变

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de178f69f485485fa0e0a71cc016c826~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f387b39399b34fd1b593b0adcb3ba63b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

## 2\. JSON.stringify( )方法转字符串

清楚了上面的原理之后，细心的你会发现，为什么 console.log(JSON.stringify(obj1) === JSON.stringify(obj2)) 的结果会为true呢。原因是因为其比较的是两个对象中的值。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/196a200d378046aabad581f18f2fbbf2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) JSON.stringify（）会将复杂的引用类型数据转换成简单的值类型数据，因为转换后的值类型数据完全相等，所以其结果必然为true咯

### 缺陷

此法最大的缺陷在于，哪怕两个对象的内部数据相等，但只要每个数据对应的位置不同，其结果也为false。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51bccc79f6874ab7ad81edb7eeb72719~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) 若对上一步理解清楚后也会发现，在通过JSON.stringify（）转字符串后，有一个对象的头尾颠倒了，自然不能相等了。

## 3.函数检测

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a743ea7ec39446fa3b237ce0f5bcf72~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

### 缺陷

若对象当中嵌有引用类型数据，则此方法则不适用，需要进行改进

## 4.函数检测的基础上递归

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4272676f56f441089eb87c5ff70f9a7a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)
