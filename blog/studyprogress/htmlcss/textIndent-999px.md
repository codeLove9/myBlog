---
title: CSS中关于text-indent：-999px
date: 2023-03-29
author: XiaoChen
category: frontend
tags:
  - HTML/CSS
---

问题：在DIV CSS布局中常常见到CSS代码中设置text-indent:-999px或者text-indent:-9999px这样的代码，那它什么作用什么功能？

```
.header h1 a {
  width :210px;
  height :39px;
  display: block;
  text-indent: -9999px;
}
```

这个是**为了隐藏对象内的内容功能**，比如隐藏DIV内文字等。就是把该元素内的文字移到屏幕外面去，让我们肉眼看不见，有时候是因为如某栏目名称的文字或者logo的文字已经用背景图片代替了，我们不需要眼睛看见那些文字，但是希望搜索引擎可以搜到，就可以用这个把文字“隐藏”的属性。虽然眼睛看不见，但是搜索引擎能知道，**有助于seo。**

一、text-indent简单介绍  
首先我们了解text-indent  
text-indent是CSS缩进功能，一般设置文字缩进两个文字字符。比如一般文章段落习惯设置每段首行开头文字内容缩进两个汉字位置来实现文章排版。

二、div css布局中text-indent:-999px或text-indent:-9999px作用介绍  
text-indent:-999px和text-indent:-9999px功能一样的，其实设置这两个任意一个都是实现将内容往左托出999px或9999px远（缩进-999px或-9999px）这样盒子内就不见内容了。

三、text-indent:-999px和text-indent:-9999px常见应用场景：

一般我们布局图标时，会使用图片设置为对象背景，然后使用a超链接放文字，如果不设置text-indent:-999px这样图片背景上就能看见超链接文字，但是我们只想显示背景图片又要有超链接，这个时候对a设置text-indent:-9999px或text-indent:-999px，**这样A盒子里文字就隐藏掉了，但是超链接也被保留了。**