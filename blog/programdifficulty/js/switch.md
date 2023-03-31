---
title: 当用switch结构判断范围值时问题
date: 2023-03-31
author: XiaoChen
category: frontend
tags:
  - JS
---

当判断范围值时，我们一般用if else结构，switch结构更多的用于判断定值。  
如果要用switch结构判断范围值问题时，**switch后不要写变量，否则会一直打印default的结果。**
如以下代码：

```js
var money = parseInt(prompt('班长口袋里的钱数：'));
//money 和 money >= 2000不是全等关系，所以不成立；switch后要跟case条件后的返回值
switch (money) {
    case (money >= 2000): 
    alert('请大家吃西餐');
    break;
    case money >= 1500 && money <2000: 
    alert('请大家吃快餐');
    break;
    case money >= 1000 && money <1500: 
    alert('请大家喝饮料');
    break;
    case money >=500 && money <1000:
    alert('请大家吃棒棒糖');
    break;
    default: 
    alert('下次带够钱');
}
```

在switch结构中，switch后括号中的表达式或者值要和case后括号中的表达式或者值全等，否则就会不成立。而比如我输入了4000,4000 已经 大于等于了2000，这个表达式的结果是true，可以得出正确代码：

```js
var money = parseInt(prompt('班长口袋里的钱数：'));
//当改成true后，运行顺利
switch (true) {
    case (money >= 2000): 
    alert('请大家吃西餐');
    break;
    case money >= 1500 && money <2000: 
    alert('请大家吃快餐');
    break;
    case money >= 1000 && money <1500: 
    alert('请大家喝饮料');
    break;
    case money >=500 && money <1000:
    alert('请大家吃棒棒糖');
    break;
    default: 
    alert('下次带够钱');
}
```