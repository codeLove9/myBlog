---
date: 2021-03-30
title: VuePress主题教程 -- Archive文章归档页
category: theme
tags:
  - VuePress
---

> 本篇我们来实现文章归档页,关键点还是涉及全局计算属性的运用,同时借助了相关插件api来动态生成归档页并注入页面类型。

<!-- more -->

## 生成归档页并动态注入页面类型

``` js
// docs/.vuepress/theme/plugin/util/index.js

const { path } = require('@vuepress/shared-utils')

module.exports = {
  // ...
  extendPageData($page) {
    if ($page.path === '/archives/') {
      return $page.pageType = 'archive';
    }
  },
  additionalPages() {
    const pages = [{
      path: '/archives/',
      frontmatter: {
        title: '文档归档'
      }
    }];
    return pages;
  }
}
```

## 改造Layout布局组件

``` vue {6,13,21}
// docs/.vuepress/theme/layouts/Layout.vue
<template>
  <div class="theme-container">
    <SideBar/>
    <Post v-if="$page.pid === 'post'"/>
    <Archive v-else-if="$page.pageType === 'archive'"/>
    <Home v-else />
    <SvgSprite/>
  </div>
</template>
<script>
import Post from '../components/Post'
import Archive from '../components/Archive'
import Home from '../components/Home'
import SideBar from '../components/SideBar'
import SvgSprite from '../components/SvgSprite.vue'
export default {
  name: 'Layout',
  components: {
    Home,
    Archive,
    SideBar,
    Post,
    SvgSprite
  }
}
</script>
```


## 编写Archive模板

``` vue
// docs/.vuepress/theme/components/Archive.vue
<template>
  <div class="theme-main__inner archive">
    <ul class="archive__list">
      <li class="archive__item" v-for="item of archiveList" :key="item.year">
        <h2 class="archive__year">{{item.year}}</h2>
        <div class="archive__sub-item" v-for="(subItem, key) of item.list" :key="key">
          <div class="archive__leaf-list">
            <a class="archive__leaf-item" :href="leafItem.path" v-for="leafItem in subItem" :key="leafItem.key">
              <span class="archive__date">{{leafItem.date}}</span>
              <span class="archive__title">{{leafItem.title}}</span>
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
const DATE_MAP = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export default {
  name: 'Archive',
  computed: {
    archiveList() {
      let res = {};
      let tmp = [];
      let list = this.$site.pages.filter(item => {
        return item.pid === 'post';
      });
      list = list.sort((a,b) => {
        let time1 = new Date(a.frontmatter.date);
        let time2 = new Date(b.frontmatter.date);
        return time2 - time1;
      })
      list.map(item => {
        const date = new Date(item.frontmatter.date)
        const year = date.getFullYear();
        const month = date.getMonth();
        const monthKey = DATE_MAP[month]
        const day = `${date.getDate()}`;
        res[year] || (res[year] = {});
        res[year][monthKey] || (res[year][monthKey] = []);
        item.date = `${`${month + 1}`.padStart(2, 0)}-${day.padStart(2, 0)}`;
        res[year][monthKey].push(item);
      })
      for (let [key, item] of Object.entries(res)) {
        tmp.push({
          year: +key,
          list: item
        });
      }
      tmp.sort((a, b) => {
        return b.year - a.year;
      })
      return tmp;
    }
  }
}
</script>
<style lang="stylus">
.archive
  border-radius 6px
  padding 2.15rem
  &__list
    margin 0
    padding-left 0
    list-style none
    border-color inherit
  &__item
    &:first-child
      margin-top -2.15rem
    &:last-child
      margin-bottom -2.15rem
      padding-bottom 6rem
    border-color inherit
    position relative
    padding 2.15rem 0
  &__year
    margin 0
    font-size 1.78571rem
    position relative
    line-height 2.4em
  &__sub-item
    display flex
    align-items flex-start
    &:hover
      .archive__month:after
        opacity 1
  &__month-wrap
    display flex
    justify-content space-between
    align-items flex-start
    width 3rem
    transform scale3d(.75,.75,1)
    transform-origin center top
  &__leaf-item
    position relative
    display flex
    padding .5rem 0
    padding-left 1.5rem
    line-height 2rem
    align-items flex-start 
    &:after
      position absolute
      content '-'
      left 0
      width 1.5rem
      text-align center
  &__date
    white-space nowrap
    letter-spacing 1px
    font-size .85rem
    opacity .63
    padding-right .5rem
  &__title
    font-size 1.15rem
</style>
```

::: tip
vuepress的全局计算属性`$site.pages`包含了所有文档页,配合blog插件君的`pid`标识,我们就可以筛选出所有博客文章。
:::


运行结果如下:

![截图](https://80shuo.com/images/learning/archive.png)