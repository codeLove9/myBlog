---
title: Vue3解构对象丢失响应式，如props，torefs, pinia响应式核心
date: 2023-06-03
author: XiaoChen
category: frontend
tags:
- Vue3
---

## 项目场景

这段时间在利用vue3开发一个项目，在vue的使用过程中，我处于用到什么学什么的状态，一方面是学业，一方面是技术，项目的影响，导致我一直没有静下心来研究透彻vue核心知识，这么，一个关于组件开发时响应式的问题面对了我，我做的是一个组件嵌套，分别有三个组件，一个负责页面框架，一个负责核心业务，一个负责文件处理，这三个组件需要互相通信，我为了代码简洁没有定义过多的变量，而是充分利用vue的组件通信来完成响应式组件和业务。

* * *

# 问题描述：

项目中我用的是pinia状态管理库，我是希望通过中间库来使通信更容易，这个过程就产生了响应式问题。总结如下：

1. pinia仓库失去响应式

```pinia
const system = useSystem();
const { isNewProject, isOpenEdit } = toRefs(system)
```

2. props响应式异常

```vue
const props = defineProps({
  isNewProject: Boolean,
  isOpenEdit: Boolean
})

const { isNewProject, isOpenEdit } = props;
```

* * *

## 原因分析：

上面我放了俩段代码，是为了更好说明问题；

############ 问题1分析 ：我之所以会用那样的解构方式，是因为我在用pinia之前就没有完整的读完文档，这一点我深刻反思，其实原因很简单，官方文档说的很清楚`store 是一个用reactive 包裹的对象，像setup 中的props 一样，我们不能对其进行解构`这是官方原话，如果需要响应式跟踪`Store 中提取属性同时保持其响应式，您需要使用storeToRefs()。 它将为任何响应式属性创建 refs。`

############ 问题2分析 ：props响应式异常，一个常识是vue的组件中props数据流是由父到子单向的，那么这个数据流可以是响应式的也可以是非响应式的，非响应式的不会产生我们这里的问题，关键在于响应式，什么情况下会失去响应式，于是我带着问题开始了探索，先是读了一个[大佬的文章](https://blog.csdn.net/lunahaijiao/article/details/125863270?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2~default~CTRLIST~Rate-1-125863270-blog-115365262.pc_relevant_3mothn_strategy_recovery&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2~default~CTRLIST~Rate-1-125863270-blog-115365262.pc_relevant_3mothn_strategy_recovery&utm_relevant_index=1)， `ES6 解构，不能随意使用。会破坏他的响应式特性！`对就是这句话，那么我上面写出来的代码就是被这句话说中了.

* * *

## 解决方案：

第一个问题我们用`storeToRefs` 来解决，或者就不进行解构，不结构的话是有一点书写麻烦

```pinia
import { storeToRefs } from "pinia";

const system = useSystem();
const { isNewProject, isOpenEdit } = storeToRefs(system)
```

第二个问题要想解决，那就是不要试图去解构props, 这里可以扩展一个知识点，就是用`toRefs`来解构，被它解构完的属性会具有ref特性，也具备了响应式，但是会使props的属性与父组件的响应式断开连接，所以在搞清楚这个问题以后，我们在组件通信上或许就有了更笃定的想法。

## Tip

最后推荐有时间的同学能去读下[这位大神的文章](https://blog.csdn.net/lunahaijiao/article/details/125863270?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2~default~CTRLIST~Rate-1-125863270-blog-115365262.pc_relevant_3mothn_strategy_recovery&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2~default~CTRLIST~Rate-1-125863270-blog-115365262.pc_relevant_3mothn_strategy_recovery&utm_relevant_index=1)

以上仅代表个人学习过程观点，如有错误希望能够进一步交流，感谢这个社区。
