---
title: Vue3动态引入Element-plus icon图标
date: 2023-05-14
author: XiaoChen
category: frontend
tags:
  - Vue
---

直接贴代码

list数据

```vue3
const list = reactive([
  {
    path: "/user",
    name: "user",
    label: "用户管理",
    icon: "user",
    url: "UserManage/UserManage"
  },
  {
    label: "其他",
    icon: "location",
    path: "/other",
    children: [
      {
        path: "/page1",
        name: "page1",
        label: "页面1",
        icon: "setting",
        url: "Other/PageOne"
      },
      {
        path: "/page2",
        name: "page2",
        label: "页面2",
        icon: "setting",
        url: "Other/PageTwo"
      }
    ]
  }
])
```

动态引入icon图标： el-icon包裹（不包裹的话图标会很大，需要设置样式），用动态组件的方式引入图标

```vue
 <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path">
    <el-icon>
      <component class="icons" :is="item.icon"></component>
    </el-icon>
    <span>{{ item.label }}</span>
 </el-menu-item>
```
