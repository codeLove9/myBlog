---
title: swiper轮播图loop循环失效bug解决（watch+nextTick）
date: 2023-04-09
author: XiaoChen
category: frontend
tags:
  - Vue
---

## 示例

template渲染页代码如下：

```vue
<!--banner轮播-->
<template>
  <div class="swiper" id="floor1Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carouselList in list" :key="carouselList.id">
        <img :src="carouselList.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
```

## 分析

可以看到，轮播图中的数据是由后台拿到的。

一开始的bug：我在mounted里创建了[swiper](https://so.csdn.net/so/search?q=swiper&spm=1001.2101.3001.7020)实例，改变dom，无法循环！

尝试解决：我最开始先尝试着在mounted钩子中加了this.$nextTick，this.$nextTick中创建swiper实例，但问题并没有解决。我去了官网搜索了mounted API，发现官网中写着**该钩子在服务器端渲染期间不被调用。**  
又搜索了为什么mounted+this.$nexttick解决不了，答案是**代码运行到mounted钩子函数时，页面元素还没加载，dom还没有渲染完成，所以在nextTick里获取不到dom元素，一般nextTick是和watch一起用的。**

原因分析：swiper中的loop是要复制第一张和最后一张图片的，也就是说要拿到服务器端返回的图片数据，而**v-for循环拿到数据渲染模板引擎是异步的，不会等到list里有了数据再去遍历**。也就是说此时数据还没有存储到本地就开始遍历了，遍历了一个空数组。

解决方案：把swiper实例放在了watch监听里，加上this.$nextTick，问题解决。监听到了list有了数据再去创建实例，可以保证此时v-for遍历的是有数据的数组，自然可以解决没有那两张复制图片，loop循环失效的bug。

代码如下：

```vue
<script>
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: {
    list: {
      type: Array
    }
  },
  watch: {
    list: {
      handler: function (newVal, oldVal) {
        this.$nextTick(() => {
          var mySwiper = new Swiper('.swiper', {
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },

            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar'
            },
            autoplay: true
          })
        })
      },
      immediate: true
    }
  }
}
</script>
```

总结：  
v-for循环渲染是异步的，发请求也是异步的，而new一个swiper实例是需要改变dom的，也就是需要数据，否则就会失败！

mounted钩子：该钩子函数在服务器端渲染期间不被调用！

vm.$nextTick：回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。

mounted中调用vm.$nextTick：代码运行到mounted钩子函数时，页面元素还没加载，dom还没有渲染完成，所以在nextTick里获取不到dom元素，一般
vm.$nextTick是和watch一起用的。
