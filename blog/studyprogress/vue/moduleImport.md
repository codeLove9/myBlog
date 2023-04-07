---
title: node.js之自定义模块引入问题（使用es6扩展运算符）
date: 2023-04-07
author: XiaoChen
category: frontend
tags:
  - Node
---

```node
//第三层src中first.js文件
const a = () => {
    do something
}
 
const b = () => {
    do something
}
 
module.exports = {
    a,
    b
}
```

```node
//第三层src中second.js文件
const c = () => {
    do something
}
 
module.exports = c
```

```node
//第二层index.js
const d = require('./第三层first.js文件')
const e = require('./第三层second.js文件')
 
module.exports = {
    ...d,                  //第二层中的对象要使用es6扩展运算符暴露出去给第一层调用
    ...e                  //相当于直接暴露的是对象{a，b}，而不是d = {a， b}
}
 
 
//
module.exports = {
    d,                  //如果直接调用，会使第一层调用的时候使用f.d.a（或b）才能调用，不方便调用
    e                  
}
//
```

```node
第一层test.js调用
const f = require('./第二层index.js文件')
 
//如果第二层使用了扩展运算符，调用方式如下：
f.a||f.b||f.c
 
 
//如果第二层没有使用扩展运算符，那么调用起来会很麻烦，需要多调用过一层，方式如下：
f.d.a||f.e.b||f.e.c
```
