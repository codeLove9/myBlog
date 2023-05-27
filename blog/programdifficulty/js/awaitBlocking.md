---
title: await阻塞后面的代码（微任务）
date: 2023-05-14
author: XiaoChen
category: frontend
tags:
  - JS
---

## 背景

今天在公司开发时遇到一个有趣的现象，一下是源代码

```js
const { groupNo } = await ABSplitResult();
groupNo = 1? .........: ........;
do something.....
```

ABSplitResult这个钩子是从服务组件里引得，用的是app原生方法，只能在app中才跑的通

我在h5环境里测试时，await后面的groupNo那些代码竟然不执行了，当我把await删掉的时候，奇迹发生了，又出来了！！

## 探究原因

当时我就想到了可能跟js的机制 event loop有关系。之前学习的时候看到文档说await后面代码会被压入到微任务中，等await执行后再拿出来执行

然后我就百度了一下，以下是答案：

解释器看到该函数被声明为异步,这意味着它将始终返回一个promise。

**当遇到await关键字时,它会暂停该函数的进一步执行,直到正在等待的promise被解决 才会去向下执行。**

await的阻塞方式并不是阻塞同步代码所在的主线程，await其实是阻塞的当前异步函数的异步线程。
虽然await会阻塞async异步函数，但是并没有阻塞同步代码的主线程，同步和异步之间仍然相互不阻塞。
虽然await阻塞异步函数向后执行，看起来像是同步的，但是它本质还是异步的，我们同样可以并行执行其他的不关联的异步操作，而同步函数不能并行执行。
