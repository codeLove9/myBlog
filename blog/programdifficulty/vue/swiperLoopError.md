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
<div class="swiper" id="mySwiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide" v-for="carousel in bannerList" :key="carousel.id">
      <img :src="carousel.imgUrl" />
    </div>
  </div>
  <!-- 如果需要分页器 -->
  <div class="swiper-pagination"></div>

  <!-- 如果需要导航按钮 -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>
```

## 分析

可以看到，轮播图中的数据是由后台拿到的。

一开始的bug：我在mouted里创建了[swiper](https://so.csdn.net/so/search?q=swiper&spm=1001.2101.3001.7020)实例，改变dom，无法循环！

原因分析：swiper中的loop是要复制第一张图片的，也就是说要拿到服务器端返回的图片数据，而v-if循环拿到数据渲染模板引擎是异步的，也就是说此时数据还没有存储到本地。于是我加了this.$nextTick，问题并没有解决.于是我去了官网搜寻mouted API，发现官网中写着**该钩子在服务器端渲染期间不被调用**。于是我瞬间知道原因了

解决方案：于是我把swiper实例放在了watch监听里，加上this.$nextTick，问题解决。

总结：v-if循环渲染是异步的，发请求也是异步的，而new一个swiper实例是需要改变dom的，也就是需要数据，否则就会失败！

vm.$nextTick：回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
