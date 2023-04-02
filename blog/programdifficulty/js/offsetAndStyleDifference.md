---
title: JS中offset与style区别
date: 2023-04-02
author: XiaoChen
category: frontend
tags:
  - JS
---

|\\|offset|style|
|:---:|:----:|:----:|
|限制| offset可以得到任意[样式表](https://so.csdn.net/so/search?q=%E6%A0%B7%E5%BC%8F%E8%A1%A8&spm=1001.2101.3001.7020)中样式值|style只能得到行内样式表中的样式值|
|单位| offset系列获得的数值是没有单位的|style.width获得的是带有单位的字符串|
|值| [offsetWidth](https://so.csdn.net/so/search?q=offsetWidth&spm=1001.2101.3001.7020)包含padding+border+width|style获得不包含padding和border的值|
|读写性| offset Width等属性是只读属性，只能获取不能复制|style.width是可读属性，可以获取也可以赋值|

总结：想要获取元素大小位置，用offset更合适；想要给元素更改值，则需要用style改变


