---
title: regexp（正则表达式）中 exec() 和test() 方法
date: 2023-04-05
author: XiaoChen
category: frontend
tags:
  - JS
---

## 代码段

```js
const regStr = /[a-c]*/           //定义一个正则表达式
let str = 'abcd'
let r1 = regStr.exec(str)           
console.log(r1);                   //输出内容为：  ["abc", index: 0, input: "abcd"]

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

let r2 = regStr.test(str)
console.log(r2);                 //输出内容为：true
```

## 总结

相同点：regexp.exec（需要检测的字符串）和 regexp.test（需要检测的字符串）都有返回值，需要定义一个变量去接收

不同点：exec()方法返回的是一个数组，数组的索引0表示的是匹配到的字符串，索引1表示的是第一个匹配到的字符串在原字符串str中的索引，索引2表示输入的原字符串；test()方法返回的是一个布尔值，true表示匹配到了，false反之
