---
title: TS中声明全局变量
date: 2023-06-01
author: XiaoChen
category: frontend
tags:
  - TS
---

1. 在src目录中创建types文件夹，文件夹中创建如list.d.ts、user.d.ts文件
2. 文件中使用declare声明全局类型、变量、常量、接口等
3. 以下是文件模板

```ts
declare let Hong: string;

declare const BIN: string;

declare interface listItemItf {
  id: number
  todo: string
  checked: boolean
}

declare type List = Array<listItemItf>
```
