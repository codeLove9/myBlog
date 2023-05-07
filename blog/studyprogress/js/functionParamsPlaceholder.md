---
title: JS函数参数占位
date: 2023-05-07
author: XiaoChen
category: frontend
tags:
  - JS
---

例子：

pubsub官网用法：

```js
PubSub.publish("refreshState", "hello world!")
 
PubSub.subscribe("refreshState", (msg, data) => {
    console.log(msg, data)      //输出 "refreshState"，"hello world!"
})
```

很多时候我们心里知道传递名称，只想接收到第二个参数data即‘hello world’，但是官方封装的函数规定了我们必须得要两个参数，这个时候就需要用到参数占位了

当我们想调用时，发现两个参数很麻烦，但是又不能只传递一个，函数的参数接收是按照顺序接收的。这时我们可以用这样简写

优化后的代码：

```js
PubSub.publish("refreshState", "hello world!")
 
PubSub.subscribe("refreshState", (_, data) => {
    console.log(data)
})
```
