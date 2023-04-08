---
title: Vue中computed，watch，method三者的区别
date: 2023-04-08
author: XiaoChen
category: frontend
tags:
  - Vue
---

## 一.Vue中computed ， watch， method三者的区别

1. computed 属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算，主要当作属性来使用
2. methods 方法表示一个具体的操作，主要书写业务逻辑
3. watch 一个对象，键是需要观察的表达式，值是对应回调函数。主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作；可以看作是 computed 和 methods 的结合体

## 二.computed与methods对比

同样都可以达到计算属性的效果

1. computed是属性调用，而methods是函数调用
2. computed带有缓存功能，而methods不会被缓存
3. computed中的方法不能带参数，而methods中的方法可以带参数

属性调用：
(1)computed定义的方法我们是以属性访问的形式调用

```vue
{{ computedTest }}
```

(2)methods定义的方法，我们必须要加上()来调用

```vue
{{ methodTest() }}
```

缓存功能：
计算属性具有缓存：只有当计算属性所依赖的属性发生改变时，才会重新去计算
methods不会被缓存：方法每次都会去重新计算结果。

## 三.watch

1. watch是观察某一个属性的变化，重新计算属性的值
2. computed是通过所依赖的属性的变化计算属性值
3. 大部分下watch和computed是没有区别的，但是如果在数据变化的同时进行异步操作的情况下，watch则是最好的选择
