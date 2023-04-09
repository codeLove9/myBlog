---
title: iconfont通过font class引入显示小方块bug
date: 2023-04-09
author: XiaoChen
category: frontend
tags:
  - HTML/CSS
---

官网显示[iconfont](https://so.csdn.net/so/search?q=iconfont&spm=1001.2101.3001.7020)通过font class引入有两种方式：

1.直接查看链接用link引入cdn链接 `//at.alicdn.com/t/c/font\_3680524\_qjgj55gtmj.css`，这个方法没有问题， 注意前面要加http:变成`http://at.alicdn.com/t/c/font\_3680524\_qjgj55gtmj.css`再引入

  如图：![img](https://img-blog.csdnimg.cn/fa1fe763a8a64f0297e0d2f5b7ae2330.png)

2.通过下载至本地引入css文件，可是当我引入文件时，图标却显示不出来，显示的是一个小方块，使我备受困惑。

经过我不断地排错后发现，当iconfont下载完后是一个文件夹，里面有html、css、js、json等很多文件，如果只把css文件放入到项目中，就会显示错误，应该放至少除了css文件还有别的文件，这样就不会显示错误了。

iconfont.css中有这样一个代码段：

```css
@font-face {
  font-family: "iconfont";
  /* Project id 3680524 */
  src: url('iconfont.woff2?t=1664438813020') format('woff2'),
    url('iconfont.woff?t=1664438813020') format('woff'),
    url('iconfont.ttf?t=1664438813020') format('truetype');
}
```

由此代码段可见，css文件中也有两个woff和[ttf](https://so.csdn.net/so/search?q=ttf&spm=1001.2101.3001.7020)文件的引入，所以至少要打包四个文件到项目中，就不会报错了！如图所示四个文件：

![img](https://img-blog.csdnimg.cn/dea7bf35190d4b22b5d605d91e580f72.png)
