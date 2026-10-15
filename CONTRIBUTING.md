# 内容与维护

读者直接打开根目录的[index.html](index.html)，或[在线阅读](https://wangge-dev.github.io/ai-visual-creation-handbook/)。不需要安装软件或先理解仓库目录。

## 修改一处内容

- 原稿正文和原稿提示词分别在`src/content/`、`src/prompts/`，按原有顺序排列。保留完整表格、代码、提示词、步骤和清单，不能改成链接摘要。
- 原稿模型、工具、规格、仓库等表格来自`data/guide-catalogs.json`。对应章节的catalog标记由构建替换，不要再手写第二张同源表。
- 补充教程在`src/supplements/`，20条补充作图任务词在`src/task-prompts/`。章节顺序、旧链接与资料关联在`src/guide.json`。
- 已筛选的仓库、工具与平台来源仍在`data/`。候选不是推荐，原稿记录不是已核实的新数据。动态信息更正写`data/guide-review.json`和CHANGELOG。

修改后运行：

```sh
python scripts/build_guide.py
```

只需要Python 3标准库，无需安装Python包，也无需Node或VitePress。它生成根`index.html`、`dist/`、Markdown导出和旧页面跳转。导出件不要手工修改。直接双击新HTML检查相关段落、表格、提示词复制和搜索，再提交内容源和生成文件。

## 提交更新要说明什么

给出具体问题、来源原链接、适用时间与站点/类目/模块，以及修改前后的内容。模型特性、数字、平台尺寸和许可应回到一手来源核对；AIHOT可用于发现，不替代原文。没有取得来源时保留待核记录，不删掉原稿来掩盖缺口。

新增教程要有可用素材、具体动作、完整提示词、可见结果和针对性返工。真实运行、作者展示、静态阅读和计划分别说明，不编造成功率、PS源文件或平台通过结果。原稿成本内容仅保留引用，不调用付费服务或新增计费指南。

## 资料发现与发布

已有GitHub发现工具继续使用，安装其Node依赖后运行`npm run maintain -- --discover --limit 3`。按报告复核实际内容，再改相关HTML或资料卡；构建、检查后普通Git提交并推送。没有有效变化不制造日期更新。

`npm run publish:site`构建单页，运行既有引用检查，再推送gh-pages。VitePress只保留为可选参考构建`npm run build:reference`，不会覆盖默认单页。

代码、原稿和外部资料保留各自适用许可，不复制商业课程、凭证和完整私有资料池。发布不强推，不覆盖他人未提交工作。
