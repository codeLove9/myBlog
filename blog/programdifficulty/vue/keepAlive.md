---
date: 2023-10-20
title: 路由懒加载和原进原出
category: frontend
tags:
  - JS
---

## 方案

1. 给需要懒加载的路由的meta配置项加上`keepAlive`标识，标注这是一个懒加载路由。

```js
{
  title: '列表页',
  path: 'list',
  name: 'list',
  meta: {
    keepAlive: true  // 懒加载路由
  },
  component: () =>
    import('@/views/List')
},
{
  title: '详情页',
  path: 'detail',
  name: 'detail',
  component: () =>
    import('@/views/Detail')
}
.....
```

2. 路由组件中判断是否是懒加载组件，如果是给外层包上keep-alive标签开启懒加载

```js
<template>
  <div id="app">
    // 如果路由meta配置项中有keepAlive，即表示开启了路由懒加载
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    // 没有路由懒加载 
    <router-view v-if="!$route.meta.keepAlive"/></div>
  </div>
</template>
```

3. 列表页中：</br>
设置响应式数据isRefreshData作为是否重新发接口的标识，初始化为false。</br>
创建init初始化函数，发接口获取返回数据并把isRefreshData设置成false。</br>
activated懒加载激活生命周期中，如果isRefreshData是true，调用init函数。</br>
当从列表页点击返回按钮进入到首页时，把isRefreshData设置成true。</br>
点击卡片进入详情页时，获取当前页面的卷动值并存储在localStorage中。</br>
设置路由前置守卫，如果前置页面是后置页面详情页返回的，就获取localStorage中的页面卷动值并滚动到对应位置。</br>

4. 进入页面的触发顺序:
首页**第一次**进入列表页时：路由守卫直接放行，**mounted**里触发init函数，发交易获取数据并把isRefreshData置成true，数据正常展示。

列表页进入详情页时再返回列表页时：点击列表，存入当前卷动值并跳转，再从详情页返回，此时路由守卫检测到是从详情页返回，拿到存储里的卷动值并滚动到对应位置，激活activated生命周期判断isRefreshData为false，不做任何处理展示懒加载数据。

列表页先返回首页再进入列表页时：点击返回按钮，isRefreshData置成true并返回到首页，再次进入列表页，路由前置守卫直接放行，激活activated生命周期判断isRefreshData为true，执行init函数再次发接口刷新页面数据，并把isRefreshData值置为false。</br>
.....
以下是简洁代码：

```js
data() {
  list: [],
  isRefreshData: false
},
mounted() {
  this.init()
},
// 懒加载激活生命周期
activated() {
  isRefreshData && await this.init()
},
methods:{
  async init() {
    this.list = await getListData().catch(e => [])
  },
  // 跳转详情页
  goDetail() {
    // 获取页面卷动值并存储到sessionstorage
    const scrollTop = document.documentElement.scrollTop || document.pageYoffset || document.body.scrollTop || 0
    sessionstorage.setItem('listscrollTop', scrollTop)
    this.$router.push(name: 'Detail')
  },
  // 返回到首页
  back() {
    this.isRefreshData = true
    this.$router.push(name: 'Home')
  }
},
beforeRouteEnter(to, from ,next) {
  // 从详情页来
  if(from.path === 'detail') {
    // 放行的回调：拿到sessionstorage中的卷动值并滚动到这个高度
    next(vm =>{
      const listScrollTop = sessionstorage.getItem('listscrollTop', scrollTop)
      vm.$nextTick(() => {
        scrollT(0, listScrollTop || 0)
      })
    })
  }
  next()
}
```

## 总结

只有**第一次**进入页面时才会触发**mounted生命周期**，后来**再进入**都是触发的**activated懒加载激活生命周期。**可以根据这个特性，业务逻辑设置成只有从首页进入列表才刷新页面，详情页返回不刷新，这样就可以实现数据流正常以及原进原出，并且提升应用性能。
