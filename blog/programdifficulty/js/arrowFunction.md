---
date: 2023-04-18
title: ES6箭头函数后面加不加花括号{}问题
category: frontend
tags:
  - JS
---

### 前言

本人在做项目的时候，使用到了every方法并使用[箭头函数](https://so.csdn.net/so/search?q=%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0&spm=1001.2101.3001.7020)，我在箭头函数中加了花括号但是却无法返回正确的结果，经过查阅才知道，箭头函数后加花括号和不加是有区别的。

一、箭头函数后加花括号  
如下所示，array是一个数组，用every方法看数组中的每一项是否满足所对应的条件，如果都满足的话，则会返回true，不满足返回false。根据every方法返回的结果再进行判断。我刚开始写的错误代码如下：

```js
this.cartInfoList.every(item => {
 item.isChecked == 1
}) 
```

结果发现当array数组中的所有数字都是0的时候还是会返回1，其原因在于当箭头函数加上花括号的时候是需要加上return的。否则返回的就是就是空。因此加上花括号正确的代码如下：

```js
this.cartInfoList.every(item => {
 return item.isChecked == 1
}) 
```

二、箭头函数不加花括号  
此时是默认有return的，因此以上代码直接这样写：

```js
this.cartInfoList.every(item => item.isChecked == 1)
```

总结  
记住一句话就可以了：箭头函数加上花括号需要写return，不加花括号不需要写，默认就有return。
