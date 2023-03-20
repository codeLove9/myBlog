---
date: 2021-02-26
title: Home 模板文件编写
category: theme
tags:
  - VuePress
---

> 从本篇开始我们将引入官方的 [vuepress-plugin-blog](https://vuepress-plugin-blog.ulivz.com/) 插件, `blog`插件封装了一系列实用功能, 用它来做博客的自定义主题可以省心不少。

<!-- more -->

## blog插件功能

- 分类: 强大的分类系统让你快速将贴文分类。
- 分页: 极其简单的开箱即用的分页功能。
- 客户端 API: 透过客户端 API 轻松地写一个博客主题。

## blog插件安装

``` sh
yarn add -D @vuepress/plugin-blog
# OR npm install -D @vuepress/plugin-blog
```

## 引入blog插件

在博客入口文件中进行配置:

``` js {5-10}
// .vuepress/theme/index.js
module.exports = (themeConfig, ctx) => {
  return {
    // ...
    plugins: [
      '@vuepress/blog',
      {
        /* options */
      },
    ]
  }
}
```

## 开始编写模板

先看一下首页模板我们需要达到的2个目标:

- [x] 文章列表
- [x] 文章分页

首页现在的样子:

![截图](https://80shuo.com/images/learning/home.png)

### 添加文章列表

轮到`blog`插件君出场了, 只需要简单的配置下`directories`选项:

``` js {8-14}
// .vuepress/theme/index.js
module.exports = (themeConfig, ctx) => {
  return {
    // ...
    plugins: [
      '@vuepress/blog',
      {
        directories: [
          {
            id: 'post',
            dirname: '_post', // 对应文章存放目录 与.vupress目录同级
            path: '/', // 文章列表页路径, 这里是首页
          }
        ]
      }
    ]
  }
}
```

配置后其实Home模板文件的文章列表功能已经实现完成了🙈,没错`blog`插件君默默的在后方帮我们解决了列表, 剩下的只需要把它搬到前台来。

为了验证,我们先在`_post`目录下新增6篇文章:

```
_post
├── one.md
└── two.md
└── ...
└── six.md
```

然后编写Home模板文件:

``` vue
<template>
  <div>
    <ul>
      <li v-for="item in $pagination.pages">
        <router-link :to="item.path">{{item.title}}</router-link>
      </li>
    </ul>
  </div>
</template>
```

运行结果如下:

![文章列表截图](https://80shuo.com/images/learning/home-article-list.png)

![devtools截图](https://80shuo.com/images/learning/dev-tools.png)

::: tip
`blog`插件君在后方处理完后会将数据暴露到计算属性`$pagination`中,在文档`Client API`中可查阅.
`$pagination.pages`会列出当前路由页面匹配到的文章列表,在vue组件中接收后用`v-for`指令循环出来就得到了我们需要的结果.
前面提到过整个开发过程和普通的Vue应用区别不大,官方的调试工具`Devtools`一样可以使用,在开发的时候能方便不少.
:::

### 添加分页

🙄没错,`blog`插件君继续包揽, 我们仅需添加分页配置项:

``` js {16-18}
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
          }
        }
      ]
    ]
  }
}
```

添加配置后,`blog`插件君在后方会帮我们处理好分页,剩下的依旧需要我们搬到前台, 这次`blog`插件君会派出一个小弟`Pagination`来协助我们编写Home组件:

``` vue {8,11-18}
<template>
  <div>
    <ul>
      <li v-for="item in $pagination.pages">
        <router-link :to="item.path">{{item.title}}</router-link>
      </li>
    </ul>
    <Pagination v-if="$pagination.length > 1"/>
  </div>
</template>
<script>
import { Pagination } from '@vuepress/plugin-blog/lib/client/components';
export default {
  components: {
    Pagination
  }
}
</script>
```

运行效果:

![分页截图](https://80shuo.com/images/learning/home-pagination.png)

你发现分页按钮自带了绿色样式...不存在,后期覆盖样式即可

## 最后

至此,Home模板文件大体就完成了,整体功能基本上都依赖于对`blog`插件选项的配置。此外,我们还运用了插件提供的内置组件`Pagination`,轻松地完成了列表和分页功能。
