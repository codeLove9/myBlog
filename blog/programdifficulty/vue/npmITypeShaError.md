---
title: 'npm i 报错 sha1-xxxx= integrity checksum failed when using sha1: wanted sha1-xxxx but got sha512-xxx'
date: 2023-04-26
author: XiaoChen
category: frontend
tags:
- Webpack
---

> 升级了服务组件后,npm i时一直报错

<!-- more -->

## 场景

今天在公司开发时,因为任务涉及到了servic-plugin服务组件的升级,我在package.json中替换版本后,npm i一直报错

报错信息如下:

```Terminal
npm ERR! code EINTEGRITY
npm ERR! Verification failed while extracting eslint-plugin-react@7.20.4:
npm ERR! Verification failed while extracting eslint-plugin-react@7.20.4:
npm ERR! sha1-wU0mMSIexpTd2EVX1xUvRLZuSqA= integrity checksum failed when using sha1: wanted sha1-wU0mMSIexpTd2EVX1xUvRLZuSqA= but got sha512-txbo090buDeyV0ugF3YMWrzLIUqpYTsWSDZV9xLSmExE1P/Kmgg9++PD931r+KEWS66O1c9R4srLVVHmeHpoAg== sha1-BZBSXn64OJDOcfc8LPg2KErYwvE=. (141152 bytes)
 
npm ERR! A complete log of this run can be found in:
npm ERR!     D:\nodejs\node_cache\_logs\2022-07-25T05_53_42_186Z-debug.log
```

询问同时后告诉我因为此次安装的版本的测试版本,测试版本没有拆包版本会报错

## 解决方案

 到package-lock.json 搜索 sha1 `-wU0mMSIexpTd2EVX1xUvRLZuSqA=` 报错地方

![img](https://img-blog.csdnimg.cn/32ef9862061a415999817db9bdbafddc.png)

 更改成报错地方的值

![img](https://img-blog.csdnimg.cn/3e5f8cfae23b411fb318f0274c49474d.png)

 然后重新install

![img](https://img-blog.csdnimg.cn/e8eda1cc602d4b47a077c109ad21f040.png)

 成功!
