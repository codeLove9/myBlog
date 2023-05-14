---
title: React配置代理（proxy）
date: 2023-05-14
author: XiaoChen
category: frontend
tags:
  - React
---

使用axios进行请求，而配置代理过程

## 第一种

在package.json中，添加`proxy`配置项,之后所有的请求都会指向该地址  
但这种方法只能配置一次，也只有一个

示例：

```react
"proxy":"https://localhost:5000"
```

添加后，重启项目！！！让配置文件加载生效  
然后就可以进行请求了  
比如请求地址是 `http://localhost:5000/api/index/index`  
那就可以写

```react
axios.get("/api/index/index").then(
  response => {console.log('成功了',response.data);},
  error => {console.log('失败了',error);}
)
```

## 第二种

在`src`中，新建`setupProxy.js`（必须是这个名字，react脚手架会识别），在文件中写以下配置内容（最近的项目要使用高版本这个，不然会导致项目无法启动）：  
http-proxy-middleware高版本（2以上）：

```react
const proxy = require('http-proxy-middleware')//引入http-proxy-middleware，react脚手架已经安装

module.exports = function(app){
  app.use(
    proxy.createProxyMiddleware('/api',{            //遇见/api1前缀的请求，就会触发该代理配置
      target:'http://localhost:5000',               //请求转发给谁
      changeOrigin:true,                            //控制服务器收到的请求头中Host的值
      pathRewrite:{'^/api':''}                      //重写请求路径，下面有示例解释
    }),
    proxy.createProxyMiddleware('/api2',{
      target:'http://localhost:5001',
      changeOrigin:true,
      pathRewrite:{'^/api2':''}
    }),
  )
}
```

写好以后，重启项目！！！  
然后进行请求

假设地址是 `http://localhost:5000/api/index/index`

```react
//没有开启重写路径
axios.get("/api/index/index").then(
  response => {console.log('成功了',response.data);},
  error =>  {console.log('失败了',error);}
)
//开启重写路径
axios.get("/api/api/index/index").then(
  response => {console.log('成功了',response.data);},
  error => {console.log('失败了',error);}
)
```
