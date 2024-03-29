---
date: 2023-03-25
title: git实战总结
cover: /images/git.png
category: frontend
tags:
  - Git
---

## 在进入公司里的第一件事就是拉代码，可见git的重要性。在此我特别记录一些我在开发中和工作中遇到的坑，以示警戒

## 公司里的分支结构

|分支名称|解释|
|---|---|
|master|主分支，也是生产分支，已经上线的app就是基于这个分支，也是最稳定的分支。|
|feature/task_xxxxx|开发分支，基于master拉下来的分支，一般以需规编号命名|
|sit|单元测试分支，开发分支开发完成后发起merge request请求，合并到sit分支供测试人员测试|
|uat|业务测试分支，sit分支测试完成后，再合到此分支进一步测试|
|rel(release)|预发布分支，在测试后确认没有bug后合并到此分支等待投产|

## 公司项目拉下来后跑不下来原因

一般公司都会对自己的项目设置很多东西，如npm的、gitLab的设置等，此时跑不下来是正常的
，不要惊慌，向同事索要配置文档全部跑一遍就好了

## git push注意点

当项目拉下来后，npm i后会导致很多文件被改变，当我们开发完成后，一定要对所有已修改文件选择性暂存。

**严格执行只push自己对于实现功能的文件（如vue/js文件等），package.lock一定不能push上远程。**

**package文件原则上只在涉及到依赖包升级的情况下向上申请同意后再push。**

## 代码回退

开发时总会不可避免的不小心错误push操作，这时我们可以使用`git log`或者去gitLab远程history历史查看想要回退的commit的SHA值(这个值很长，千万不能复制错了，我踩坑过)，然后使用如下代码进行回退：

1.`git reset --soft xxxxxxxxxxxxxxxx`

2.`git reset --hard xxxxxxxxxxxxxxxx`

> ‘xxxxxxxxx’为需要回退的版本号SHA值。

两种命令区别： **--soft是软回退，回退后不会抹除当前的代码；--hard是硬回退，回退的同时直接抹除当前代码，回到回退版本的代码。**

## 设置本地分支关联远程分支

当某个分支第一次push时需要设置当前分支关联的远程分支，否则git不知道往远程哪个分支push。代码如下：

```git
git push --set-upstream origin "your ref branch"
简写： git push -u "your ref branch"
```

## gitHub push 404 or connection error

1. `git config --global http.sslverify false`

2. 保证连接的远程存储库是SSH类型的

* HTTPS类型 如 `git@github.com:codeLove9/myBlog.git` 的是以互联网形式进行push的，大多数情况下需要很好的网络（科学上网工具）才能保证push的上去
* SSH类型 如 `https://github.com/codeLove9/myBlog.git` 是另外一种协议，类似于直连，可以不受当前网络的影响，大大增加push成功率

> 如果链接SSH仓库失败，就是当前本地没有配置SSH密钥，配置的具体方案见此 [服务器上的 Git - 生成 SSH 公钥](https://git-scm.com/book/zh/v2/%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84-Git-%E7%94%9F%E6%88%90-SSH-%E5%85%AC%E9%92%A5)

## 修改git已提交的commit中提交者的用户名和邮箱

之前新买的电脑不知道是不是忘记设置全局用户名和邮箱了，有一天发现明明天天都在commit，可是github活跃度表竟然都没有小绿格，血泪教训。查看commit history后发现提交用户名是本机的默认user，大概就是忘记设置git了。

如下图中,将已经提交的commit中,用户名`jincheng-demo,jincheng-demo01`,邮箱`jincheng@test.com`

修改为正确的用户名:`jincheng`,正确的邮箱:`jincheng_921@163.com`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210714150220957.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ppbmNoZW5nXzkyMQ==,size_16,color_FFFFFF,t_70#pic_center)

### 步骤

1.打开`git bash here` 客户端
2.复制需要修改的项目的git地址

```git
git clone --bare https://gitee.com/xxxx/test01.git(这里替换成自己的git地址)
cd test01.git (clone完成后,进入项目目录)`
```

3.建议执行以下命令,查看当前的git提交后的用户名和邮箱

```git
git config user.name
git config user.email
```

4.复制脚本,并修改成自己的信息,粘贴到`git bash here`客户端中,按enter执行  
    `OLD_EMAIL`:原来的邮箱名称,这里我的是`jincheng@test.com`  
    `CORRECT_NAME`:新的用户名称,我自己的是`jincheng`  
    `CORRECT_EMAIL`:新的邮箱,`jincheng_921@163.com`

```git
#!/bin/sh

git filter-branch --env-filter '

OLD_EMAIL="jincheng@test.com"
CORRECT_NAME="jincheng"
CORRECT_EMAIL="jincheng_921@163.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
export GIT_COMMITTER_NAME="$CORRECT_NAME"
export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
export GIT_AUTHOR_NAME="$CORRECT_NAME"
export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags

```

执行后,如下图绿色框中的输出,如果项目本身提交次数很多,则需要等待全部执行完成

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210714152244206.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ppbmNoZW5nXzkyMQ==,size_16,color_FFFFFF,t_70#pic_center)  
5.上一条脚本信息执行完成后,执行一下git命令

```git
git push --force --tags origin 'refs/heads/*'
```

查看提交的日志信息,用户名和邮箱已经修改过来了  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210714153030167.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ppbmNoZW5nXzkyMQ==,size_16,color_FFFFFF,t_70#pic_center)

git服务端也修改成功  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210714153233898.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ppbmNoZW5nXzkyMQ==,size_16,color_FFFFFF,t_70#pic_center)  
6.清理本地信息

```git
cd ..
rm -rf test01.git
```

> 备注
>
> 1. `git clone --bare` 没有clone项目的全部文件,所以修改完用户名和邮箱,可以直接清理掉
> 2. 如果本地之前有clone过完整项目,建议直接清理掉,再重新clone.(我一开始直接pull,再push,发现本地历史记录又覆盖了之前修改的用户名和邮箱,清理掉,直接重新clone,就没有问题了)

## 本地dist文件夹部署到gh-pages

### 背景

之前部署的方案是每次都要在项目外部重新再建一个夹子，把项目里打包好的文件都复制替换掉，再push到远端，但是这样做每次都显得很麻烦，我就在思考有没有什么方便的方法

### 解决方案

后来我发现了用shell脚本可以解决这个问题，只需要在项目里建一个.sh文件（一般命名为deploy.sh），需要部署的时候直接执行`bash deploy.sh`命令，就会自动把dist文件下的所有文件推送到远端gh-pages分支下，省时又省力，彷佛一下子打开了新世界的大门！！

下面贴出.sh脚本文件的代码段

```shell
# 1.运行命令： bash deploy.sh
# 2. 在vsCode终端或者cmd中运行会抛出错误
# 3. 需要在powerShell或者gitBash中运行

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run blog:build

# 进入生成的文件夹
cd blog/.vuepress/dist

# 提交到git本地暂存区
git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:codeLove9/myBlog.git master:gh-pages

# 回到原来的目录
cd -
```
