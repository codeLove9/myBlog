---
title: Ajax请求地址携带不上参数
date: 2023-04-30
author: XiaoChen
category: frontend
tags:
  - Ajax
---

## get

get接口：

![img](https://img-blog.csdnimg.cn/55d4ae948f644a1f9564dc446a954089.png)

get请求中传入的params其实是一个对象，即`{params: params}`，因为key, value一致，所以可以简写

错误示范：getUser(this.pageData)， 这样传的话请求携带参数只会是`this.pageData`，而不是`{params: this.pageData}`,故无法将参数带到请求url中

正确示范：getUser({ params: this.pageData })

总结：Ajax请求地址携带不上参数的get请求如果存在params参数，携带参数必须是一个key是params的对象，不能是一个值或简单对象;

## post

post接口：

![img](https://img-blog.csdnimg.cn/e4f39478fa3a4deab0a9830648d7b5c8.png)

正确示范： getMenu(this.form)， post请求则可以直接填入一个普通对象
