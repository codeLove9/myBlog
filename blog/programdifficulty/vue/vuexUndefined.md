---
title: vuex中state或getters因为请求加载缓慢或者异常导致的初始返回值为undefined引起的渲染错误:“TypeError:无法读取未定义的属性(读取‘XXX等‘)“
date: 2023-04-17
author: XiaoChen
category: frontend
tags:
- Vue
---

> Vue开发过程中明明页面渲染正常，但是控制台却一直报错找不到xxx值

明明页面正常显示，但是控制台却一直报如下错误

![img](https://img-blog.csdnimg.cn/e88684d45b894485a17ed5ddd089e4be.png)

 \[Vue warn\]:渲染错误:"TypeError:无法读取未定义的属性(读取'category1Name')"中发现的Detail 的 vuex 仓库

```vue
import { reqDetail } from "@/api"
export default{
    actions:{
        async getDetail({commit},skuId){
            const result = await reqDetail(skuId)
            console.log(result)
            if(result.code == 200){
                commit("GETDETAIL", result.data)
            }
        }
    },
    mutations:{
        GETDETAIL(state,value){
            state.DetailList = value
        }
    },
    state:{
        DetailList:{}
    },
 
    getters:{
        categoryView(state){
            return state.DetailList.categoryView 
        },
    }
}
```

可以看出 DetailList 是通过发送请求获取到的数据，而这个数据，当请求没有返回数据的时候初始状态是一个空的对象或者是数组

通过 getters 将 DetailList 中的数据提取出来，方便使用

在组件中使用 categoryView 数据

```vue
<div class="conPoin">
    <span v-show="categoryView.category1Name" >{{categoryView.category1Name}}</span>
    <span v-show="categoryView.category2Name" >{{categoryView.category2Name}}</span>
    <span v-show="categoryView.category3Name" >{{categoryView.category3Name}}</span>
</div>
computed:{
    ...mapGetters(['categoryView'])
}
```
  
会报开头错误

原因：假设我们网络故障，导致DetailList的数据没有请求到，即DetailList是一个空的对象，当我们去调用getters中的return state.DetailList.categoryView时，因为DetailList为空，所以也不存在categoryView，即我们getters得到的categoryView为undefined。所以我们在html使用该变量时就会出现没有该属性的报错。

即：网络正常时不会出错，一旦无网络或者网络问题就会报错。

解决：

```vue
categoryView(state){
    return state.DetailList.categoryView || {}
},
```

 在返回值后面 加一个 || ，当属性值为 undefined 时，会返回 || 后面的数据 ，这样就不会报错

如果返回值是对象 后面就加 || { }

如果返回值是数组 后面就加 || \[ \]

这个错误不会影响页面，但是起码要明白警报的原因

如果在组件中使用初始可能为空的数据，也可以根据返回的数据类型用一个空的数组或者对象兜底

```vue
<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl"/>
    <div class="event"></div>
    <div class="big">
      <img :src="imgUrl" />
    </div>
    <div class="mask"></div>
  </div>
</template>
 
<script>
  export default {
    name: "Zoom",
    props: ["skuImageList"],
    computed:{
      imgObj(){
        return this.skuImageList[0] || {}
      }
    }
  }
</script>
```

或者直接判断 当这个数据有值时才显示

```vue
<template>
  <div class="spec-preview">
    <img :src="skuImageList[0].imgUrl" v-if="skuImageList"/>
    <div class="event"></div>
    <div class="big">
      <img :src="skuImageList[0].imgUrl" v-if="skuImageList"/>
    </div>
    <div class="mask"></div>
  </div>
</template>
 
<script>
  export default {
    name: "Zoom",
    props: ["skuImageList"]
  }
```
