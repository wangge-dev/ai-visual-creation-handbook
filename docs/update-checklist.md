# 更新检查清单

每周发现候选，每月复核重点资料。没有实质变化不修改公开核对日，也不为凑数量收录。

- [ ] 从[AIHOT作图专题](https://aihot.news/topics/image-gen)、已有GitHub检索词和官方发布发现变化，保留原始出处。
- [ ] 检查模型版本、支持的输入/输出、参数、平台范围和许可；不从转述推导“最新第一”，不新增计费指南。
- [ ] 到官方页面或仓库实现核对，标注发布日、核对日、范围。来源可访问不等于功能实测。
- [ ] 修改对应`data/catalogs/*.json`记录；资料卡仍在`data/repositories.json`、`data/tools.json`、`data/platform-rules.json`。表格结构在`data/guide-catalogs.json`。
- [ ] 运行维护器的外链检查；登录/限流/暂时失败不直接判链接永久失效。沿用已有失败续跑记录。
- [ ] 根据资料ID和报告定位`src/`内容，修正文案、步骤或任务词。提示词入库前查`data/prompt-library.json`，重复用途合并到已有任务。
- [ ] Markdown贡献先执行导入命令，再构建；不要让构建覆盖还没导入的修改。
- [ ] 运行`python scripts/build_guide.py`，检查改动处、复制、下载和相关旧入口；修改维护器才运行对应测试。
- [ ] 在CHANGELOG记录实际变化与未验证部分，普通提交；经授权发布后读取线上实际内容。

发现命令：`npm run maintain -- --discover --limit 3`。月度复核使用既有`--monthly`参数。运行日志在被Git忽略的`.maintenance/`；不公开凭证、私有资料池或完整采集响应。

平台复核记录最少包含：站点、类目、图位或模块、实际规则、官方链接、来源版本、核对日期、是否实际上传。Amazon旧PDF不能替代当前账户模块；Shopee SG优化指导不外推所有国家；Shopify写清主题版本与区块；TikTok US和接口教程分别处理。
