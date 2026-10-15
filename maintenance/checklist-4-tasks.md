# 四项任务验收：入口、修改方法与证据

核对日期：2026-10-15。对应用户提供的四任务清单与 README 模板。这里区分实际功能完成与清单中无法同时满足的字面条件，不能用“已部署”替代工程验收。

## 任务1：模块化拆分

- [x] [HTML 组装入口](../src/index.html)、[逐章内容](../src/content/)、[独立 CSS](../src/styles/)、[独立 JS](../src/scripts/)存在且参与实际构建。
- [x] `python scripts/build.py`实际执行成功，生成根`index.html`和`dist/index.html`，仅用 Python 标准库。
- [x] 本轮实改第一章后，其内容传播到页面与 Markdown；其余章节源未被贡献流程连带修改。
- [x] 原20章顺序、原15节文章提示词保留，构建统计原稿30表、113代码块。原配色文件本轮未改。
- [ ] **整份产物与最早原HTML逐字diff无差异**：不成立。补充教程、去重入口和新交互已进入阅读版，不能同时声称新增内容和文件完全相同。原稿完整内容另有[原稿导出](../docs/guide-original.md)与[原提示词导出](../docs/prompt-original.md)；此前原表格/代码保留核对见[v3验收](v3-acceptance.md)。本轮最终根HTML与本轮开始时一致。

清单的`ch01-*.html`为示例命名；现有文件使用`guide-02.html`到`guide-21.html`保存20章，`guide-00/01/22`保存引言、目录和结语。15节文章提示词在`src/prompts/`，没有为了改名再制造第二份源。

## 任务2：JSON 驱动表格

| 清单中的资料 | 实际唯一表格记录入口 |
| --- | --- |
| models.json | [models.json](../data/catalogs/models.json) |
| tools.json | [web-tools.json](../data/catalogs/web-tools.json)、extra-tools.json、vertical-domestic.json、vertical-cross-border.json |
| platforms.json | [platform-domestic.json](../data/catalogs/platform-domestic.json)、[platform-cross-border.json](../data/catalogs/platform-cross-border.json)、amazon-aplus-current.json |
| github-repos.json | [prompt-repositories.json](../data/catalogs/prompt-repositories.json)、[open-source-tools.json](../data/catalogs/open-source-tools.json) |

- [x] 表格记录在`data/catalogs/`的13个JSON中；[guide-catalogs.json](../data/guide-catalogs.json)仅保存列头、字段与文件映射。
- [x] 本轮实际修改一个模型名称并运行构建，根HTML、dist HTML、模型Markdown、下载件和第七章Markdown均更新；验证文字已恢复。
- [x] JSON可以标准解析，正文插入点从JSON渲染，不维护第二张硬编码同源表。

已核对的工具和仓库资料卡分别在既有`data/tools.json`与`data/repositories.json`，其职责与原稿表格不同。正文仍会引用工具和平台名称；JSON化不表示把每一句教程说明都移入数据文件，也不表示历史型号与数字已重新证实。

## 任务3：核心 Markdown 与 PR 贡献

- [x] [20章逐章目录](../docs/chapters/README.md)新增可编辑Markdown，不再只有整本下载件。
- [x] 清单要求的[集中模板](../docs/prompt-templates.md)、[平台规格](../docs/platform-specs.md)、[模型比较](../docs/model-comparison.md)、[术语](../docs/glossary.md)、[跨境篇](../docs/cross-border-guide.md)均有实质内容。
- [x] 本轮20章均执行“Markdown导入HTML”往返比较：正文Markdown、标题锚点、完整代码文本与JSON插入点保持一致（换行符差异不计入内容变化）。
- [x] 本轮实际给第一章Markdown加一段正文，导入后构建，源HTML、最终HTML、整本及单章Markdown均出现该段；临时改动已恢复。
- [x] [贡献说明](../CONTRIBUTING.md)明确先导入后构建，PR提交修改源及相应产物。

示例：

```sh
npm ci
node scripts/import-markdown.mjs docs/chapters/guide-02.md
python scripts/build.py
```

HTML仍是装配源；Markdown是可导入的贡献视图。汇总表改JSON，整本与集中导出不直接反向导入。这个限制写在贡献说明中，避免构建覆盖尚未导入的Markdown修改。

## 任务4：任务提示词整合

- [x] 原稿同类短词与P01—P20按任务合并；不是把两个包直接首尾拼接。[逐项映射](../docs/prompt-merge-map.md)说明每项去向。
- [x] 当前28项：通用3、品类5、跨境平台7、跨境交付与本地化6、其他创作与修图7；ID唯一。
- [x] P01场景指向G01；白底P10、尺寸P18、横幅P14、促销/封面P15保留合并后的单一任务入口。
- [x] P16英文、P17日文保留；平台任务与跨境交付分类独立。
- [x] 公式、负面词和迭代诊断作为方法保留；15节文章写作词单独展示，不混算生图任务。

这里的“去重”指重复任务归到同一任务卡，不能解释为全书不再出现相同约束或教学示例。完整原稿作为资料仍保留。模板本轮未调用模型执行，复制验证见v3验收。

## README、维护和未完成边界

- [x] README按七部分重写：定位、快速开始、资料获取、核心内容、贡献、更新、原则；首页不再用具体商品案例作总入口。
- [x] 明确唯一修改源与生成文件，修正“克隆后打开dist”这一不可执行步骤，离线打开根index.html。
- [x] 原有周维护机制继续使用，更新流程已包含JSON修改、Markdown导入和同源构建。
- [x] CHANGELOG记录实际发生的改动；不虚构缺少依据的v2026.07历史。
- [ ] 当前所有平台模块尺寸、各Shopee站点规则、Shopify实际店铺效果仍未全面验证；具体待核项见v3验收。
- [ ] 实际生图、PS／ComfyUI运行、真实后台上传与审核本轮没有执行。

本轮传播与20章往返结果见[结构化记录](checklist-verification.json)。原稿内容保真、来源事实核验、真实软件操作和读者验收分别说明，不相互替代。
