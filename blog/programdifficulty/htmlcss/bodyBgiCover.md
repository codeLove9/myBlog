---
date: 2023-03-26
title: body设置背景图却不铺满浏览器的解决方法
category: frontend
tags:
  - HTML/CSS
---

 

## 项目场景：

当我用background-image选择一张与浏览器宽高不匹配的背景图时，需要铺满整个浏览器。

```css
body {
  background-image: url(../../全民出游季/images/f1_1.jpg) ; 
  background-repeat: no-repeat ;
  /* 缩放背景图 */
  background-size: cover; 
  background-position: center 0;  
}  
```

* * *

## 问题描述

当我使用了background-repeat代码串选择不重复图片，再用background-size: cover代码串让图片填充覆盖整个浏览器，运行后发现并没有相应的效果，并且body的高度始终为0。

* * *

# 原因分析：

> 我知道一个事实：一个块级元素没有主动为其设置宽度和高度，浏览器会为其分配可使用的最大宽度(比如全屏宽度)，但是不负责分配高度，块级元素的高度是由子元素堆砌撑起来的。那么，html和body标签的高度也都是由子级元素堆砌撑起来的。  
> 还有，元素高度百分比需要向上遍历父标签要找到一个定值高度才能起作用，如果中途有个height为auto或是没有设置height属性，则高度百分比不起作用，此时的情况是父元素高度依赖子元素堆砌撑高，而子元素依赖父元素的定高起作用，互相依赖，却都无法依赖，死循环了。

* * *

# 解决方案：

> 可以让子元素先定高，这样是可以解决；但是如果子元素一定要依赖父元素高度呢？

> ```
>html {
>   height: 100%;
>}
>     
>body { 
>   height: 100%;
>   background-image: url(../../全民出游季/images/f1_1.jpg) ; 
>   background-repeat: no-repeat ; 
>    /* 缩放背景图 */  
>   background-size: cover;   
>   background-position: center 0;     
>}
> ```
> 
> 上面的html代码可以看出，body的父元素是html，通过height:100%层层向上，找到顶级获取定高。
> 
> 所以出现了html和body同时设置height:100%，那html的上级是谁呢？
> 
> 通过上面的事实知道，浏览器负责分配块级元素宽度，那么浏览器也一定可以分配高度(只是没有做)，那么浏览器本身是有宽度和高度的，设置html的height:100%，就可以获取浏览器的定高了，后面的body和其他块级元素也就有了依赖。