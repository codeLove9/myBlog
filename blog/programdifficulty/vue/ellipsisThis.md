---
date: 2023-04-19
title: Vue中省略this方案
category: frontend
tags:
- Vue
---

> 在Vue的methods中的某个方法中，如果用到了响应式数据，那么就要用this.xxx来调用，数据量小还好，如果方法里用到了十几个甚至几十个响应式数据,此时就不得不请出**ES6中的对象解构**了

<!-- more -->

## 正常写法

```vue
methods: {
    getCode() {
      this.$store.dispatch('getCode', this.phone)
    }
  }
```

问题：如果代码量大了，每一次使用Vue中的变量都需要加上前缀this

分析：我们可以在控制台中尝试打印this，可以看到：this打印出来是一个VueComponent的对象，包括了phone这个属性

```vue
methods: {
    getCode() {
      console.log(this)
      this.$store.dispatch('getCode', this.phone)
    }
  }
```

打印结果如图：

![img](https://img-blog.csdnimg.cn/fcda88b271c24498b44a3277d205162b.png)

可以看出，打印出的的对象包含了phone这个属性，我已经用红线标注出来

## 解决方案

所以可以用es6的[解构赋值](https://so.csdn.net/so/search?q=%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC&spm=1001.2101.3001.7020)把自己想要的属性解构出来，就可以直接用这个变量而不加this前缀了

```vue
methods: {
    getCode() {
      const { phone } = this  //this是一个对象，包含了phone属性，左边解构出来给phone
      this.$store.dispatch('getCode', phone)  //可以直接用变量phone了
    }
  }
```
