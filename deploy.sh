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