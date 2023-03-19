---
date: 2023-01-01
title: VuePress中的常用术语
category: theme
tags:
  - VuePress
---
> 你可能会在你可能会在文档中碰到一些陌生的概念，本节列出了文档中常见的术语，方便查阅、学习、插件/主题开发之用。

## [#](#layout) layout

*   Access: `$page.frontmatter.layout`

当前页面所使用的布局组件名。

## [#](#front-matter) front matter

任何包含 YAML front matter 的 Markdown 文件都将由 [gray-matter (opens new window)](https://github.com/jonschlinkert/gray-matter) 处理。front matter 必须是 markdown 文件中的第一部分，并且必须采用在三点划线之间书写的有效的 YAML。 这是一个基本的例子：

```
---
title: Blogging Like a Hacker
lang: en-US
---
```
在这些三条虚线之间，你可以设置预定义变量（参见[下面](#%E9%A2%84%E5%AE%9A%E4%B9%89%E5%8F%98%E9%87%8F)），甚至可以创建自己的自定义变量。 然后，您可以使用 `$frontmatter` 在页面的其余部分、以及所有的自定义和主题组件访问这些变量。

::: tip
在 VuePress 中，Front matter 是 **可选的**。通过Front matter可以做很多有用的事情, 比如文章标签、分类、封面图等
:::

* * *

## [#](#预定义变量) 预定义变量

### [#](#title) title

*   类型: `string`
*   默认值: `h1_title || siteConfig.title`

当前页面的标题。

### [#](#lang) lang

*   类型: `string`
*   默认值: `en-US`

当前页面的语言。

### [#](#description) description

*   类型: `string`
*   默认值: `siteConfig.description`

当前页面的描述。

### [#](#layout-2) layout

*   类型: `string`
*   默认值: `Layout`

设置当前页面的布局组件。

### [#](#permalink) permalink

*   类型: `string`
*   默认值: `siteConfig.permalink`

参考: [Permalinks](/_post/permalinks.html).

### [#](#metatitle) metaTitle

*   类型: `string`
*   默认值: `` `${page.title} | ${siteConfig.title}` ``

重写默认的 meta title。

### [#](#meta) meta

*   类型: `array`
*   默认值: `undefined`

指定额外的要注入的 meta 标签：

```
---
meta:
  - name: description
    content: hello
  - name: keywords
    content: super duper SEO
---
```
* * *

## [#](#content) content

当前的 .md 文件渲染的内容，可以作为一个独特的全局组件 `<Content/>` 来使用.

## [#](#permalink-2) permalink

*   Access: `$page.frontmatter.permalink`

永久链接，更多细节请参考官网文档 [Permalinks (opens new window)](https://vuepress.vuejs.org/zh/guide/permalinks.html)。

## [#](#regularpath) regularPath

*   Access: `$page.regularPath`

当前页面基于目录结构生成的 URL。

## [#](#path) path

*   Access: `$page.path`

当前页面的实际 URL。在构建期生成路由时，一个页面的 URL 将优先使用 `permalink`，若不存在则降级到 `regularPath`。

## [#](#headers) headers

*   Access: `$page.headers`

即 `markdown` 中那些以一个或多个 `#` 定义的标题。

## [#](#siteconfig) siteConfig

*   Access: `$site | Context.siteConfig`

即 `.vuepress/config.js`，译为 `站点配置`。

## [#](#themeconfig) themeConfig

*   Access: `$themeConfig | Context.themeConfig`

即 `.vuepress/config.js` 中 `themeConfig` 的值，是用户对当前所使用的主题的配置。

## [#](#themepath) themePath

*   Access: `Context.themeAPI.theme.path`

当前使用的主题的所在的绝对路径。

## [#](#themeentry) themeEntry

*   Access: `Context.themeAPI.theme.entry`

主题的配置文件 `themePath/index.js`。

## [#](#parentthemepath) parentThemePath

*   Access: `Context.themeAPI.parentTheme.path`

如果当前使用的主题是一个派生主题，那么 `parentThemePath` 就是指父主题的所在绝对路径。

## [#](#parentthemeentry) parentThemeEntry

*   Access: `Context.themeAPI.parentTheme.entry`

如果当前使用的主题是一个派生主题，那么 `parentThemePath` 就是指父主题的主题的配置文件 `parentThemePath/index.js`。