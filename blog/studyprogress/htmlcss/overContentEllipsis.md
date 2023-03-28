---
title: 使用css将超出盒子的文字显示为省略号
date: 2023-03-28
author: XiaoChen
category: frontend
tags:
  - HTML/CSS
---

```
li {
    overflow: hidden;   /* 将超出的内容隐藏 */
    white-space: nowrap;  /*  禁止文字自动换行 */
    text-overflow: ellipsis;  /* 多余的文字显示为省略号 */
}
```