---
title: JS短路运算符&&
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

data() {
  return {
    groupNo: ''
  }
}

method: {
  async init() {
    // 是app环境返回true，h5环境返回false
    if(is_App) {
     // groupNo返回值为1或者0，只能在app环境下跑通
      const {groupNo} = await getAbSplitRes()
      this.groupNo = groupNo
    }
    const tradeInterface = this.groupNo? oldTrade: newTrade
    const {responsecode} = await tradeInterface({No:xxx, id:xxx})
  }
}
</script>
```

从这段代码可以看出：由于getAbSplitRes方法只能在app环境下跑，所以我在外面包了一层判断，里面拿到了groupNo。当groupNo要在判断外使用时，被告知没有定义，因为groupNo只在if体中的作用域生效，所以我**不得不声明一个响应式的groupNo来接**，这样做无疑是增加了负担。

经过组长的一番点拨，我把代码优化了一遍，具体如下：

```vue
<script>
import {getAbSplitRes} from '@service-plugin'
import {oldTrade, newTrade} from '@/utils/apis'
import {is_App} from '@/utils/utils'

method: {
  async init() {
    // groupNo返回值为1或者0，只能在app环境下跑通
    const {groupNo} = is_App && await getAbSplitRes()
    const tradeInterface = groupNo? oldTrade: newTrade
    const {responsecode} = await tradeInterface({No:xxx, id:xxx})
  }
}
</script>
```

**直接用短路运算符&&，这样就可以使groupNo在全局作用域下，不必再重新申明一个变量去接，减少了负担，可谓是神！！**

## 总结

在简单的if判断中，最好直接用短路运算符&&或非短路运算符||，节省代码量，还避免了开辟不必要的作用域。
另外if(is_App){xxx} === is_App && xxxx；if(!is_App){xxx} === !is_App && xxxx。
