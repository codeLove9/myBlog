---
date: 2021-02-25
title: VuePress 模板文件和布局
category: theme
tags:
  - VuePress
---

> 在 `VuePress` 中 `Markdown` 文件是元数据（页面内容、配置等）的提供者，而布局组件负责消费他们。VuePress中的模板文件指的就是普通的`Vue组件`,它可以配合布局组件共同处理这些元数据,渲染出我们的主题页面。从本篇开始,假设你已具备Vue应用的开发基础, 如果没有接触过Vue开发请先移步[Vue官网](https://cn.vuejs.org/v2/guide/)。

<!-- more -->

## 开始之前

为了方便演示,我们在先前基础上添加以下一些内容:

1. 给主题添加一个入口文件

``` js
// .vuepress/theme/index.js
module.exports = (themeConfig, ctx) => {
  return {
     // ...
  }
}
```
2. 给文档添加配置文件

``` js
module.exports = {
  title: 'hello vuepress',
  description: '我的第一个vupress站点',
  port: 8088,
  theme: require('./theme/index'),
  themeConfig: {
    copyright: `© ${new Date().getFullYear()} ❤️ <a target="_blank" rel="external nofollow noopener" href="https://17ria.com/">Neil Chen</a>`
  }
}
```

添加的配置是为了给主题里的模板文件和布局组件提供数据源,经过VuePress内部处理,会映射为若干`全局的计算属性`[^first]

## 以首页为例

![layout](https://80shuo.com/images/learning/layout.svg)

上图是模板文件和布局的示意图, 可以看出首页由3个模板文件`SideBar.vue`、`FooterBar.vue`、 `Home.vue` 和默认的 `Layout.vue` 布局组件 共同构成。

### SideBar组件

``` vue
<template>
  <div>
    SideBar {{$site.title}}
    <FooterBar/>
  </div>
</template>
<script>
import FooterBar from './FooterBar'
export default {
  components: {
    FooterBar
  }
}
</script>
```
### Home组件

``` vue
<template>
  <div>Home</div>
</template>
```
### FooterBar组件

``` vue
<template>
  <div>FooterBar
    <p class="copyright" v-html="$themeConfig.copyright"></p>
  </div>
</template>
```

### Layout组件

``` vue
<template>
  <div class="theme-container">
    <SideBar/>
    <Home/>
  </div>
</template>
<script>
import Home from '../components/Home'
import SideBar from '../components/SideBar'
export default {
  components: {
    Home,
    SideBar
  }
}
</script>
```

## 最终渲染出来的首页HTML

``` html
<div class="theme-container">
  <div>
    SideBar hello vuepress
  <div>FooterBar
    <p class="copyright">© 2021 ❤️ <a target="_blank" rel="external nofollow noopener" href="https://17ria.com/">Neil Chen</a></p></div>
  </div>
  <div>Home</div>
</div>
```

## 最后

到此,一个首页的框架结构就完成了,其它页面也是一样的原理。我们发现编写VuePress主题的时候,和开发Vue应用是非常相似的,因为本质上vuepress就是一个vue的同构应用。VuePress给了我们很大的自由,在多数情景下可以掌控到DOM元素的颗粒度,让我们在写主题样式时可以大刀阔斧。

[^first]: **全局的计算属性**

    在 VuePress 中，内置了一些核心的计算属性，以供默认主题 或自定义主题使用


