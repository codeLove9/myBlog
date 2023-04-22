---
date: 2023-04-15
title: 由于获取不到内置计算属性this.$page.lastUpdated引起的npm run build打包报错
category: theme
tags:
  - VuePress
---

> npm run build打包报`Error in render: "TypeError: Cannot destructure property 'time' of 'this.$page.lastUpdated' as it is undefined."`

<!-- more -->

## 引言

今天写好新的md文件时，npm run serve运行起来没有问题，于是我commit到本地后npm run build打包，可是却报错了，报错图片如下

![image](/myBlog/blogImages/BuildFail.png)

提示`Error in render: "TypeError: Cannot destructure property 'time' of 'this.$page.lastUpdated' as it is undefined."`，然后让我在Post组件里找

我猜想是因为run serve运行起来没有问题，那就不是写法的问题，在run build打包的适合提示找不到`this.$page.lastUpdated`属性，就是打包时获取不到这个计算属性，那应该就与异步加载有关联了，于是我打开Post组件查找跟`this.$page.lastUpdated`有关的代码，具体代码如下

```vue
computed: {
    // 最近更新时间
    lastUpdated() {
      const { time } = this.$page.lastUpdated
      return time
    },
    // 距离现在的时间
    fromNow() {
      const { fromNow } = this.$page.lastUpdated
      return fromNow
    }
}
```

可以看到是在计算属性里获取`this.$page.lastUpdated`，计算属性里是同步的，于是我打算试试用别的方案获取

## 解决方案

众所周知，Vue里有一个生命周期钩子`mounted`，作用是在组件开始渲染模板时调用，于是我试想如果在这个钩子里获取的话，会不会就解决了这个问题

我开始用自己的思路修改代码，具体代码如下：

```vue
// 首先在data里定义这两个用于渲染模板里的响应式数据
data() {
  return {
    lastUpdated: '',
    fromNow: ''
  },
},
// 生命周期钩子中获取并赋值
mounted() {
  const { time, fromNow } = this.$page.lastUpdated
  this.lastUpdated = time
  this.fromNow = fromNow
}
```

问题解决！ 成功截图如下：

![image](/myBlog/blogImages/buildSuccess.png)
