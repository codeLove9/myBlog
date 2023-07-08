---
date: 2021-06-12
title: md中文档开头一定要写Frontmatter，否则会导致Archieves模块时间排序错乱
category: theme
tags:
  - VuePress
---

> 创建新的md文档时文档头一定要定义Frontmatter,要么就删除md文档；不能创建了md文档不写Frontmatter

## 背景

我创建了一个新的test.md文档占坑时，准备以后补充内容，文档中什么都没写。

当我blog:dev启动项目时，点击Archieves模块查看自己的文档时，发现刚刚的test.md不见了，更离谱的是月份位置也错乱了。

## 原因

于是我开始排查原因，在Archieves组件中我发现以下代码：

```vue
computed: {
  archiveList() {
    let res = {};
    let tmp = [];
    let list = this.$site.pages.filter(item => {
      // return item.pid === 'post' || item.pid === 'studyprogresshtmlcss';
      return ~pidList.indexOf(item.pid)
    });
    list = list.sort((a,b) => {
      let time1 = new Date(a.frontmatter.date);
      let time2 = new Date(b.frontmatter.date);
      return time2 - time1;
    })
    list.map(item => {
      const date = new Date(item.frontmatter.date)
      const year = date.getFullYear();
      const month = date.getMonth();
      const monthKey = DATE_MAP[month]
      const day = `${date.getDate()}`;
      res[year] || (res[year] = {});
      res[year][monthKey] || (res[year][monthKey] = []);
      item.date = `${`${month + 1}`.padStart(2, 0)}-${day.padStart(2, 0)}`;
      res[year][monthKey].push(item);
    })
    for (let [key, item] of Object.entries(res)) {
      tmp.push({
        year: +key,
        list: item
      });
    }
    tmp.sort((a, b) => {
      return b.year - a.year;
    })
    return tmp;
  }
}
```

可以看到，使用过list.frontmatter.date进行比较的，如果不给md文档写frontmatter，那取值就是undefined。

undefined和另外一个时间戳做减法，返回值自然就会导致错乱了。
