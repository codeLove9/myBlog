---
title: export与export default的区别
date: 2023-04-16
author: XiaoChen
category: frontend
tags:
  - JS
---

> [ES6](https://so.csdn.net/so/search?q=ES6&spm=1001.2101.3001.7020 "ES6") 中模块不是对象，而是通过`export`命令显式指定输出的代码，再通过`import`命令输入。

<!-- more -->

1.export与export default均可用于导出常量、函数、文件、模块等  
2.你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，以便能够对其进行使用  
3.在一个文件或模块中，export、import可以有多个（export 可以导出多个命名模块），export default仅有一个

* 输出单个值，使用export default
* 输出多个值，使用export
* export default与普通的export不要同时使用

4.通过export方式导出，在导入时要加{ }，export default则不需要

  (1)export的输出与import输入

```js
export function output() {
    // ...
}
 
import { output } from './example'
```

(2)export default的输出与import输入

```js
export default function output() {
    // ...
}
 
import output from './example'
```

从以上两种 import 方式即可看出，export default 的 import 方式不需要使用大括号包裹。因为对于 export default 其输出的本来就只有一个接口，提供的是模块的默认接口，自然不需要使用大括号包裹。

**切记，一个js文件中，只能有一个export default；**

**但是，一个js文件中，可以有多个export。**
