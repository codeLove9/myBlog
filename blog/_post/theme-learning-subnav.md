---
date: 2021-03-11
title: VuePress主题教程 --SubNav模板编写
category: theme
tags:
  - VuePress
---

> SideBar是一个复合模板, `FooterBar`,`NavBar`, `SubNav`均包含在里面, 我们已经完成了`NavBar`, 剩下的`SubNav`是对站点的分类、标签及文章的简易统计和快速入口,`FooterBar`是用来放一些社交媒体链接及版权信息。

<!-- more -->

## SubNav

我们先来编写`SubNav`模板,想下可以从哪里获取这些统计数据,没错,还是`blog`插件君.

在他的加持下,只需简单的三步便可完成我们想要的功能。

1. 添加插件配置:

``` js {20-41}
// .vuepress/theme/index.js
module.exports = (themeConfig, ctx) => {
  return {
    // ...
    plugins: [
      [
        '@vuepress/blog',
        {
          directories: [
            {
              id: 'post',
              dirname: '_post',
              path: '/'
            }
          ],
          globalPagination: {
            lengthPerPage: 5,
          },
          frontmatters: [
            {
              id: "tag",
              keys: ['tag', 'tags'],
              path: '/tags/',
              frontmatter: { title: 'Tag' },
              pagination: {
                lengthPerPage: 10
              }
            },
            {
              id: "category",
              keys: ['category', 'categories'],
              path: '/categories/',
              frontmatter: { title: 'Category' },
              pagination: {
                lengthPerPage: 10,
                prevText: '',
                nextText: ''
              }
            }
          ]
        }
      ]
    ]
  }
}
```

2. 给文章添加frontmatter字段:

``` md {4-8}
---
date: 2021-03-11
title: two
category: theme
tags:
  - course
  - vuepress
---
## two 
```

``` md {3-6}
---
date: 2021-03-03
categories:
  - theme
tags:
  - vuepress
---
## five 
```

`tags`和`categories`与`blog`插件配置中相对应。

3. 编写.vue文件

``` vue
// docs/.vuepress/theme/components/SubNav.vue
<template>
  <div class="subnav">
    <router-link to="/archives">文章总数:{{count}}</router-link>
    <router-link to="/categories">分类:{{$category.length}}</router-link>
    <router-link to="/tags">标签: {{$tag.length}}</router-link>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      let list = this.$site.pages.filter(item => {
        return item.id === 'post';
      })
      return list.length;
    }
  }
}
</script>

<style>

</style>
```

`$category`、`$tag`均为`blog`插件暴露到全局的计算属性,通过它俩我们很容易就得到了分类和标签的统计;文章总数则是通过默认的全局计算属性`$site`拿到全部的文档,然后再过滤id为post的文章进行计数。

运行结果如下:

![截图](https://80shuo.com/images/learning/subnav.png)

## 最后

