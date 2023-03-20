---
date: 2021-01-22
title: "【常用Shell命令】- tree"
category: shell
pageClass: page-shell-tree
---

浏览博客文章时经常会看到一些很漂亮的目录结构,就像下面所示

``` sh
assets
├── fonts
│   ├── google
│   │   ├── bbr.woff2
│   │   └── sarpanch.woff2
│   └── icomoon
│       └── Icon.woff
└── images
    └── bg.png
```

<!-- more -->

以前不知道还以为是XX高级编辑器插件, 其实系统自带的tree命令就可以帮助我们搞定这些高大上的目录结构.

## tree 命令生成目录树

语法格式：tree [参数]

常用参数:

<style>
.page-shell-tree .article-content table {
  display: table;
  width: 100%;
}
</style>

| 参数名      |                    说明                     |
|-------------| ----------------------------------------- |
| -L level    |              限制目录显示层级               |
| -C          |          显示目录和文件的色彩区分            |
| -d          |          -d 只显示目录不显示内容。           |
| -f          | 在每个文件或目录之前，显示完整的相对路径名称     |
| --dirsfirst |                优先显示目录                 |
| -p          |                列出权限标示                 |
| -s          |             列出文件或目录大小              |


### 示例

`tree blog -L 2 -C --dirsfirst`

``` sh
blog
├── _post
│   ├── maker-icon.md
│   ├── maker.md
│   ├── md5.md
│   ├── shell-tree.md
│   ├── theme-learning-0.md
│   ├── theme-learning-concept.md
│   └── theme-showcase.md
├── archives
│   └── index.md
├── friend-links
│   └── index.md
└── README.md
```

### mac下可通过homebrew安装tree命令


``` sh
$ brew install tree
```