---
title: if、else逻辑的优化
date: 2023-04-11
author: XiaoChen
category: frontend
tags:
  - Vue
---

> 当Vue项目中methods中的一个方法，if、else中的逻辑相同，只是数据源不一样，该怎么优化呢？

<!-- more -->

## 背景

今天在公司做code review时，因为if、else中逻辑相同没有做封装被打了回来，下面是大致的代码段

```vue
data() {
  retren {
    isNoData: false,
    list: [],
    topList: []
  }
},

methods:{
  updateCollections() {
    if(this.isNoData) {
      this.list.forEach(item => {
        xxxxxxxxx
      })
    } else {
      this.topList.forEach(item => {
        xxxxxxxxx
      })
    }
  }
}
```

然后因为相同的逻辑写了两遍，果不其然被打回来了。。。

我最初想的是在methods中再封装一个公共逻辑，把forEach后面的逻辑给封装起来，没想到经过审阅老师的指导，打开了一种新思路，于是我在新思路下写了一版优雅的代码，可以说是满满的成就感，下面放出示例代码

## 示例代码

```vue
data() {
  retren {
    isNoData: false,
    list: [],
    topList: []
  }
},

methods:{
  updateCollections() {
    let showData = this.isNoData? [...this.topList] : [...this.list]
    showData.forEach(item => {
      xxxxxxxxx
    }) 
  }
}
```

这种思路无非就是先把判断逻辑放到前面，交给一个统一的数据源，再用这个数据源做逻辑处理，这样就可以只写一便核心逻辑了，可以说是学到了啊！！
