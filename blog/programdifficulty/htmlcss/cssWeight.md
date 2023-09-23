---
title: CSS写了后控制台查看元素样式中存在，但是被删除线删掉了不生效（涉及css权重）
date: 2023-09-23
author: XiaoChen
category: frontend
tags:
  - HTML/CSS
---

## 背景

今天在写项目时，需求涉及到改一个元素的样式，可当我改了后，没有生效。当我打开控制台时，看见新写的样式已经在元素里了，但是上面有删除线，导致不生效。

## 原因

经过排查发现，这个样式由于是在封装的ui组件中，外层不尽有多个css选择器，本身还有!important,导致它的权重非常高。而我写的样式虽然后面也加了!important，但是没有外层的选择器，导致权重没有ui组件中的高，因此没有生效。

## 解决方案

在自己写的样式选择器外多套几层，权重比ui组件中的高后，样式生效，代码如下：

```css
// 原来不生效的css代码
.a {
  color: xxx!important
  background: xxxx!important
}

// 优化后的代码
// a选择器样式外面加了两层后样式生效
.c {
  .b {
    .a {
      color: xxx!important
      background: xxxx!important
    }
  }
}
```
