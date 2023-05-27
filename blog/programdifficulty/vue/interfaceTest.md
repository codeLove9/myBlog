---
title: 发起请求返回异常情况时，要在控制台测试一下是否会报typeError
date: 2023-05-27
author: XiaoChen
category: frontend
tags:
  - Ajax
---

## 背景

今天在公司给老大做代码review时，因为没有测试异常情况，被老大批评了一顿，说再一再二不再三，我也该长长记性了

下面是大致的代码段：

```vue
async created() {
  const [{ a }, b] = await Promise.all([getData().catch(e => ({})),getFinanceList()].catch(e => ''))
}
```

当我沾沾自喜觉得自己写了优秀的代码，把两个请求用Promise.all统一处理还不忘做了捕获异常，信心满满的给老大看时

下面是他的原话：‘你考虑到两个请求发生异常的情况没？’ 我说：‘啊？好像没有’，顿时心里慌得一笔。

他于是批评道：‘**那如果你第一个请求发生异常捕获了空对象，如果a拿不到值产生了typeError报错，导致页面卡死，你能负的起这个责吗？再一再二不再三啊，下次注意！**’

解决方案：

所以每次在捕获异常之后，要在浏览器调试工具中的控制台打印一下要取到的各个值，模拟一下异常情况会不会导致卡死，如下图所示

[![interface-Test.png](https://i.postimg.cc/fLzspndZ/interface-Test.png)](https://postimg.cc/NyzZ2nbP)
