---
date: 2021-03-03
title: VuePress 主题教程 -- NavBar 模板文件编写
category: theme
tags:
  - VuePress
---

> 导航模块是博客站点必备的一个元素,我们将参考VuePress默认主题来实现导航模块。

<!-- more -->

## 开始编写

导航将实现的功能

- [x] 自定义导航文案及链接。
- [x] 页面激活时进行高亮显示。
- [x] 自动区分内、外部链接。

导航数据来源于主题配置项,我们先配置上数据:

``` js {8-12}
// docs/.vuepress/config.js
module.exports = {
  title: 'hello vuepress',
  description: '我的第一个vupress站点',
  port: 8088,
  theme: require('./theme/index'),
  themeConfig: {
    nav: [
      { text: '🏠 Home', link: '/' },
      { text: '🏠 内部链接', link: '/2021/03/02/one/' },
      { text: '🔥 外部链接(External)', link: 'https://google.com' },
    ],
    copyright: `© ${new Date().getFullYear()} ❤️ <a target="_blank" rel="external nofollow noopener" href="https://17ria.com/">Neil Chen</a>`
  }
}
```

::: tip
在这里导航菜单数据格式用的是对象数组,足够灵活,方便扩展。 eg.假设后面导航需要设置icon,只须加个icon的key扩展即可。
:::

## 引入工具函数

区分内、外部链接的方法函数我们可以写在工具函数里

``` js
// /Users/mingangchen/Documents/spare_time/vuepress-starter/docs/.vuepress/theme/utils/help.js (git)
export const outboundRE = /^[a-z]+:/i

export function isExternal (path) {
  return outboundRE.test(path)
}
```

继续编写NavBar模板文件,得益于Vue组件系统的加持,我们把导航菜单的结点提取成一个子组件`NavLink`来负责一部分渲染职责。

``` vue
// docs/.vuepress/theme/components/NavLink.vue
<template>
  <a
    v-if="isExternal"
    :href="item.link"
    class="nav-link external"
    :target="target"
    :rel="rel"
  >
    {{ item.text }}
    <OutboundLink v-if="isBlankTarget" />
  </a>
  <router-link v-else class="nav-link" :to="item.link">{{item.text}}</router-link>
</template>

<script>
import { isExternal } from '../utils/help'
export default {
  name: 'NavLink',
  props: {
    item: {
      required: true
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.item.link)
    },
    isBlankTarget () {
      return this.target === '_blank'
    },
    target () {
      if (this.item.target) {
        return this.item.target
      }
      return isExternal(this.item.link) ? '_blank' : ''
    },
    rel () {
      if (this.item.rel) {
        return this.item.rel
      }
      return this.isBlankTarget ? 'noopener noreferrer' : null
    }
  }
}
</script>
<style lang="stylus">
.nav-link
  &.router-link-exact-active
    background-color yellow
    color red
</style>
```

主题教程开始时有介绍VuePress的其中一个组成部分是`Vue Router`。依托于`Vue Router`,导航的高亮显示只需要样式便可以完成,假如当前页面的路由精确匹配到导航里配置的菜单时,`<a>`标签会自动添加名为`router-link-exact-active`的className。详细请参考[vue-router文档](https://router.vuejs.org/zh/api/#exact-active-class)

::: tip
`OutboundLink`(用来标识外部链接)也是vuepress的内置组件,可以直接使用。样式我们这里用的`stylus`(vuepress的默认样式预处理工具),`stylus`的语法很包容,既可以用完整的原生css格式也可以用极简的python缩进风格,不清楚的可以参考[stylus文档](https://stylus-lang.com/)。
:::

## 接着在NavBar组件中引用NavLink

``` vue
// docs/.vuepress/theme/components/NavBar.vue
<template>
  <nav>
    <NavLink v-for="item in $themeConfig.nav" :item="item"/>
  </nav>
</template>

<script>
import NavLink from './NavLink'
export default {
  name: 'NavBar',
  components: {
    NavLink
  }
}
</script>
```

## 最后将NavBar放置到SideBar中

``` vue {5,11,16}
// docs/.vuepress/theme/components/SideBar.vue
<template>
  <div>
    SideBar {{$site.title}}
    <NavBar/>
    <FooterBar/>
  </div>
</template>
<script>
import FooterBar from './FooterBar'
import NavBar from './NavBar'
export default {
  name: 'SideBar',
  components: {
    FooterBar,
    NavBar
  }
}
</script>
```

运行效果:

![分页截图](https://80shuo.com/images/learning/navbar.png)

## 结束

至此,NavBar模板文件就完成了,相对简陋。还有好些没有继续展开,比如默认主题的导航下拉菜单。
