---
title: JS节流阀
date: 2023-04-04
author: XiaoChen
category: frontend
tags:
  - JS
---

> 节流阀：可以减少一段时间内事件触发的频率，指定时间内只能触发一次

<!-- more -->

## 核心实现思路

开始设置一个变量var flag = true；

`if (flag) { flag = false;  do something }`   // 关闭水龙头

利用回调函数等动画执行完毕，flag = true；       //打开水龙头

## 实现代码段

```js
// flag 节流阀
var flag = true;
arrow_r.addEventListener('click', function() {
    if (flag) {
        flag = false; // 关闭节流阀
        // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth, function() {
            flag = true; // 打开节流阀
        });
        // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
        circle++;
        // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
        if (circle == ol.children.length) {
            circle = 0;
        }
        // 调用函数
        circleChange();
    }
});
```
