---
title: 单独创建JS文件（外部式）引入步骤
date: 2023-04-03
author: XiaoChen
category: frontend
tags:
  - JS
---

> 第一步：给window绑定监听事件 window.addEventListener("load", function() { })  
> 第二步：在html文件头部用`<script src="路径名.js"></script>`引入创建的js文件

<!-- more -->

当独立创建js文件时，在js文件首行一定要先用以下代码：
```js
window.addEventListener("load", function() {
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    var small = document.querySelector('.preview_img');
 
    small.addEventListener('mousemove', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
 
    small.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
})
```
## window绑定load事件
要使用bom里的知识，给window绑定监听事件window.addEventListener("load", function() { }）才能顺利读取js，因为网页读取是从上到下的，要先读取html里的内容：元素，图片，文档等等，如果不给window加load事件代码，会读取不到。

## html文件中引入
另外一定要在html文件头部用<script src="路径名.js"></script> 引入创建的js文件这样才是完全正确的步骤。

## 总结
第一步：给window绑定监听事件 window.addEventListener("load", function() { }）

           第二步：在html文件头部用<script src="路径名.js"></script> 引入创建的js文件

少了其中任意一部，都会加载失败。