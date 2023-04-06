---
title: 字符串的replace()方法中可以用正则匹配
date: 2023-04-06
author: XiaoChen
category: frontend
tags:
  - JS
---

> String.prototype.replace(regexp|substr, newSubStr|function),第一个参数正则表达式，第二个参数新字符串

<!-- more -->

## 代码示范

```js
const regStr = /[a-c]*/  
let str = 'abcdfnhgjkhf的哈哈我' 
let res = str.replace(regStr,'我被替换了')
console.log(res);           //输出结果：  我被替换了dfnhgjkhf的哈哈我
```

## 总结

repalce()中第一个参数可以跟正则表达式，表示被替换的字符，第二个参数跟替换后的字符
