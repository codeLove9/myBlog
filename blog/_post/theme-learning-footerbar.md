---
date: 2021-03-17
title: VuePress主题教程 -- FooterBar模板编写
category: theme
tags:
  - VuePress
---

> 接上一篇,我们完成剩下的用来放一些社交媒体链接及版权信息的`FooterBar`模板。本篇内容会比较简单,主要会利用vue的条件渲染对常用的链接类型进行区别适配,编写一个图标组件用来媒体图标的显示。版权信息之类的是用`v-html`指令接收,可以自己自定义任意的HTML。

<!-- more -->

## 数据格式定义

这个随自己心意,下面是我习惯的样子:

``` js {12-29}
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
    social: [
      {
        type: 'email',
        link: 'cmgddd@163.com'
      },
      {
        type: 'github',
        link: '80maker'
      },
      {
        type: 'qq',
        link: '//qm.qq.com/cgi-bin/qm/qr?k=5qf0UGmRJWavJGOgo5nemY2BezuGKa-V&jump_from=webapi'
      },
      {
        type: 'feed',
        link: '/rss.xml'
      }
    ],
    copyright: `© ${new Date().getFullYear()} ❤️ <a target="_blank" rel="external nofollow noopener" href="https://17ria.com/">Neil Chen</a>`
  }
}
```

## 编写icon组件

> 这里利用了`svg symbol`方案来显示svg矢量图标,感兴趣的可以阅读这里[未来必热：SVG Sprites技术介绍](https://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/) 

1. SvgSprite.vue

``` vue
// docs/.vuepress/theme/components/SvgSprite.vue
<template>
  <svg style="display:none;">
    <symbol id="theme-icon-github" viewBox="0 0 1024 1024">
      <path
        d="M512.465 98.744c-236.05-2.401-429.41 187.034-431.998 423.242 0.894 183.912 120.176 346.283 295.332 402.018 21.6 3.93 29.451-9.04 29.451-20.436v-71.916c-120.17 25.545-145.7-56.59-145.7-56.59a112.364 112.364 0 0 0-47.914-62.089c-39.272-25.937 3.141-25.545 3.141-25.545a90.702 90.702 0 0 1 65.978 43.624c25.358 43.993 81.26 59.548 125.678 34.976a91.569 91.569 0 0 1 27.487-56.59c-95.825-10.615-196.36-46.768-196.36-209.067a163.13 163.13 0 0 1 43.591-114.358 148.652 148.652 0 0 1 4.32-111.609c15.896-35.223 36.525-11.397 117.815 43.229a419.24 419.24 0 0 1 216.002 0c82.471-54.626 117.82-43.229 117.82-43.229a148.657 148.657 0 0 1 4.32 111.61 163.145 163.145 0 0 1 45.945 113.57c0 162.695-101.321 198.458-196.36 209.067a98.273 98.273 0 0 1 29.452 78.594v115.933c0 13.752 7.856 24.756 29.457 20.43 174.63-56.071 293.466-218.106 294.545-401.622C941.878 285.778 748.52 96.343 512.465 98.744"
        fill="#231F20" p-id="2040"></path>
    </symbol>
    <symbol id="theme-icon-qq" viewBox="0 0 1024 1024">
      <path
        d="M121.6 582.4c-32 83.2-38.4 160-12.8 172.8C128 768 160 742.4 185.6 704c12.8 44.8 38.4 89.6 76.8 121.6-38.4 12.8-64 38.4-64 70.4 0 44.8 70.4 83.2 153.6 83.2 76.8 0 140.8-32 153.6-70.4h19.2c12.8 38.4 76.8 70.4 153.6 70.4 83.2 0 153.6-38.4 153.6-83.2 0-25.6-25.6-51.2-64-70.4 38.4-32 64-76.8 76.8-121.6 25.6 44.8 57.6 64 70.4 57.6 25.6-12.8 19.2-89.6-12.8-172.8-25.6-64-64-108.8-89.6-121.6v-12.8c0-25.6-6.4-44.8-19.2-64V384c0-12.8 0-19.2-6.4-32C780.8 179.2 678.4 51.2 512 51.2c-166.4 0-268.8 134.4-275.2 300.8-6.4 6.4-6.4 12.8-6.4 25.6v6.4c-12.8 19.2-19.2 38.4-19.2 64v12.8c-25.6 12.8-64 57.6-89.6 121.6z m0 0"
        p-id="2789"></path>
    </symbol>
    <symbol id="theme-icon-feed" viewBox="0 0 1024 1024">
      <path d="M320.374394 768q0 45.714286-32 77.714286t-77.714285 32-77.714286-32-32-77.714286 32-77.714286 77.714286-32 77.714285 32 32 77.714286z m292.571429 70.285714q1.142857 16-9.714286 27.428572-10.285714 12-26.857143 12H499.231537q-14.285714 0-24.571428-9.428572t-11.428572-23.714285q-12.571429-130.857143-105.428571-223.714286T134.08868 515.428571q-14.285714-1.142857-23.714286-11.428571T100.945823 479.428571V402.285714q0-16.571429 12-26.857143 9.714286-9.714286 24.571428-9.714285h2.857143q91.428571 7.428571 174.857143 46T463.231537 515.428571q65.142857 64.571429 103.714286 148t46 174.857143z m292.571428 1.142857q1.142857 15.428571-10.285714 26.857143-10.285714 11.428571-26.285714 11.428572h-81.714286q-14.857143 0-25.428571-10T750.660109 843.428571q-6.857143-122.857143-57.714286-233.428571t-132.285714-192-192-132.285714T135.231537 227.428571q-14.285714-0.571429-24.285714-11.142857T100.945823 191.428571V109.714286q0-16 11.428571-26.285715 10.285714-10.285714 25.142857-10.285714h1.714286q149.714286 7.428571 286.571429 68.571429T668.945823 309.714286q106.857143 106.285714 168 243.142857t68.571428 286.571428z" p-id="3693"></path>
    </symbol>
    <slot name="append" />
  </svg>
</template>
<script>
export default {
  name: 'SvgSprite'
}
</script>
```

2. Icon.vue

``` vue
// docs/.vuepress/theme/global-components/Icon.vue
<template>
  <svg class="theme-icon" :class="`theme-icon-${icon}`"><use :xlink:href="`#theme-icon-${icon}`"></use></svg>
</template>
<script>
export default {
  name: 'Icon',
  props: {
    icon: {
      type: String
    }
  }
}
</script>
<style lang="stylus">
.theme-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}
</style>
```

3. 在layout中引入SvgSprite组件

``` vue {6,13,20}
<template>
  <div class="theme-container">
    <SideBar/>
    <Post v-if="$page.pid === 'post'"/>
    <Home v-else />
    <SvgSprite/>
  </div>
</template>
<script>
import Post from '../components/Post'
import Home from '../components/Home'
import SideBar from '../components/SideBar'
import SvgSprite from '../components/SvgSprite.vue'
export default {
  name: 'Layout',
  components: {
    Home,
    SideBar,
    Post,
    SvgSprite
  }
}
</script>
```

::: tip
SvgSprite.vue中使用了vue语法--具名插槽,为的是方便在主题外部添加自定义图标(Svg Symbol),需要在外部定义一个复合组件来扩展主题内的SvgSrpite.vue组件,并借助插件机制动态注入。本篇先略过,后续会单独展开。
:::

## 编辑FooterBar模板

``` vue
<template>
  <div class="theme-footer">
    <div class="social-links">
      <template v-for="item in $themeConfig.social">
        <a v-if="item.type === 'email'" :key="item.type" target="_blank" rel="external nofollow noopener"
        :title="`${item.type}`" :href="`mailto:${item.link}`">
          <Icon :icon="item.type"/>
        </a>
        <a v-else-if="item.type === 'github'" :key="item.type" target="_blank" rel="external nofollow noopener"
        :title="`${item.type}`" :href="`https://github.com/${item.link}`">
          <Icon :icon="item.type"/>
        </a>
        <a v-else
          :key="item.type"
          target="_blank"
          rel="external nofollow noopener"
          :title="`${item.type}`" :href="`${item.link}`">
          <Icon :icon="item.type"/>
        </a>
      </template>
    </div>
    <p class="copyright" v-html="$themeConfig.copyright"></p>
  </div>
</template>
<script>
export default {
  name: 'FooterBar'
}
</script>
```

运行结果如下:

![截图](https://80shuo.com/images/learning/footerbar.png)

## 最后

博客的底部模板至此就完成了,你可以继续扩展你想要的功能,比如备案信息、底部导航等等。