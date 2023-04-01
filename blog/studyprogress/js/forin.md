---
title: js之for in循环遍历对象（包括输出value值为什么是obj[k]而不是obj.k）
date: 2023-04-01
author: XiaoChen
category: frontend
tags:
  - JS
---

```js
var obj = {
    name: 'chen',
    age: 18,
    professional:'student'
}
 
for (var k in obj) {
    console.log(k);         // k  输出的是属名 ：name, age, professional
    console.log(obj[k]);    // obj[k] 输出的是属性值: chen, 18 , student
}
```

k就是key；

for in 循环主要用于[遍历对象](https://so.csdn.net/so/search?q=%E9%81%8D%E5%8E%86%E5%AF%B9%E8%B1%A1&spm=1001.2101.3001.7020)（object）；

单独输出k，输出的是属性名 ：name, age, professional；

单独输出 obj\[k\]，输出的是属性值 ： chen, 18 , student；

最后特别要注意的一点是：**[遍历](https://so.csdn.net/so/search?q=%E9%81%8D%E5%8E%86&spm=1001.2101.3001.7020 "遍历")属性值和方法值时，只能用obj\[k\],不能用obj.k。**

**如今已经开始学v3了，关于只能用obj\[k\],不能用obj.k的问题我一直都没有搞懂，今天终于搞懂了。**

说起来也有点尴尬，原来在for in函数中，得到的k是一个用var重新声明的变量，所以只能用obj\[key\]。

obj.k方式的话，对象的属性必须是字符串，而这里的k是一个用var重新声明的形参变量名，所以只能用字符串\[变量名\]的方式来获取

**真正的原因是如果用obj.k，js会把k当作是obj对象中的key（当成字符串）执行，而不会当作循环中的变量再解析成对应属性去执行，就像如下所示**

```js
// 如果是obj.k， js会这么认为：不会把k当成变量，而是直接当成obj的key执行
var obj = {
    k: 'xxx'
}
```

但是obj中实际并没有k这个key，所以获取不到。

所以用**obj\[k\]的原因是：只有用obj\[k\]，这个k才会被js当作变量去执行，并把k解析成字符串name， age等key值，这样才能得到最终的value值**