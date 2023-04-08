---
title: Vue中自定义事件的 $event传参问题
date: 2023-04-08
author: XiaoChen
category: frontend
tags:
  - Vue
---

## 详解

1. $event 是 vue 提供的特殊变量，用来表示原生的事件参数对象 event

2. 在原生事件中，$event是事件对象 可以点出来属性

3. 在原生事件中，$event是事件对象，在自定义事件中，$event是传递过来的数据（参数）

4. 1在自定义事件中，$event是传递过来的数据

## 代码示范

## 原生vue里的$event

```vue
// 原生vue里的$event
 
<tempalte>
   <button @click = “getEvent($event)”>点击</button>
</template>
<script>
   export default {
      methods:{
         getEvent(e) {
            console.log(e)
            // e.target 是你当前点击的元素
            // e.currentTarget 是你绑定事件的元素
           #获得点击元素的前一个元素
           e.currentTarget.previousElementSibling.innerHTML
           #获得点击元素的第一个子元素
           e.currentTarget.firstElementChild
           # 获得点击元素的下一个元素
           e.currentTarget.nextElementSibling
           # 获得点击元素中id为string的元素
           e.currentTarget.getElementById("string")
           # 获得点击元素的string属性
           e.currentTarget.getAttributeNode('string')
           # 获得点击元素的父级元素
           e.currentTarget.parentElement
           # 获得点击元素的前一个元素的第一个子元素的HTML值
           e.currentTarget.previousElementSibling.firstElementChild.innerHTML
         },
      }
   }
</script>
```

## 自定义事件里的$event

```vue
// 子组件传值
export default {
    methods: {
        customEvent() {
            this.$emit(custom-event, value)
        }
    }
}
 
//父组件接收自定义事件
<template>
    <div>
        <my-list v-for="(item, index) in list" @custom-event="customEvent(index, $event)">
        </my-list>
    </div>
</template>
 
//父组件自定义事件方法中接收$event
export default {
    methods: {
        // e就是接收过来的$event 现在他就是子组件传过来的值 不再是 对象事件 
        customEvent(index, e) {
            console.log(e) // some value
        }
    }
}
```
