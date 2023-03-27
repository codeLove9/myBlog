---
title: GET请求图片出现403 防盗链解决方式
date: 2023-03-27
author: XiaoChen
category: frontend
tags:
  - HTML/CSS
---

http请求头中有一个referrer字段，用来表示发起http请求的源地址信息

服务器端在拿到这个referrer值后判断请求是否来自本站

若不是则返回403，从而实现图片的防盗链。上面出现403就是因为，请求的是别人服务器上的资源，但把自己的referrer信息带过去了，被对方服务器拦截返回了403

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54a48c7dd8da48e3a9269b98d214f17b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

解决方法：

在index.html中的head中添加：

```
 <!-- 解决图片403防盗链问题 -->
<meta name="referrer" content="no-referrer" />
```

在前端可以通过meta来设置referrer policy(来源策略)，referrer设置成`no-referrer`，发送请求不会带上referrer信息，对方服务器也就无法拦截了 。