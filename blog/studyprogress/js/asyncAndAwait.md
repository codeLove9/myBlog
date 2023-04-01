---
title: for与onclick循环的同步和异步问题
date: 2023-04-01
author: XiaoChen
category: frontend
tags:
  - JS
---

### for与onclick循环的同步和异步问题

*   [一、产生原因](https://blog.csdn.net/qq_43775721/article/details/113875921#_1 "一、产生原因")
*   [二、解决问题](https://blog.csdn.net/qq_43775721/article/details/113875921#_45 "二、解决问题")
*   [2.1、添加自定义属性](https://blog.csdn.net/qq_43775721/article/details/113875921#21_46 "2.1、添加自定义属性")
*   [2.2、闭包](https://blog.csdn.net/qq_43775721/article/details/113875921#22_59 "2.2、闭包")
*   [2.3、es6中的块级作用域（推荐）](https://blog.csdn.net/qq_43775721/article/details/113875921#23es6_72 "2.3、es6中的块级作用域（推荐）")

# 一、产生原因

导致 `for` 循环中 `onclick` 不能直接**定位到**我们点击的**按钮**的原因如下：

1.  原生JS的入口函数是在所有的文件资源加载完成后， 才执行。这些文件资源包括：页面文档、外部的JS文件、外部的CSS文件、图片等。**for循环也是在加载完成之前就执行好的，而onclick是点击的时候才加载的**。
2.  **es5采用的是全局作用域**。

for循环的同步和异步问题案列代码如下：
```js
<!DOCTYPE html>
<html lang="en">
 
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>for和while循环</title>
</head>
 
<body>
    <button>1</button>
    <button>2</button>
    <button>3</button>
    <button>4</button>
    <button>5</button>
    <script>
        var btns = document.getElementsByTagName("button");
        for (var i = 0; i < btns.length; i++) {
            btns[i].onclick = function() {
                console.log(i);
            }
        }
    </script>
</body>
 
</html>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210424104751517.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzc1NzIx,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021022008571591.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzc1NzIx,size_16,color_FFFFFF,t_70#pic_center)

# 二、解决问题

## 2.1、添加[自定义属性](https://so.csdn.net/so/search?q=%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7&spm=1001.2101.3001.7020)

想要解决这个问题，我们可以通过添加自定义属性，此时每个按钮，都有自己独有的值，我们可以通过这个独有的值，来定位我们要找的按钮

```js
var btns = document.getElementsByTagName("button");
for (var i = 0; i < btns.length; i++) {
    //自定义属性标签
    btns[i].index = i;
    btns[i].onclick = function() {
        console.log(this.index);
    }
}
```

## 2.2、闭包

上诉所说，导致 for与onclick循环的同步和异步问题 最大的问题，在于[es5](https://so.csdn.net/so/search?q=es5&spm=1001.2101.3001.7020)采用的是全局作用域，但是在js中我们的**函数的作用域是块级**的。

```js
var btns = document.getElementsByTagName("button");
    for (var i = 0; i < btns.length; i++) {
        (function(i) {
            btns[i].onclick = function() {
                console.log(i);
            }
        })(i);
    }
```

## 2.3、es6中的块级作用域（推荐）

为了解决当初es5没有块级作用域的麻烦，es6推出了`let/const`。所以我们直接把 var 改成 let 就可以解决问题了。
```js
var btns = document.getElementsByTagName("button");
for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function() {
        console.log(i);
    }
}
```