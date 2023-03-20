---
date: 2021-03-31
title: VuePress主题教程 -- Category分类页
category: theme
tags:
  - VuePress
---

> 分类页和上一篇的归档页一样,都是方便检索文章博客的必备功能页,与之类似,我们同样是借助vuepress的`extendPageData`插件api动态注入页面类型,同时配合blog插件君的文档分类功能共同完成分类页。

<!-- more -->

## 目标效果

- [x] 通过设置文档的`$frontmatter`的`category或categories`key,自动汇总到分类页;
- [x] 对每个分类进行文章计数;
- [x] 点击分类进入具体分类的文章列表页;
- [x] 文章列表页支持分页;

## blog插件配置

在[**SideBar模板(一)--SubNav**](/post/2021/03/11/theme-learning-subnav.html)一篇中,我们已经做过配置;

## 动态注入页面类型

``` js {8-12}
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
    }
  }
}
```

## 改造Layout布局组件

``` vue {7,8,16,17,26,27}
// docs/.vuepress/theme/layouts/Layout.vue
<template>
  <div class="theme-container">
    <SideBar/>
    <Post v-if="$page.pid === 'post'"/>
    <Archive v-else-if="$page.pageType === 'archive'"/>
    <Category v-else-if="$page.pageType === 'category'" />
    <CategoryItem v-else-if="$page.pageType === 'categoryItem'" />
    <Home v-else />
    <SvgSprite/>
  </div>
</template>
<script>
import Post from '../components/Post'
import Archive from '../components/Archive'
import Category from '../components/Category'
import CategoryItem from '../components/CategoryItem'
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
    SideBar,
    Post,
    SvgSprite
  }
}
</script>
```


## 编写Category模板

``` vue
// docs/.vuepress/theme/components/Category.vue
<template>
  <div class="theme-main__inner theme-category">
    <div class="theme-category__list">
      <h1 class="theme-category__title">{{$category.list.length}} categories in total</h1>
      <router-link class="theme-category__link" v-for="item in $category.list" :key="item.name" :to="item.path">▪ {{ item.name }} [{{item.pages.length}}]</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Category'
}
</script>
<style lang="stylus">
.theme-category
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
    transition: background-color .15s;
    margin: 0 1rem 1rem 0;
  
</style>
```

::: tip
`$category`是blog插件君暴露的计算属性,包含了全站的分类信息,遍历list输出所有分类,`item.pages`包含了具体分类下的文档页数组,它的length正好就是我们需要的具体分类下的文章计数。
:::


运行结果如下:

![截图](https://80shuo.com/images/learning/category.png)

## 编写CategoryItem模板

``` vue
// docs/.vuepress/theme/components/CategoryItem.vue
<template>
  <div class="theme-main__inner">
    <div class="category-item">
      <h1 class="category__title">▪ {{$currentCategory.key}}</h1>
      <div class="post-list">
        <a class="post-list__item" :href="item.path" v-for="item in postList" :key="item.path">
          <span class="post-list__date">{{item.date}}</span>
          <span class="post-list__title">{{item.title}}</span>
        </a>
      </div>
    </div>
    <Pagination v-if="$pagination.length > 1"/>
  </div>
</template>
<script>
import { Pagination } from '@vuepress/plugin-blog/lib/client/components';
export default {
  name: 'CategoryItem',
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
.category-item
  border-radius: 6px;
  padding: 2.15rem;
.post-list__item {
  display block
}

</style>
```

::: tip
`$currentCategory`是blog插件君给暴露的计算属性,顾名思义表示当前分类。`$pagination`是blog插件君给暴露的另外个有用的属性,`$pagination.pages`包含了当前分类当前分页下的文章列表数组,这里对显示时间格式及排序做了下简单的处理。`<Pagination/>`组件是blog插件君提供的内置分页组件,我们可以直接拿出来使用。
:::

运行结果如下:

![截图](https://80shuo.com/images/learning/category-item.png)

## 最后

至此,分类页就差不多完成了,我们发现计算属性是`VuePress`中的名角,几乎每篇都有他的身影。blog插件君就是靠计算属性提供了很多有用的特性,我们在制作自定义主题的时候也可以适当暴露计算属性来辅助我们完成一系列功能。动态注入`pageType`也可以说是计算属性的一种运用。