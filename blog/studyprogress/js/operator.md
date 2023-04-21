---
title: JS中短路运算符逻辑与&&和逻辑或||
date: 2023-04-21
author: XiaoChen
category: frontend
tags:
  - JS
---

在[JS函数](https://so.csdn.net/so/search?q=JS%E5%87%BD%E6%95%B0&spm=1001.2101.3001.7020)中我们经常会使用到短路运算符，主要是逻辑与（&&） 和 逻辑或（||）

<!-- more -->

## 逻辑与 && 的运算方式

```js
var a = 5 && 6;
console.log(a); //返回的结果为 6
```

如果逻辑与运算符左边的值布尔转换后为true，那么返回右边的值（不管右边的值是真还是假）。

```js
var a = false && 6;
console.log(a); //返回的结果为 false
```

如果逻辑与运算符左边的值布尔转换后为false，那么返回左边的值，但是当逻辑与的左边为 null/NaN/undefined ，结果就会得到null/NaN/undefined。

## 逻辑或 || 的运算方式

```js
var a = false || 6;
console.log(a); //返回的结果为 6
```

如果逻辑或运算符左边的值布尔转换后为false，那么返回右边的值（不管右边的值是真还是假）。

```js
var a = true || 6;
console.log(a); //返回的结果为 true
```

如果逻辑或运算符左边的值布尔转换后为true，那么返回左边的值，如果两个操作数都是是null（NaN/undefined），返回null（NaN/undefined）
