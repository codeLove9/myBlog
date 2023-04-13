---
date: 2023-04-13
title: Vue动态class为什么v-bind:class的第二个class需要加引号
category: frontend
tags:
  - Vue
---

## 问题

问题是关于vue.js框架中动态class绑定的带‘-’的类名为什么要加引号

## 代码

下面是中文官网给出的示例代码，英文官网也是相同的（我加了test内容，方便debug）

[https://cn.vuejs.org/v2/guide...](https://v2.cn.vuejs.org/v2/guide/class-and-style.html)  

```vue
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">test
</div>
```

我的问题就是为什么了第2个class是有引号的。

如果我去了引号，下面的就不能生效

```vue
<div class="static"
     v-bind:class="{ active: isActive, text-danger: hasError }">test
</div>
```

## 原因

因为 **{ } 内的代码是要拿去当js解析的，js中变量是没有用 ' - '号连接**

就像 css中 font-size 是用 - 号连接

到了js中 就必须用驼峰的写法

此处，`v-bind`后面的值为表达式，表达式写法和JS基本一样，但是所有的`this`都被省略。 

JS里面，键名如果有`-`符号，也是需要加引号。JS中

```vue
{
    active: isActive,
    text-danger: hasError
}
```

是无效的，而

```vue
{
    'active': isActive,
    'text-danger': hasError
}
```

是有效的
