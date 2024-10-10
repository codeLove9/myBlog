---
title: HTML之块元素、行内块元素、行内元素的认识和区别
date: 2023-03-23
author: XiaoChen
category: frontend
tags:
  - HTML/CSS
---

## 1.**块元素**

*   总是在新行上开始；
    
*   高度，行高以及外边距和内边距都可控制；
    
*   宽度默认是它的父级的100%，除非设定一个宽度。
    
*   它可以容纳内联元素和其他块元素
    

常见的块级元素有：`<h1>~<h6>,<p>,<div>,<ul>,<ol>,<li>`等

## 2.行内块元素

*   它既具有块级元素的特点，也有行内元素的特点，它可以自由设置元宽度和高度， 也可以在一行中放置多个行内块级元素。比如input、img就是行内块级元素，它可以设置高宽以及一行多个。
*   和其他行内或行内块级元素元素放置在同一行上；
*   元素的高度、宽度、行高以及顶 和底边距都可设置。

常见的行内块元素有：`<img>,<input>`等

## 3.行内元素

*   和其他元素都在一行上；
    
*   高，行高及外边距和内边距不可改变；
    
*   默认的宽度就是它本身的宽度，不可改变
    
*   内联元素只能容纳文本或者其他内联元素
    
*   设置高度height 无效，可以通过line-height来设置。
    
*   设置margin 只有左右margin有效，上下无效。
    
*   设置padding 只有左右padding有效，上下则无效。注意元素范围是增大了，但是对元素周围的内容是没影响的。
    
*   行内元素只能容纳纯文本或者是其他的行内元素（a标签除外）
    

常见的行内元素有：`<a >,<span >,<strong>,<b>,<em>,<del>`等

## 如何实现元素转换：

```css
// 定义元素为块级元素 
isplay：block

// 定义元素为行内元素 
display: inline

// 定义元素为行    
display：inline-block
```