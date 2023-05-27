---
title: 发起ajax请求时一定要考虑到异常情况做兜底，并且如果使用了双解构，兜底位置不能是最底层
date: 2023-05-10
author: XiaoChen
category: frontend
tags:
  - Ajax
---

## 背景

今天被项目做告知发起请求时一定要考虑到异常情况做并做兜底

## 以前的的代码习惯

```vue
// 多层解构得到name并重命名为Label
const { resBody：{ productName：productLable } } = ajax()

use productLable do something....
```

可以说是直接莽，根本不考虑ajax请求失败的情况

## 用Promise.catch加上兜底

```vue
const { resBody：{ productName：productLabel } } = ajax().catch(e => '')
```

发生异常时抛出空字符串给productLabel,当我自信满满的提交代码时，被告知左边也要兜底

## 双兜底前的错误代码

```vue
const { resBody：{product：{name：Label = '理财2号' } } } = ajax().catch(e => '')
```

我认为只要给最终得到的值赋个默认值就能解决type类型报错，结果提上去当然少不了一顿教育

原因：

在控制台里打印如下代码可以看到

```js
const { a: { b: c = 3 } } = {}
console.log(c)   // TypeError: Cannot read properties of undefined (reading 'b')
```

经典报错，无法读取未定义的属性（读作“b”）

显而易见，当ajax请求返回数据是一个空对象时，解构出来a是undefined，那么肯定没有b这个key了，那么同理用b重命名c也是肯定找不到的，会报一个TypeError的错误

这就相当于在undefined里取key值 即undefined.b 当然会报错

### 正确代码

在控制台里打印如下代码可以看到

```js
const { a } = {}
console.log(a) // undefined
```

同理：

```js
const { a: { b } } = { a: {} }
console.log(b) // undefined
```

可以看出，a是空对象，a.b打印undefined。想要不报错，那么b的上一层a不能为undefined，a必须是个对象，对象里有没有值不会影响。

那如果取值的上一层没有呢？我们尝试一下

```js
const { a: { b: { c } } } = { a: {} }
console.log(c) // TypeError: Cannot read properties of undefined (reading 'c')
```

很显然，我们想拿到c，那么至少c的上一次b得是个对象，但是右边只声明了a是个空对象，此时想拿到c，那么a中必须有b这个对象，但是却没有，所以报错了

**这时我们就需要给b那层做一层兜底了。**

```js
const { a: { b: { c } } = {} } = { a: { b: {} } }
console.log(c)   // undefined
```

此时控制台输出undefined，不再抛出TypeError的报错，问题解决！

所以可以写成

```vue
const { resBody：{ productName：productLabel } = {} } = ajax().catch(e => '')
console.log(productLable)
```

在resBody这一层就做个兜底,那么就可以保底productName为undefined，重命名为productLabel不受影响。

## 总结

**最好做双兜底，左边兜底防止TypeError报错，右边兜底给兜底值空字符串''**。

**做双解构拿值时，不能对最底层的变量做兜底，会报TypeError的错误**。

**正确的方法是在解构的上一层中就做兜底，给一个空对象**。
