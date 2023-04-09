---
title: Maker主题配置--基本配置
date: 2021-01-23
description: 涵盖基乎所有和主题相关配置项,帮助你快速开始搭建和配置Maker主题.
author: XiaoChen
category: maker
---

> 涵盖基乎所有和主题相关配置项,帮助你快速开始搭建和配置Maker主题.

<!-- more -->
## Header

``` js
// .vuepress/config.js
module.exports = {
  // 网站标题
  title: 'XiaoChen\'s Blog',
  // 网站描述
  description: 'A front-end programmer born in 1999',
  themeConfig: {
    // 网站logo
    logo: '/logo.jpg',
    hostname: 'https://codelove9.github.io/myBlog/'
  }
}
```

## Search

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // Search 提示
    searchPlaceholder: 'Search',
    // Search 建议列表条目数
    searchMaxSuggestions: 10,
  }
}
```

## Nav

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      // 内部链接
      { text: '🏠 Home', link: '/' },
      { text: '📖 Theme', link: '/categories/theme/' },
      { text: '🐉 Maker', link: '/_post/maker.md' },
      // 多级菜单
      { text: '🔥 Animation', items: [{
        text: '2d动画',
        items: [
          {
            text: 'css3',
            link: '/categories/animation-css/'
          }
        ]
      },{
        text: '3d动画',
        items: [
          {
            text: 'webgl',
            link: '/categories/animation-webgl/'
          }
        ]
      }]},
      { text: '📽 Old Time', link: '/categories/oldtime/' },
      { text: '🔗 friend-links', link: '/friend-links/' },
      // 外部链接
      { text: 'External', link: 'https://google.com' },
    ],
  }
}
```

## Social

设置 sidebar 底部社交媒体 URL。

- type 对应[Icon](./maker-icon.md)名称
- type github会自动补全链接, 无须填写全路径
- type email自动生成mailto链接

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    social: [
      {
        type: 'email',
        link: 'cmgddd@163.com'
      },
      {
        type: 'github',
        link: '80maker/vuepress-theme-maker'
      },
      {
        type: 'qq',
        link: '//qm.qq.com/cgi-bin/qm/qr?k=fknyQ434nkzVUWUmJ6rpIPctkS9eyQaZ&jump_from=webapi'
      },
      {
        type: 'feed',
        link: '/rss.xml'
      }
    ],
  }
}
```

## Reward

设置文章底部的打赏功能。

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    reward: {
      text: 'Buy me a cup of coffee ☕.',
      // 是否启用
      enable: true,
      ways: [
        {
          name: 'wechat',
          icon: 'wechat',
          qrcode: '/images/wechat.png',
          text: 'This is a Wechat Pay qrcode',
          color: 'rgb(9, 187, 7)'
        },
        {
          name: 'alipay',
          symbol: 'alipay',
          qrcode: '/images/alipay.png',
          text: 'This is a Alipay Pay qrcode',
          color: '#1296db'
        }
      ]
    },
  }
}
```

## Footer

支持自定义HTML

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    copyright: '© 2020 ❤️ <a target="_blank" href="https://17ria.com/">Neil Chen</a>',
  }
}
```

## Palette

访客主题配色自定义

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    palette: {
      colors: [{
        btnColor: '#673ab7',
        paletteVars: {
          dark: `--theme-accent-color: #673ab7;
          --theme-foreground-color: #d8d8d8;
          --theme-border-color: #444;
          --theme-background: #202020;
          --theme-sidebar-background: #673ab7;
          --theme-card-background: #252525;
          --theme-card-color: #252525;
          --theme-bg-tertiary-color: #161b22;
          --theme-accent-color-005: rgba(103,58,183,0.05);
          --theme-accent-color-01: rgba(103,58,183,0.1);
          --theme-accent-color-02: rgba(103,58,183,0.2);
          --theme-accent-color-04: rgba(103,58,183,0.4);
          --theme-accent-color-08: rgba(103,58,183,0.8);`,
          light: `--theme-accent-color: #673ab7;
          --theme-foreground-color: #363636;
          --theme-border-color: #e0e0e0;
          --theme-sidebar-background: #673ab7 linear-gradient(to bottom, #673ab7 0%, #522e92 100%);
          --theme-card-background: #fff;
          --theme-bg-tertiary-color: #f6f8fa;
          --theme-accent-color-005: rgba(103,58,183,0.05);
          --theme-accent-color-01: rgba(103,58,183,0.1);
          --theme-accent-color-02: rgba(103,58,183,0.2);
          --theme-accent-color-04: rgba(103,58,183,0.4);
          --theme-accent-color-08: rgba(103,58,183,0.8);`
        }
      },{
        btnColor: '#3f51b5',
        paletteVars: {
          dark: `--theme-accent-color: #3f51b5; --theme-sidebar-background: #3f51b5;`,
          light: `--theme-accent-color: #3f51b5; --theme-sidebar-background: #3f51b5;`
        }
      }]
    }
}
```

## Blog

对应 `@vuepress/blog` 插件的options

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    blog: {
      directories: [
        {
          id: 'post',
          dirname: '_post',
          path: '/post/',
          itemPermalink: '/post/:year/:month/:day/:slug.html',
          pagination: {
            perPagePosts: 10,
          },
        }
      ],
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
            lengthPerPage: 10
          }
        }
      ],
      sitemap: {
        hostname: 'hostname'
      },
      feed: {
        canonical_base: 'canonical_base',
      },
      comment: {
        service: 'vssue',
        owner: 'owner',
        repo: 'repo',
        clientId: 'your clientId',
        clientSecret: 'your clientSecret',
      }
    }
  }
}
```

## Seo

对应 `vuepress-plugin-seo` 插件的options

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // 默认配置
    seo: {
      siteTitle: (_, $site) => $site.title,
      title: $page => $page.title,
      description: $page => $page.frontmatter.description,
      author: (_, $site) => $site.themeConfig.author,
      tags: $page => $page.frontmatter.tags,
      twitterCard: _ => 'summary_large_image',
      type: $page => ['articles', '_post', 'blog'].some(folder => $page.regularPath.startsWith('/' + folder)) ? 'article' : 'website',
      url: (_, $site, path) => ($site.themeConfig.hostname || '') + path,
      image: ($page, $site) => $page.frontmatter.cover && (($site.themeConfig.hostname && !$page.frontmatter.cover.startsWith('http') || '') + $page.frontmatter.cover),
      publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
      modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
    }
}
```

## Pwa

对应 `@vuepress/plugin-pwa` 插件的options

``` js
// .vuepress/config.js
module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/logo.jpg' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' }]
  ],
  themeConfig: {
    pwa: {
      serviceWorker: true,
      popupComponent: 'ThemeSWUpdatePopup',
      updatePopup: {
        '/': {
          message: "发现新内容可用",
          buttonText: "刷新"
        }
      }
    }
}
```

::: tip 提示

为了让你的网站完全地兼容 PWA，你需要:

在 `.vuepress/public` 提供 Manifest 和 icons
在 `.vuepress/config.js` 添加正確的 `head links`.
更多细节，请参见 [MDN docs about the Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest).
:::

## Copy

对应 `vuepress-plugin-one-click-copy` 插件的options

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    copy: {
      copySelector: ['div[class*="language-"] pre', '.friend-link__content div[class*="language-"] pre'], // String or Array
      copyMessage: '代码复制成功', // default is 'Copy successfully and then paste it for use.'
      duration: 1000, // prompt message display time.
      showInMobile: false // whether to display on the mobile side, default: false.
    }
}
```

## See also

<RelatedPosts/>
