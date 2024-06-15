---
title: location.search失效
date: 2024-06-15
author: XiaoChen
category: frontend
tags:
  - Vue
---

## 背景

使用浏览器原生方法location.search获取路由参数时，不能正常获取。

## 原因

我通过F12打开浏览器控制台，输入location.search准备验证一下

当浏览器地址是`https://www.bilibili.com/video/BV1Sa4y1Z7B1/?p=12时`

```js
'?p=12' 打印内容
```

可以看到成功获取到了?后的参数

当浏览器地址是`https://www.bilibili.com/video/#BV1Sa4y1Z7B1/?p=12`时

```js
''  // 打印内容
```

## 总结

location.search能不能获取到浏览器链接中?后的参数还是看项目中设置的**路由模式，如果是history模式，可以成功获取到；如果是hash模式，则获取不到。**
