---
title: node.js之路由请求中req.params，req.query，req.body区别
date: 2023-04-07
author: XiaoChen
category: frontend
tags:
  - Node
---

## req.[params](https://so.csdn.net/so/search?q=params&spm=1001.2101.3001.7020)：请求路径后跟上“：参数”，返回一个以参数为属性的对象，属性值是客户端输入的键值

```node
const express = require('express')
const router = express.Router()
 
router.get('/user/:id', (req, res) => {
 //含在路由中每个查询字符串参数属性的对象。如果没有，默认为{}
  const params = req.params                 
  console.log(params);  //输出 { id: '1' }
})
 
module.exports = router
```

如上：我在客户端中输入了[http://localhost/api/user/1](http://localhost/api/user/1 "http://localhost/api/user/1")，返回了一个以参数（id）为属性，以客户端请求路径中的输入参数（1）为属性值的对象。

## **req.query：请求路径后跟上“?键=键值&键=键值”，返回一个以键为属性的对象，属性值是用户输入的值**

```node
const express = require('express')
const router = express.Router()
 
router.get('/user', (req, res) => {
//包含在路由中每个查询字符串参数属性的对象。如果没有，默认为{}
  const query = req.query
  console.log(query);  //输出 { name: 'zs' }
  res.send(query)
})
 
module.exports = router
```

如上：我在客户端中输入了[http://localhost/api/user/?name=zs](http://localhost/api/user/1 "http://localhost/api/user/?name=zs")，返回了一个以键（name）为属性，以客户端请求路径中的键值（zs）为属性值的对象。

## req.body：客户端使用x-www-form-urlencoded格式请求数据，需要使用[node](https://so.csdn.net/so/search?q=node&spm=1001.2101.3001.7020). js中的内置中间件express.urlencoded({ extended: false })才能拿到数据

```node
app.use(express.urlencoded({ extended: false }))
```
