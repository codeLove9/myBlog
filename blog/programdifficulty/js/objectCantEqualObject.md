---
title: JS中对象不能等于对象（大坑）
date: 2023-04-23
author: XiaoChen
category: frontend
tags:
- Vue
---

> 在js中，object(对象)，是一个复杂数据类型，两者比较的是存储地址，所以一个对象怎么都不可能等于另外一个对象，应该比较对象的key

<!-- more -->

## 场景

用Vue写面包屑功能的时候，传入一个对象给vuex的mutations，然后枚举state里的一个数组，数组里是一个对象， 让数组里的对象等于传入的对象后实现对应功能，却一直实现不了。

![img](https://img-blog.csdnimg.cn/c7b1b20c846045f6bdda0b4afc6d4d02.png)

![img](https://img-blog.csdnimg.cn/0abe620cf3504676a4edeeb48e578c30.png)

![img](https://img-blog.csdnimg.cn/d134750fc45a498894b364acc5a46e37.jpeg)

我当时认为，如果两个对象有相同的属性，以及它们的属性有相同的值，那么这两个对象就相等。

后来一步步实践发现是对象不能等于对象，无论使用"=="还是"==="，都返回false。

![img](https://img-blog.csdnimg.cn/6bce882a7dee41bf93ff123326135fb9.png)

主要原因是基本类型string,number通过值来比较，而对象（Date,Array）及普通对象通过指针指向的内存中的地址来做比较。

## 解决方案

所以如果判断两个对象的值是否相等，就得看对象属性对应的值是否相同。

![img](https://img-blog.csdnimg.cn/92c77e09a31b49eabbcdcbb1bf49a4f2.png)
