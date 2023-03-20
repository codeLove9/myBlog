---
title: Maker主题配置--页面配置
date: 2021-01-25
category: maker
layout: SpecialLayout
---

## 文章标题 - Title <Badge text="必须" type="error"/>

`Maker主题的限制, title设置后会自动解析为h1标签`

```
---
title: 页面title 
---
```

## 文章日期 - Date <Badge text="必须" type="error"/>

`Maker主题的限制,文档归档依赖该字段,发布文章需要显示的填写date字段`

```
---
date: 2021-01-25
---
```

## 设置文章封面 - Cover

```
---
cover: path-of-cover
---
```

## 设置文章分类、标签

可以是数组、也可以是单项

```
---
category: maker
categories:
  - maker
  - theme
tag: maker
tags:
  - VuePress
  - tag-2
---
```

## 手动设置不在关联文章列表中显示 <Badge text="RelatedPosts组件" type="warning"/>

```
---
excludeRelatedPost: true
---
```

## 禁用当前文章的打赏

```
reward: false
```

## 自定义页面类

有时候你可能需要为特定页面添加一个 CSS 类名，以方便针对该页面添加一些专门的 CSS。这种情况下你可以在该页面的 YAML front matter 中声明一个 pageClass：

```
---
pageClass: custom-page-class
---
```

然后你就可以写专门针对该页面的 CSS 了：

```
/* .vuepress/override.styl */

.theme-container.custom-page-class {
  /* 特定页面的 CSS */
}
```

## 特定页面的自定义布局

默认情况下，每个 `*.md` 文件将会被渲染在一个 `<div class="theme-container">` 容器中，同时还有侧边栏，以及上 / 下一篇文章的链接。如果你想要使用一个完全自定义的组件来代替当前的页面，你可以使用 `YAML front matter` 来指定这个Layout组件。

``` yaml
---
layout: SpecialLayout
---
```

这将会为当前的页面渲染 `.vuepress/components/SpecialLayout.vue` 布局。

## See also

<RelatedPosts/>