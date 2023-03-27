---
title: 高度塌陷：父级没有设置高度且子级含有浮动属性
date: 2023-03-27
author: XiaoChen
category: frontend
tags:
  - HTML/CSS
---

在开发的过程中，我们往往会使父级的高度自适应（没有固定高度，高度由子级撑开），但是有时需要子级浮动（float）,这时的子级会脱离文档流，子级不会再把父级的高度撑开了。这就是高度坍塌形成的原因。

结果如下：
![](https://img-blog.csdnimg.cn/f94a22a2756d45ae887aa72c7b3a8bd7.png)

解决方法：

1.方法：在父级上添加高度

优点：好理解

缺点：固定的布局，不能做到自适应

2.给父级添加` overflow:hidden`

原理：触发了**BFC**

（块级格式化上下文）--  将浮动元素的高度参与计算

优点：简单，代码少

缺点：子元素含有定位属性，那么子级元素超出的部分会被隐藏

3.在最后一个浮动元素同级添加一个div，给div添加css声明

`div{ clear:both;}  clear:left / right / both `

原理：表示清除上方预留出来的空间

优点：清除方便

缺点：代码多，HTML结构，代码冗余，造成排版影响

4.万能清除法

原理：表示清除上方预留出来的空间

方法:a.给含有高度塌陷的父级盒子添加类名**clear-fix**  
```
  .clear-fix:after{

         content:"  ";

         clear:both;

         height:0;

         width:100%;

         overflow:hidden;

         display:block;

         visibility: hidden;

}

.clear-fix{zoom:1;/\*兼容IE\*/}
```