---
title: 返回原页面数据不刷新问题
date: 2023-03-31
author: XiaoChen
category: frontend
tags:
  - JS
---

> 为什么从一个页面点击进入另一个页面更新状态再返回原页面后不刷新？

## 问题

当在矩阵列表点击产品进入产品详情页时，在详情页中添加收藏，返回矩阵页后，矩阵列表产品收藏状态没有更新

## 解决方案

1. ProductItem组件中点击收藏按钮时，调用自定义事件`this.$emit('updateCollectionList')`

2. ProductList组件中在data中创建一个`collectionList`的数组用来存储收藏列表

3. ProductList组件接收自定义事件并在methods中定义一个自定义事件的回调函数，函数中调用查询收藏列表的接口，返回值赋值给`collectionList`

4. watch中监听collectionList的变化，一但变化了就拿collectionList的productId和存储所有产品的listData中的productId作比较，如果全等了，修改收藏值为true，反之则为false

5. 在Matrix组件中给ProductList组件打上ref，在created钩子中使用封装的ViewWillAppear方法，在返回页面的时候直接调用`this.refs.productList.updateCollectionList`来刷新响应值
