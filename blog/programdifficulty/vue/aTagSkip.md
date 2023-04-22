---
title: Vue利用a标签跳转页面 出现 `http://xxxxxx/about#/about` 问题原因和解决方法
date: 2023-04-22
author: XiaoChen
category: frontend
tags:
  - Vue
---

> Vue项目中跳转内部链接一般都是`<router-link to="/about">About</router-link>`标签,其实它的底层是`<a></a>`标签，当我用a标签跳转时，跳转的链接却是非常奇怪

<!-- more -->

## START

* 前段时间在vue项目中，路由跳转的时候，使用a标签去跳转路由，遇到跳转不生效，路径还是奇怪的`http://xxxxxx/about#/about`，记录一下这个问题。

### 1.问题

#### 1.1 编写的代码

`<a href="/about">我是a标签，点击我跳转到关于页面</a>`

#### 1.2 问题描述

* 点击a标签页面跳转不生效；
* 点击之后路径从`http://localhost:8080#/about`变化为`http://localhost:8080/about#/about`；

### 2.问题分析与解决

1. 背景我说一下，首先我们知道vue[单页面应用](https://so.csdn.net/so/search?q=%E5%8D%95%E9%A1%B5%E9%9D%A2%E5%BA%94%E7%94%A8&spm=1001.2101.3001.7020)，有两种路由模式。一个叫`hash`，一个叫`history`。不清楚[路由模式](https://so.csdn.net/so/search?q=%E8%B7%AF%E7%94%B1%E6%A8%A1%E5%BC%8F&spm=1001.2101.3001.7020)可以看我写的博客：[我想理解 hash history 两种前端路由](https://blog.csdn.net/wswq2505655377/article/details/124482841?spm=1001.2014.3001.5501)。

2. 跳转前的路径存在`#`号，可以很明显的得知，当前的项目的路由模式是使用的[hash](https://so.csdn.net/so/search?q=hash&spm=1001.2101.3001.7020)模式。

3. 我们一般路由跳转，创建的例如 `<router-link to="/about">About</router-link>`,其实底层就是[a标签](https://so.csdn.net/so/search?q=a%E6%A0%87%E7%AD%BE&spm=1001.2101.3001.7020)。

> ![在这里插入图片描述](https://img-blog.csdnimg.cn/b0bc996c44a74800a22df3bdd203f328.png)
> | 模式 | 代码 | 页面展示 |
> | --- | --- | --- |
> | `history` | `<router-link to="/about">About</router-link>` | `<a href="/about" class="">About</a>` |
> | `hash` | `<router-link to="/about">About</router-link>` | `<a href="#/about" class="">About</a>` |

`解决答案：`  
**写到这里答案就呼之欲出了，其实本质`<router-link/>`也是利用a标签切换路由的，我们写原生的a标签也是没问题的.但是我们a标签的路径需要和我们路由模式匹配。**

* 如果是`hash`路由，使用`href="#/xxxx"`进行跳转；
* 如果是`history`路由，使用`href="/xxxx"`进行跳转；

> `xxxx`可替换为你想要跳转的路径

## 其他

### a标签基本介绍

首先看看我们的a标签`<a></a>`的[W3C基本介绍](https://www.w3cschool.cn/htmltags/att-a-href.html)：

* `<a>`标签定义超链接，用于从一个页面链接到另一个页面;
* `<a>`元素最重要的属性是 `href` 属性，它指定链接的目标

`href`属性可以设置的URL:

* `绝对 URL` \- 指向另一个站点（比如 href=“<http://www.example.com/index.htm>” rel=“external nofollow” target=“\_blank” ）
* `相对 URL` - 指向站点内的某个文件（href=“index.html”）
* `锚 URL` - 指向页面中的锚（href=“#top”）

## END

* 其实是一个很简单的问题，一一对应即可。
