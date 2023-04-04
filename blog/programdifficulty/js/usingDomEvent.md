---
title: JS之手动调用dom事件触发后的回调函数
date: 2023-04-04
author: XiaoChen
category: frontend
tags:
  - JS
---

> 在js中我们经常给一个dom绑定一个事件监听器，监听某种行为，触发后执行回调函数。那怎么在别的地方直接调用这个回调函数呢?

<!-- more -->

## 回调函数代码段
```js
 rightBtn.addEventListener('click', function() {
    if(num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
    }
    num++;
    animate(ul, -num * focusWidth);
    circle++;
    if(circle == 4) {
        circle = 0;
    }  
    change();
})
```


## 手动调用右箭头按钮点击事件
```js
var timer = setInterval(function() {
        rightBtn.click();               //手动调用右按钮点击事件
    }, 1000)
```