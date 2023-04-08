---
title: Vue之路由嵌套(子路由)注意“/“斜杆问题
date: 2023-04-08
author: XiaoChen
category: frontend
tags:
  - Vue
---

> 在Vue项目中配置嵌套多级路由时很大可能会因为子路由路径问题抛出报错

## 说明

如果 路由组件 是一个另一个 路由组件 的 子路由组件 的话：

在配置路由规则是，path 路径，前面不能添加 '/'， 它代表根路径；加上他就不会拼接上父路由组件的 path 路径的，如：

## 代码段

```vue
import Home from '../views/Home.vue'
import New from '../views/New.vue'
import Message from '../views/Message.vue'
 
const router = new VueRouter({
    routers:[
        {
            path: '/home',
            component: Home,
            children:[
                // 要么全写
                { path: '/home/new', component: New },

                // 简写前面不能加'/'，不然加载不出来
         ------ { path: '/message', component: Message }, ----  //错误示例！！！
 
                { path: 'message', component: Message },
            ]
        }
    ]
})
```

```vue
view > Home.vue
 
<template>
  <div class="home-content">
    <h1>home</h1>
    <div>
      <!-- 链接的路径还是要写全的 -->
      <router-link to="/home/new" tag="span">new</router-link>
      <router-link to="/home/message" tag="span">message</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
```

![image example](https://img-blog.csdnimg.cn/20201104112343176.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p4Zl9DTg==,size_16,color_FFFFFF,t_70#pic_center)
