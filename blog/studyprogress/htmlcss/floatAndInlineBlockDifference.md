---
title: CSS中float和inline-block的区别
date: 2023-04-05
author: XiaoChen
category: frontend
tags:
  - HTML/CSS
---

> float和inline-block在使用时会存在一些区别，这个布局问题常常出现在可换行的列表上。

<!-- more -->

## 共性

1. loat 和 display: inline-block 都可以做到让元素成一排排列，然后根据父元素的宽度自动换行到下一列。

2. 都可以自由设置元素的宽高。

## 区别

float 元素会产生浮动效果，元素脱离当前文档流，如果父元素不[清除浮动](https://so.csdn.net/so/search?q=%E6%B8%85%E9%99%A4%E6%B5%AE%E5%8A%A8&spm=1001.2101.3001.7020)将不被撑开。

如果浮动元素高度不一致，那么下一行的第一个元素将会出现在上一行高度最大的元素的右边。

就像这样：

![](https://img-blog.csdnimg.cn/img_convert/fd44af5e5c1fad7d2ccba6e56b12b718.jpeg)

但是 inline-block 会以当前行最高的元素作为行高，下一行从头排列：

![](https://img-blog.csdnimg.cn/img_convert/550ca14e20e621ebaa474def7f1991c7.jpeg)

但是子元素之间会有空隙：

![](https://img-blog.csdnimg.cn/img_convert/9e3e62d73362ba4e5617499cdfb52b2a.jpeg)

这是因为标签和标签之间的空格导致的。

如果你想消除这个空隙：

1.你可以把回车去掉把标签连着写。例如：

```html
<ul>
    <li>...</li><li>...</li><li>...</li>...
</ul>
```

但是这样写结构不清晰，而且不方便浏览代码。

2. 那么你也可以在父元素上设置 font-size: 0; 使空格消除。如果子元素上有字体要求就在子元素上再设置回来就好了。

3. letter-spacing 可以控制文字的水平间距，设置成负值就可以消除空格啦。

而且 inline-block 默认的垂直方向的对齐方式是 [baseline](https://so.csdn.net/so/search?q=baseline&spm=1001.2101.3001.7020) 的，想要顶部对齐需要设置 vertical-align 为 top。

## 总结

尽可能使用 inline-block ，避免使用float布局。在DOM的布局渲染阶段 float 布局要比 inline-block 消耗性能。

如果有特殊的要求，比如两个元素一左一右的那种，那么 flex 布局了解一下，也要比float要好一点。

关键是 float 还有烦人的清除浮动问题。
