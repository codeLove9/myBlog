---
title: 直接解构并.catch抛出异常
date: 2023-05-10
author: XiaoChen
category: frontend
tags:
  - JS
---

## 背景

今天在公司写项目时，给组长做代码review时，组长觉得我写的不够精炼，没有必要再申明一个响应式变量，具体代码如下

源代码：

```vue
<script>
import {getAbSplitRes} from '@service-plugin'
import {oldTrade, newTrade} from '@/utils/apis'
import {is_App} from '@/utils/utils'

method: {
  async init() {
    let groupNo = ''
    try {
      // 是app环境返回true，h5环境返回false
      // groupNo返回值为1或者0，只能在app环境下跑通
      const res = is_App && await getAbSplitRes()
      groupNo = res.groupNo
      const tradeInterface = groupNo? oldTrade: newTrade
      const {responsecode} = await tradeInterface({No:xxx, id:xxx})
    } catch (error) {
      groupNo = 0
    }
  }
}
</script>
```

从这段代码可以看出：我使用了try、catch，由于try、catch里面是不同的作用域，所以我在try、catch外面不得不重新声明一个groupNo变量去接不同的值，在catch中做兜底。并且如果getAbSplitRes方法抛出了异常，是根本不会走到tradeInterface发请求的逻辑的，会直接抛出异常，可谓是漏洞不小。

***

经过组长的一番点拨，告诉我可以直接.cath，没必要使用try、catch，于是我把代码优化了一遍，但是后来仍被告知不够完美，具体如下：

```vue
<script>
import {getAbSplitRes} from '@service-plugin'
import {oldTrade, newTrade} from '@/utils/apis'
import {is_App} from '@/utils/utils'

method: {
  async init() {
    let groupNo = ''
    // 是app环境返回true，h5环境返回false
    // groupNo返回值为1或者0，只能在app环境下跑通
    is_App &&
      (await getAbSplitRes()
        .then(res => {
          groupNo = res.groupNo
        })
        .catch(e => {
          groupNo = 0
        }))
    const tradeInterface = groupNo? oldTrade: newTrade
    const {responsecode} = await tradeInterface({No:xxx, id:xxx})
  }
}
</script>
```

***

结局当然是免不了被一顿说教，告诉我为什么不用前面解构后面直接.catch，经过组长的一番点拨，我才完成了最终的代码，具体如下：

```vue
<script>
import {getAbSplitRes} from '@service-plugin'
import {oldTrade, newTrade} from '@/utils/apis'
import {is_App} from '@/utils/utils'

method: {
  async init() {
    // groupNo返回值为1或者0，只能在app环境下跑通
    // 因为是解构对象，所以抛出对象
    const {groupNo = 0} = is_App && await getAbSplitRes().catch(e => ({groupNo: 0}))
    // 如果抛出普通字面量
    // 发生异常后xxx得到兜底值0
    // const xxx =  await xxInterface.catch(e => 0)
    const tradeInterface = groupNo? oldTrade: newTrade
    const {responsecode} = await tradeInterface({No:xxx, id:xxx})
  }
}
</script>
```

**重点是，.catch中没必要写代码段，如果发生异常后要抛出一个普通字面量，那么直接抛出；如果抛出一个对象，则用()包裹起来**。

## 总结

1. 没必要使用try、catch，后面直接用.catch抛出异常
2. 一个被promise包装的函数没必要每次都.then后再.catch抛出异常，可以前面解构并兜底，后面直接.catch抛出异常兜底
3. .catch抛出异常时要抛出一个普通字面量，那么直接抛出；如果抛出一个对象，则用()包裹起来
