---
title: 关于localStorage为什么要存储json数据
date: 2023-04-30
author: XiaoChen
category: frontend
tags:
  - JS
---


今天做项目的时候疑惑，为什么localStorage存储数据还要转换json数据

![在这里插入图片描述](https://img-blog.csdnimg.cn/76edf9deb4a343b1a762b18c7d784973.png)

首先解释一下，**`JSON.stringify()`** 方法将一个 JavaScript 对象或值转换为 JSON 字符串，那么，为什么要将JavaScript 对象或值转换为 JSON 字符串呢？是因为localStorage.[setItem](https://so.csdn.net/so/search?q=setItem&spm=1001.2101.3001.7020)()只能存储字符串数据，而它不会自动将JavaScript 对象或值转成字符串形式。我们可以来试一下，去掉JSON.stringify()

![在这里插入图片描述](https://img-blog.csdnimg.cn/d71fd82111794852b3e091252849e9dd.png)

然后我们查看一下浏览器，

![在这里插入图片描述](https://img-blog.csdnimg.cn/4b1975b0a8824f0191205a1af26111bb.png)

 啥也不是，，，，我们继续  
所以我们要把他转换成字符串再存进去，把JSON.stringify()它加上看看效果。

![在这里插入图片描述](https://img-blog.csdnimg.cn/90caeef38c594fab9ee4fce5c38e1157.png)

 这样我们就可以拿到json数据，等到用的时候再用JSON.parse()方法把他转为对象就可以了。
