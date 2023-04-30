---
title: Mock拦截携带参数的url地址
date: 2023-04-30
author: XiaoChen
category: frontend
tags:
  - Mock
---

mock只能拦截确定的url地址，拦截到不到带参数的url，如果一定要传参数则要加个正则进行匹配，一共有两种方式：

1.Mock.mock(/\/api\/user\/getUser/, user.getUserList)

需要注意的是， 是把url转化成正则表达式，不能在url外再加‘’包裹

2.Mock.mock(RegExp('/api/user/getUser' + '.*'), user.getUserList)

RegExp()方法中的url则需要加引号了，另外拼接'.*'
