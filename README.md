# AI作图知识库 · 电商与视觉创作实战

这是一个**开源的 AI 作图知识库**，帮助你从真实素材出发，完成图片制作、提示词迭代、后期精修和交付检查。电商是最大专题，也收录品牌、内容配图、人物、空间和信息图等创作方法。

[在线阅读](https://wangge-dev.github.io/ai-visual-creation-handbook/index.html) · [下载单文件 HTML](https://wangge-dev.github.io/ai-visual-creation-handbook/downloads/index.html) · [整本 Markdown](https://wangge-dev.github.io/ai-visual-creation-handbook/downloads/handbook.md) · [集中提示词](docs/prompt-templates.md) · [English](README.en.md)

**找外部提示词库推荐：** [第九章：GitHub提示词库与开源资源](docs/chapters/guide-10.md) · [提示词库与开源工具表](docs/github-repos.md) · [独立图片提示词库](https://github.com/wangge-dev/wangge-gpt-image-2-5)。本手册的[28项任务模板](docs/prompt-templates.md)也保留集中入口。

**找公众号实操文章：** [2026年8月起的文章阅读指引](docs/resources/wechat-reading.md)，按详情页、画布、Amazon A+、封面和修图分组，标明原文日期、可学习步骤和提示词获取情况。

**四项跟做教程：** [商品资料到详情页](docs/ecommerce/detail-page.md) · [高级A+简报与草稿](docs/ecommerce/amazon-a-plus.md) · [公众号封面与正文四图](docs/brand-content/wechat-visuals.md) · [局部修图与照片创作](docs/workflows/local-retouch.md)。包含完整指令、逐步产物和返工检查；实际出图与平台后台操作尚未执行。

## 1. 这是什么，适合谁

适合需要制作商品主图、详情页、Amazon A+、跨境素材的运营和卖家，也适合设计师、内容创作者，以及希望建立图片交付流程的团队负责人。新手可从第一张图开始，不必先学习 API 或节点软件。

这里提供完整步骤、表格、提示词和检查清单；不提供上架、客服或经营分析系统，也不是完整的视频制作课程。品牌、人物、空间等补充专题目前以任务入门为主。

原稿动态信息与后续核对说明并存，模型版本和平台规格请同时查看适用时间、站点与来源。来源核对和实际生图／平台上传是不同状态；未实测的内容不会标作已实测。

## 2. 快速开始：四步做第一张图

### 第一步：按角色找到任务

| 你是谁 | 想完成什么 | 从这里开始 |
| --- | --- | --- |
| 完全小白 | 准备资料、拍清商品，完成第一张图 | [前置准备与拍摄](docs/chapters/guide-02.md) → [第一张可用图](docs/start/first-image.md) |
| 国内电商运营 | 主图、套图、详情页 | [商品套图](docs/ecommerce/image-set.md) → [详情页步骤](docs/ecommerce/detail-page.md) |
| Amazon 卖家 | 主图、副图与 A+ 模块 | [Listing 图片](docs/ecommerce/amazon-listing.md) → [A+ 跟做](docs/ecommerce/amazon-a-plus.md) |
| Shopee 卖家 | 封面、规格与变体图 | [站点与本地化](docs/ecommerce/shopee-localization.md) |
| Shopify 团队 | 产品媒体、桌面与手机横幅 | [产品页](docs/ecommerce/shopify-product.md) → [横幅](docs/ecommerce/shopify-hero.md) |
| 服装运营 | 模特图、试穿与商品一致性 | [虚拟试穿](docs/chapters/guide-18.md) → [品类提示词](docs/ecommerce/category-prompts.md) |
| 设计师／内容创作者 | 组织画布、图层精修和品牌素材 | [三类画布](docs/workflows/canvases.md) → [品牌物料](docs/brand-content/brand.md) |
| 团队负责人／开发者 | 多 SKU 交付、批处理与复用 | [交付清单](docs/ecommerce/cross-border-sku-delivery.md) → [批量流程](docs/workflows/batch.md) |

### 第二步：准备真实素材

收集清晰实拍图、商品名称与尺寸材质、能证明的卖点、品牌素材，以及目标平台和语言。填进[商品简报](docs/ecommerce/product-brief.md)。没有事实依据的参数和功效不要交给模型补写。

### 第三步：按任务选工具

| 当前任务 | 优先路线 | 继续阅读 |
| --- | --- | --- |
| 场景图或创意稿 | 支持参考图的网站工具／AI 设计画布 | [路线选择](docs/start/tool-routes.md) |
| 产品、Logo、参数与准确文字 | PS、Photopea 或 Krita 图层精修 | [Codex 与 PS 协作](docs/workflows/codex-ps.md) |
| 重复编辑一批图片 | ComfyUI 节点流程或已有 API 接口 | [工作流表](docs/comfyui-workflows.md) |

需要比较具体工具时，查[模型表](docs/model-comparison.md)和[工具表](docs/tools.md)，同时核对来源说明。先跑通任务，再决定是否增加工具。

### 第四步：完成一张，再扩展为一套

真实商品图 → 抠图／整理素材 → 生成候选背景或场景 → 图层合成与准确文字 → 对照实物检查 → 按渠道导出。

从[第一张图教程](docs/start/first-image.md)开始，复制[完整任务提示词](docs/prompt-templates.md)，替换自己的素材和参数；结果不合格时按[提示词迭代诊断](docs/chapters/guide-19.md)和[质检清单](docs/chapters/guide-20.md)返工。

## 3. 如何获取资料

| 使用方式 | 操作 |
| --- | --- |
| 在线阅读 | 打开[完整单页](https://wangge-dev.github.io/ai-visual-creation-handbook/index.html)，用目录、搜索和页签找内容 |
| 离线阅读 | 下载仓库 ZIP 并解压，双击根目录 index.html；无需安装 Node、Python 或 VitePress。也可将上方单文件 HTML 链接另存为文件 |
| 复制提示词 | 在线页切换到提示词包，找到任务卡并复制；也可查[集中 Markdown](docs/prompt-templates.md) |
| 飞书／Markdown 阅读 | 下载整本 Markdown 后按平台支持的方式导入，或取用[跨境篇](docs/cross-border-guide.md)、[平台规格表](docs/platform-specs.md) |

仅阅读无需构建。维护者构建后还会得到 `dist/index.html`；`dist/` 不随源码提交，不能把它当成克隆后就有的文件。

## 4. 核心内容

原稿保留 20 章，按原顺序阅读；[逐章 Markdown 目录](docs/chapters/README.md)可直接查看和贡献。

| 章节 | 内容 |
| --- | --- |
| 01—04 | 小白准备与拍摄、按已有资料选流程、图片任务、网站／工具／API 路线 |
| 05—08 | 原稿 API 概念、Codex／Agent 分工、模型工具表、电商专题平台 |
| 09—12 | GitHub 资源、ComfyUI 工作流、国内风险边界、跨境平台方案 |
| 13—16 | 标准 SOP、平台图片规格、完整详情页案例、Amazon A+ |
| 17—20 | 虚拟试穿、提示词与迭代方法、质检问题、新手与团队路线 |

补充篇包括 Amazon、Shopee、Shopify、TikTok Shop US、本地化与 SKU 交付；也包括 AI 设计画布、ComfyUI、PS／Krita 图层协作，以及其他视觉创作入门。[跨境集中导出](docs/cross-border-guide.md) · [通用作图与提示词方法](docs/workflows/method-lab.md) · [术语表](docs/glossary.md)

**提示词集中为 28 项任务**，原稿同类短词与 P01—P20 已按用途合并，P01 指向 G01。原稿 18 个小节含公式和诊断方法，不能当成 18 个独立模板简单相加；15 节文章写作提示词单独保留。[整合对照](docs/prompt-merge-map.md)

## 5. 如何贡献

不需要懂工程也可以[提交问题或资料线索](https://github.com/wangge-dev/ai-visual-creation-handbook/issues)：说明要解决的任务，附一手来源、适用日期、站点或模块。提示词请附完整输入、指令、结果及失败情况；未运行也可提交，但需注明。

能直接修改时，只改对应内容源：

| 改什么 | 修改入口 |
| --- | --- |
| 原稿章节 | [逐章 Markdown](docs/chapters/README.md)，先导入再构建；对应 HTML 在 src/content/ |
| 模型、工具、平台表记录 | [data/catalogs/](data/catalogs/)；如 models.json、web-tools.json、platform-cross-border.json |
| 补充教程 | docs/ 中的单篇 Markdown，先导入再构建；对应 src/supplements/ |
| 通用任务、合并关系与分类 | [data/prompt-library.json](data/prompt-library.json)；P02—P20 可编辑 docs/prompts/ 单篇并导入 |
| 配色、布局、交互 | [src/styles/](src/styles/) 与 [src/scripts/](src/scripts/) |

修改 JSON 或源 HTML 后：

```sh
python scripts/build.py
```

修改单篇 Markdown 后，**先导入再构建**，例如：

```sh
npm ci
node scripts/import-markdown.mjs docs/chapters/guide-02.md
python scripts/build.py
```

构建只需 Python 3 标准库；仅 Markdown 导入及维护工具需要 Node 依赖。提交 PR 时带上内容源与构建生成的文件。表格内容从 JSON 生成，汇总 Markdown 和根 HTML 是产物；不要同时手改三份。[贡献说明](CONTRIBUTING.md) · [四任务验收与证据](maintenance/checklist-4-tasks.md)

## 6. 持续更新

维护节奏是每周发现与筛选、每月复核重点来源和原稿外链；有效变化再更新正文与记录。现有周期任务在维护者本机运行，克隆仓库不会自动获得定时任务，也未启用 GitHub Actions 定时发布。

AIHOT、GitHub 仓库与社区信息用于发现线索；正式采纳前查看项目原仓库、工具官方文档和对应站点的平台规则。候选库与正式推荐分开，来源变化关联到受影响章节。

[维护手册](maintenance/README.md) · [更新检查清单](docs/update-checklist.md) · [更新记录](CHANGELOG.md)

## 7. 核心原则

1. 真实商品与可核对的素材是基础，不凭空补产品结构、参数和功效。
2. AI 辅助场景与效率，人工负责商品真实性、文字和交付检查。
3. 准确文字、Logo 和参数优先保留可编辑图层，逐项校对。
4. 不承诺平台审核必过，规格明确站点、类目、模块和适用时间。
5. 保留原内容与来源，区分作者展示、本项目实测和未验证状态；不虚构更新历史。

构建代码采用 MIT，原创文档与提示词采用 CC BY-SA 4.0；外部项目保留各自许可，见[许可说明](LICENSE.md)。
