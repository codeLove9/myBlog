---
date: 2021-04-06
title: VuePress主题教程 -- Tag标签页
category: theme
tags:
  - VuePress
---

> Tag标签页和分类页非常相似,也是标签汇总页加上具体标签的文章列表页组合而成,同样是借助vuepress的`extendPageData`插件api动态注入页面类型和blog插件君打的一套组合拳。

<!-- more -->

## 目标效果

- [x] 通过设置文档的`$frontmatter`的`tag或tags`key,自动汇总到标签页;
- [x] 对每个标签进行文章计数;
- [x] 点击标签进入具体标签的文章列表页;
- [x] 文章列表页支持分页;

## blog插件配置

在[**SideBar模板(一)--SubNav**](/post/2021/03/11/theme-learning-subnav.html)一篇中,我们已经做过配置;

## 动态注入页面类型

``` js {12-16}
// docs/.vuepress/theme/plugin/util/index.js

module.exports = {
  // ...
  extendPageData($page) {
    if ($page.path === '/archives/') {
      return $page.pageType = 'archive';
    } else if ($page.path === '/categories/') {
      return $page.pageType = 'category';
    } else if (/^\/categories\/\w/.test($page.path)) {
      return $page.pageType = 'categoryItem';
    } else if ($page.path === '/tags/') {
      return $page.pageType = 'tag';
    } else if (/^\/tags\/\w/.test($page.path)) {
      return $page.pageType = 'tagItem';
    }
  }
}
```

## 改造Layout布局组件

``` vue {9,10,20,21,32,33}
// docs/.vuepress/theme/layouts/Layout.vue
<template>
  <div class="theme-container">
    <SideBar/>
    <Post v-if="$page.pid === 'post'"/>
    <Archive v-else-if="$page.pageType === 'archive'"/>
    <Category v-else-if="$page.pageType === 'category'" />
    <CategoryItem v-else-if="$page.pageType === 'categoryItem'" />
    <Tag v-else-if="$page.pageType === 'tag'" />
    <TagItem v-else-if="$page.pageType === 'tagItem'" />
    <Home v-else />
    <SvgSprite/>
  </div>
</template>
<script>
import Post from '../components/Post'
import Archive from '../components/Archive'
import Category from '../components/Category'
import CategoryItem from '../components/CategoryItem'
import Tag from '../components/Tag.vue'
import TagItem from '../components/TagItem.vue'
import Home from '../components/Home'
import SideBar from '../components/SideBar'
import SvgSprite from '../components/SvgSprite.vue'
export default {
  name: 'Layout',
  components: {
    Home,
    Archive,
    Category,
    CategoryItem,
    Tag,
    TagItem,
    SideBar,
    Post,
    SvgSprite
  }
}
</script>
```


## 编写Tag模板

``` vue
// docs/.vuepress/theme/components/Tag.vue
<template>
  <div class="theme-main__inner theme-tag">
    <div class="theme-tag__list">
      <h2 class="theme-tag__title">{{$tag.list.length}} tags in total</h2>
      <router-link class="theme-tag__link" v-for="tag in $tag.list" :key="tag.name" :to="tag.path"># {{ tag.name }} [{{tag.pages.length}}]</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tag'
}
</script>
<style lang="stylus">
.theme-tag
  border-radius: 6px;
  padding: 2.15rem;
  &__title
    margin 0 0 1.5rem 0
    font-size: 1.78571rem;
    font-weight normal
  &__link
    display inline-block
    padding: 0 1em;
    border-radius: 3px;
    line-height: 2.4;
    margin: 0 1rem 1rem 0;
    &:hover
      color #333
  
</style>
```

::: tip
`$tag`是blog插件君暴露的计算属性,包含了全站的标签信息,遍历list输出所有标签,`item.pages`包含了具体标签下的文档页数组,它的length正好就是我们需要的具体标签下的文章计数。
:::


运行结果如下:

![截图](https://80shuo.com/images/learning/tag.png)

## 编写TagItem模板

``` vue
// docs/.vuepress/theme/components/TagItem.vue
<template>
  <div class="theme-main__inner tag-item">
    <h1 class="tag__title"># {{$currentTag.key}}</h1>
    <div class="post-list">
      <a class="post-list__item" :href="item.path" v-for="item in postList" :key="item.date">
        <span class="post-list__date">{{item.date}}</span>
        <span class="post-list__title">{{item.title}}</span>
      </a>
    </div>
    <Pagination v-if="$pagination.length > 1"/>
  </div>
</template>
<script>
import { Pagination } from '@vuepress/plugin-blog/lib/client/components';
export default {
  name: 'TagItem',
  components: {
    Pagination
  },
  computed: {
    postList() {
      let list = [];
      this.$pagination.pages.map(item => {
        const date = new Date(item.frontmatter.date);
        list.push({
          ...item,
          date: `${date.toLocaleDateString()}`
        })
      });
      list.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      })
      return list;
    }
  }
}
</script>
<style lang="stylus">
.tag-item
  border-radius: 6px;
  padding: 2.15rem;
</style>
```

::: tip
`$currentTag`是blog插件君给暴露的计算属性,顾名思义表示当前标签。`$pagination`是blog插件君给暴露的另外个有用的属性,`$pagination.pages`包含了当前标签下的文章列表数组,这里对显示时间格式及排序做了下简单的处理。`<Pagination/>`组件是blog插件君提供的内置分页组件,我们可以直接拿出来使用。
:::

运行结果如下:

![截图](https://80shuo.com/images/learning/tag-item.png)

## 最后

至此,标签页就差不多完成了,基本与分类页是一个模子,计算属性和blog插件君一如既往的可靠。