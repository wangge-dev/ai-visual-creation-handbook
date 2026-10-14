# 可选Actions工作流

github-pages.yml保留网站构建与发布流程模板。使用拥有workflow权限的账户把它放入.github/workflows/后，才会成为自动Actions工作流；同时将Pages切到workflow构建方式。

当前项目使用`npm run publish:site`构建后普通推送gh-pages分支，Pages按该分支发布。两种方式选择一种，避免两个发布者同时写站点。不要为了启用模板重置用户的凭证。
