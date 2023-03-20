---
date: 2021-03-02
title: Post 模板文件编写
category: theme
tags:
  - VuePress
---

> 上篇我们已经完成了文章列表页,但还看不到文章内容,本篇我们就来编写文章详情页来展示文章的内容及文章对应的一些元数据。eg.作者、发布日期、分类、标签等。

<!-- more -->

## 开始编写模板

先看一下文章模板我们需要达到的2个目标:

- [x] 文章元数据
- [x] 文章内容

### 文章元数据

元数据是通过配置md文档的`frontmatter`得到的, 可以像下面这样配置:

``` md {2-10}
<!-- docs/_post/one.md -->
---
date: 2021-03-02
author: XiaoChen
title: 文章标题
category: theme
tags:
  - course
  - VuePress
---
## one 

文章内容

```

得益于Vue的组件系统,我们可以把post模板进行拆分,`PostMeta`组件专职用来完成文章元数据的显示:

``` vue
// docs/.vuepress/theme/components/PostMeta.vue
<template>
  <div class="post-meta">
    <a href="#">author: {{$frontmatter.author}}</a>
    <a href="#">date: {{date}}</a>
    <a href="#">category: {{$frontmatter.category}}</a>
    <p>tags:</p>
    <ul>
      <li v-for="item in tags"><a href="#">#{{item}}</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    date() {
      return new Date(this.$frontmatter.date).toLocaleDateString()
    },
    tags() {
      let tags = this.$frontmatter.tags || [];
      return tags;
    }
  }
}
</script>
```

### 文章内容

这个比较简单,VuePress提供了一个内置组件`Content`用来接收当前的 .md 文件渲染的内容。我们直接在文章模板中引用即可。

``` vue
// docs/.vuepress/theme/components/Post.vue
<template>
  <div class="post">
    <h1 class="title" v-if="$frontmatter.title">{{$frontmatter.title}}</h1>
    <PostMeta/>
    <Content/>
    <PostNav/>
  </div>
</template>

<script>
import PostMeta from './PostMeta'
import PostNav from './PostNav'
export default {
  name: 'Post',
  components: {
    PostMeta,
    PostNav
  }
}
</script>
```

### 添加上一篇、下一篇导航

``` vue
// docs/.vuepress/theme/components/PostNav.vue
<template>
  <div class="post-nav">
    <div>上一篇: <router-link v-if="prevPost" :to="prevPost.path">{{prevPost.title}}</router-link><span v-else>无</span></div>
    <div>下一篇: <router-link v-if="nextPost" :to="nextPost.path">{{nextPost.title}}</router-link><span v-else>无</span></div>
  </div>
</template>

<script>
export default {
  name: 'PostNav',
  computed: {
    nextPost() {
      let list = this.getArticleList();
      const index = list.findIndex(item => {
        return item.path === this.$page.path;
      })
      if (index === -1) {
        return;
      }
      return list[index + 1];
    },
    prevPost() {
      let list = this.getArticleList();
      const index = list.findIndex(item => {
        return item.path === this.$page.path;
      })
      if (index === -1) {
        return;
      }
      return list[index - 1];
    }
  },
  methods: {
    getArticleList() {
      const pid = this.$page.pid;
      let list = this.$site.pages.filter(item => {
        return item.pid === pid;
      });
      list = list.sort((a,b) => {
        let time1 = new Date(a.frontmatter.date);
        let time2 = new Date(b.frontmatter.date);
        return time1 - time2;
      })
      return list;
    }
  }
}
</script>
```

这里依赖于`blog`插件给每篇文章的`$page`计算属性添加了名为`post`的pid标识,我们获取到了所有post文章,然后再通过时间排序获取上、下篇文章。

### 改造一下`Layout.vue`

为了正确渲染文章详情页面,我们得给它指定一个布局组件,这里直接选用之前创建的`Layout.vue`:

``` vue {5,6,10,14,18}
// docs/.vuepress/theme/layouts/Layout.vue
<template>
  <div class="theme-container">
    <SideBar/>
    <Post v-if="$page.pid === 'post'"/>
    <Home v-else />
  </div>
</template>
<script>
import Post from '../components/Post'
import Home from '../components/Home'
import SideBar from '../components/SideBar'
export default {
  name: 'Layout',
  components: {
    Home,
    SideBar,
    Post
  }
}
</script>
```

运行效果:

<!-- ![文章截图](/images/learning/post.png) -->
![文章截图](https://80shuo.com/images/learning/post.png)

## 最后

至此,一个相对简单的Post模板文件就完成了,主要用到了计算属性[`$frontmatter`](/post/2021/01/01/theme-learning-concept.html#front-matter),搭配Vue的模板语法。`blog`插件君在这里也很关键,我们两次利用到了`$page.pid`属性进行协助判断。
