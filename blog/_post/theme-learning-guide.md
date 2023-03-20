---
date: 2021-02-23
title: VuePress 主题介绍
category: theme
tags:
  - VuePress
---

## 什么是VuePress主题

按官网的描述, VuePress 由两部分组成：第一部分是一个极简静态网站生成器，它包含由 Vue 驱动的主题系统和插件 API，另一个部分是为书写技术文档而优化的默认主题。
我们这里要说的VuePress主题指的是自定义主题, 和默认主题一样, 自定义主题也构建在主题系统之上。

当在配置项中如下指定自定义主题时:

```
// .vuepress/config.js
module.exports = {
  theme: 'vuepress-theme-xx' // 已发布成npm包的主题
  theme: 'theme-index-path' // 本地主题
}
```

自定义主题会接管默认主题完成整个站点的页面渲染。

## 快速开始

1. 创建并进入一个新目录

``` sh
mkdir vuepress-starter && cd vuepress-starter
```
2. 使用你喜欢的包管理器进行初始化

``` sh
yarn init # npm init
```

3. 将 VuePress 安装为本地依赖

``` sh
yarn add -D vuepress # npm install -D vuepress
```

4. 创建你的第一篇文档

``` sh
mkdir docs && echo '# Hello VuePress' > docs/README.md
```

5. 在 package.json 中添加一些 scripts [可选]

```
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

6. 创建一个layout.vue文件

```
.
└─ .vuepress
 └─ theme
     └─ Layout.vue
```

``` vue
<template>
  <div class="theme-container">
    <Content/>
  </div>
</template>
```

没错,一个最简单的主题可以仅由一个layout文件构成。layout是一个vue组件,该文件会告诉主题中所有的元素如何去布局展示。

7. 在本地启动服务器

``` sh
yarn docs:dev # npm run docs:dev
```

VuePress 会在  [http://localhost:8080](http://localhost:8080)启动一个热重载的开发服务器。

:tada: :100: 到此, 我们已经有了一个完整的可运行的VuePress应用,并且包含了一个最简单的主题。剩下的只需要不断的添加和扩展我们的主题功能。