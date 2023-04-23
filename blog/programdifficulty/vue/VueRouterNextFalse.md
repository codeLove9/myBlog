---
title: Vue-Router中next(false)的含义： 从哪儿来，就回到哪儿去
date: 2023-04-23
author: XiaoChen
category: frontend
tags:
- Vue
---

```vue
{
    path: '/trade',
    component: Trade,
    meta: { showFooter: true },
    beforeEnter: (to, from, next) => {
      if(from.path == '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
```

路由独享守卫，表示如果要去trade页的话，只有从shopcart页才能去，否则从哪个页想跳转到trade页，就回到那个初始页
