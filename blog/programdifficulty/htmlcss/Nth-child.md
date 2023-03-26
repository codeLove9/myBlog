---
date: 2023-03-26
title: 使用nth-child（）时发现的bug
category: frontend
tags:
  - htmlcss
---

# 项目场景：
使用li:nth-child（4n）选择第4个第8个li盒子清除右侧外边距

***

# 问题描述

当我在box盒子中左边创建了一个left盒子，右边创建了多个li盒子时，想用nth-child（4）选择第四个li盒子时，发现选择的是第三个li盒子。

* * *

# 原因分析：

> 我发现当右边右很多li盒子，左边有个盒子的情况时，尽管是用li:nth-child（4n）选择所有li盒子中的4的倍数盒子，也会出现选中错误的bug，网页会把前面的left盒子也算进li的里面来计算。

* * *

# 解决方案：

> 所有li盒子外面需要包一个大盒子right，在right盒子中选li盒子，网页就能正确选中了。
> 
> ```
>.box .right li:nth-child(4n) {
>     margin-left=0
>}
> ```