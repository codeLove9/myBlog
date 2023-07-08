---
title: package.json文件中依赖包前的~^代表什么？
date: 2023-07-08
author: XiaoChen
category: frontend
tags:
  - Webpack
---

## 在我们项目中的package.json文件中，dependencecies和devDependenceies中标明了项目所需的生产环境依赖包和开发环境依赖包，有些依赖包版本号前有波浪号和上箭头号，有的只有本版号，那么依赖包版本号前的~和^代表什么意思呢？

![微信图片_20220323105904.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32ed862a867f436b852d92ce3f822a5b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

在 package.json 中，可以使用 semver 表示法设置要升级到的版本（补丁版本或次版本），例如：

* 如果写入的是 `〜0.13.0`，则只更新补丁版本：即 `0.13.1` 可以，但 `0.14.0` 不可以。
* 如果写入的是 `^0.13.0`，则要更新补丁版本和次版本：即 `0.13.1`、`0.14.0`、依此类推。
* 如果写入的是 `0.13.0`，则始终使用确切的版本。
