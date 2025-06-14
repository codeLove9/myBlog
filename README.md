# XiaoChen's Blog

A flat and clean Blog for VuePress site. inspired by [Vuepress-theme-maker](https://github.com/80maker/vuepress-theme-maker)

## Features

- Build with Vue.js
- 在VuePress默认主题基础之上修改,保留了内置搜索,tag分类等绝大多数特性
- 基于官方博客插件`@vuepress/plugin-blog`制作
- 扩展了Markdown语法,支持`footnote` `mark` `abbr` `task-lists`, `Demo Code`
- 支持文章评论
- 文章打赏模块
- 内置友情链接页
- 文章阅读时长估算
- 文章阅读计数(依赖valine评论)
- rss订阅及sitemap
- 访客自定义主题
- 导航多级菜单
- PWA支持
- seo配置
- 代码复制
- 暗黑模式
- 响应式主题

## Install

```
npm i vuepress-theme-maker -D
# OR yarn add vuepress-theme-maker -D
```

## Usage

```
// .vuepress/config.js
module.exports = {
  theme: 'vuepress-theme-maker',
  themeConfig: {
    // Please head documentation to see the available options.
  }
}
```

For more details, see [Theme Doc](https://codelove9.github.io/myBlog/)

## Blog Online

[github-pages](https://codelove9.github.io/myBlog/)

## Screenshot
<!-- > 可能因为网络原因图片请求失败，需要科学上网工具即可显示

![](https://github.com/codeLove9/myBlog/blob/gh-pages/images/screenshot-1.png)

![](https://github.com/codeLove9/myBlog/blob/gh-pages/images/screenshot-2.png)

![](https://github.com/codeLove9/myBlog/blob/gh-pages/images/screenshot-3.png) -->

<!-- 国内备用： -->
[![screenshot-1.png](https://i.postimg.cc/zvJ9B4nY/screenshot-1.png)](https://postimg.cc/WFH9YWW5)
[![screenshot-2.png](https://i.postimg.cc/FHgyTfWT/screenshot-2.png)](https://postimg.cc/hXvQjGqm)
[![screenshot-3.png](https://i.postimg.cc/t4K1Yg7t/screenshot-3.png)](https://postimg.cc/QFqNzhQH)

## Deploy to Github Pages

- 根目录下运行命令： `bash deploy.sh`

- 在vsCode终端或者cmd中运行会抛出错误

- 需要在powerShell或者gitBash中运行

## Thanks to

- [VuePress](https://vuepress.vuejs.org/)
- [@vuepress/plugin-blog](https://github.com/vuepress/vuepress-plugin-blog)
- [@vuepress/theme-blog](https://github.com/vuepress/vuepress-theme-blog)
