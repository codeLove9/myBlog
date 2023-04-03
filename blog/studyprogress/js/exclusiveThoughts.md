---
title: JS排他思想步骤
date: 2023-04-03
author: XiaoChen
category: frontend
tags:
  - JS
---

> JS中的排他思想，即干掉别人只留下自己

<!-- more -->

## 代码段
```js
var lis = ol.querySelectorAll('li');
   for(i = 0; i < lis.length; i++) {
       lis[i].addEventListener("click", function() {
        for(j = 0; j < lis.length; j++) {                     // 自己写的小圆圈点击模块 排他：两个for循环，监听事件里面一个循环
            lis[j].className = '';
        }
        this.className = 'current';
       })
   }
```

## 详解
1.使用[双重for循环](https://so.csdn.net/so/search?q=%E5%8F%8C%E9%87%8Dfor%E5%BE%AA%E7%8E%AF&spm=1001.2101.3001.7020)实现

2.第一次for循环里给每一个li都绑定上点击事件，目的是点击任意一个li都能触发绑定事件

2.第二次for循环写在事件函数里（又叫在点击事件里写第二个for循环），目的是当点击了某一个li时，先把所有的li的类名清空（排他思想）

3.重新赋值的语句一定要写在第二次循环外，绑定事件中，目的是单独给自己重新赋值
