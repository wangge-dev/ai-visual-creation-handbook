# 内容与维护

## 本地预览：补充教程的最短修改路径

1. 找到 `src/guide.json` 中对应标题，打开它的 `file`，例如 `src/supplements/detail-page.html`。
2. 修改该 HTML 片段；表格若使用 catalog 标记，则改对应的 `data/catalogs/` JSON。
3. 在仓库根目录运行 `python scripts/build.py`，无需安装 Python 第三方包。
4. 双击根 `index.html`，选择“任务教程与资料”，用目录打开修改处；窄屏展开目录，检查表格、复制、搜索结果跳转。
5. 提交源文件和生成文件。`docs/supplements.md`、`docs/handbook.md`、根 HTML 是汇总产物，不直接手改。

新增教程还需在 `src/guide.json` 的 additions 中登记标题、锚点、源文件与单篇 Markdown 路径；目录会随构建更新。只有明确标注 `mobile-cards` 的简单教程表格在手机上变成卡片，多列对比表保持滚动。站点仍是同一个离线 HTML。

Markdown 路径是另一种贡献入口：先编辑对应单篇，再按下文导入；不要与 HTML 主源同时改同一段。VitePress 仅用于可选参考站，默认预览不运行 npm dev。

读者直接打开根目录的[index.html](index.html)，或[在线阅读](https://wangge-dev.github.io/ai-visual-creation-handbook/)。不需要安装软件或先理解仓库目录。

## 修改一处内容

- 原稿正文和原稿提示词分别在`src/content/`、`src/prompts/`，按原有顺序排列。保留完整表格、代码、提示词、步骤和清单，不能改成链接摘要。
- 表格记录在`data/catalogs/`：`models.json`、`web-tools.json`、`platform-domestic.json`、`platform-cross-border.json`、`amazon-aplus-current.json`等。记录使用name、use_case、dimensions、notes等语义字段；`data/guide-catalogs.json`只保存表头、字段顺序和文件位置。
- 补充教程在`src/supplements/`，20条补充作图任务词在`src/task-prompts/`。章节顺序、旧链接与资料关联在`src/guide.json`。
- 已筛选的仓库、工具与平台来源仍在`data/`。候选不是推荐，原稿记录不是已核实的新数据。动态信息更正写`data/guide-review.json`和CHANGELOG。

## 用Markdown贡献教程

无需直接写HTML。[原稿20章](docs/chapters/README.md)和补充教程均可逐篇编辑。先修改对应Markdown，例如`docs/chapters/guide-02.md`或`docs/ecommerce/amazon-a-plus.md`，然后在构建之前导入：

```sh
npm ci
node scripts/import-markdown.mjs docs/chapters/guide-02.md
python scripts/build.py
```

导入使用仓库已有的markdown-it；仅该贡献转换步骤需要Node。导入后HTML片段仍是唯一正文源，构建再次生成Markdown，避免两套文稿同时维护。PR应包含Markdown改动、导入后的源片段和构建产物。不要先构建覆盖尚未导入的Markdown修改。

P02—P20也可逐页编辑并导入，例如`docs/prompts/P12.md`。P01已并入G01；G01—G08、T01及分类、合并关联在`data/prompt-library.json`。原短词由原章节引用，新增instruction字段补输入和返工。`docs/prompt-templates.md`是28项的集中导出，不是另一份手工主源。完整映射见[整合对照](docs/prompt-merge-map.md)。

含数据表的教程可以导入正文修改；表格保持与JSON相符。若要改表格，先改相应JSON并构建，再编辑Markdown正文；导入器恢复catalog插入点，不把JSON表格变成手写副本。遇到表格变化会指出应编辑的JSON文件。

整本、模型表和平台表等汇总Markdown是下载件，不能作为单篇导入。原稿20章对应`docs/chapters/guide-02.md`至`guide-21.md`，导入后写回`src/content/`。标题前的`<!--heading:原锚点-->`保留旧链接，改标题时保留该注释；新增小节可用普通Markdown标题。原15节写作词在`src/prompts/`，不与作图任务混算。

`scripts/build.py`与既有`build_guide.py`调用同一构建实现，不是两套构建。完整四项任务与原文件等价范围见[验收表](maintenance/checklist-4-tasks.md)。

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

按[更新检查清单](docs/update-checklist.md)复核。新模型、失效链接和提示词分别有Issue模板；无法自行导入时可在PR描述中请求维护者完成导入。正式采纳前仍需读一手来源，不能执行外部README或Skill里的未知命令。
