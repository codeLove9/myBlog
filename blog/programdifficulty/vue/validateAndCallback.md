---
title: elementUI自定义表单校验规则的两个大坑(callback和return)
date: 2025-06-15
author: XiaoChen
category: frontend
tags:
  - Vue
---

> elementUI表单校验时拿不到校验结果是为什么？

<!-- more -->

正常情况下，我们使用elementUI的时候会采用自定义表单校验，然后会自定义校验规则。

但是在自定义规则校验实践过程中，发现会有两个大坑！！！下面会详细解释

+ **自定义校验规则中不能直接写return，比如`if(!value)return;`必须返回一个回调函数callback()（返回callback的入参为空代表校验通过规则，返回含new Error（‘自定义提示’）入参代表校验不通过规则。）**
+ **必须保证自定义校验规则的每个分支都调用了callback方法，否则会导致el-form组件的validate方法无法进入回调函数。**

**重点来了，特别注意自定义规则这个方法的内容！！！！**

```vue
<el-form-item label="年龄" prop="age">
  <el-input v-model.number="ruleForm.age"></el-input>
</el-form-item>

// 自定义校验规则!!!
var checkAge = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('年龄不能为空'));
  }
  if (value &lt; 18) {
    callback(new Error('必须年满18岁'));
  // 注意，如果这里把else分支去掉，也就是没有callback()回调，会发现，保存不成功！  
  } else {
    callback();
  }
};
// 提交表单，进行保存校验
saveAndSubmit: function() {
  let loading = this.$loading()
  console.log("进入校验前")
  this.$refs['model'].validate((valid) => {
    console.log("准备校验")
    if (valid)
      .......省略代码
  })
}      
```

##### 第一坑：

比如`if(!value) return callback(new Error('年龄不能为空'));`

一定要写callback,如果你想写成`if(!value) { alert("年龄不能为空"); return ; }`这种方式是不行的！

##### 第二坑：

自定义校验方法每个分支必须要调用callback方法，不然会导致el-form组件的validate方法无法进入回调函数！！

比如将下面的else去掉，会发现在提交表单的时候，不会进入回调函数，**也就是下面的`console.log("准备校验")`不会输出！！！**

```vue
if (value &lt; 18) {
  callback(new Error('必须年满18岁'));
  // 注意，如果这里把else分支去掉，也就是没有callback()回调，会发现，保存不成功！  
} else {
  callback();
}

saveAndSubmit: function() {
  let loading = this.$loading()
  console.log("进入校验前")
  this.$refs['model'].validate((valid) => {
    console.log("准备校验")
    if (valid)
      .......省略代码
  })
}    
```
