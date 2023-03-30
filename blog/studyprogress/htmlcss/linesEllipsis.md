---
title: CSS实现多行文本时显示省略号
date: 2023-03-30
author: XiaoChen
category: frontend
tags:
  - HTML/CSS
---

# CSS代码

主要代码如下：  

![在这里插入图片描述](https://img-blog.csdnimg.cn/0b22607941f341ae90f9ce33fe3321bd.png)

```js
.example {   
    color: #999; 
    font-size: 14px; 
    line-height: 150%;
    padding: 6px 0px;  
    width: 100%;
    overflow : hidden; 
    display: -webkit-box;    /*弹性伸缩盒子*/ 
    -webkit-box-orient: vertical; /*子元素垂直排列*/
    -webkit-line-clamp: 3;   /*可以显示的行数，超出部分用...表示*/
    text-overflow: ellipsis; /*（多行文本的情况下，用省略号“…”隐藏溢出范围的文本)*/
}
```