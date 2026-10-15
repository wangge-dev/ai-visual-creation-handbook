# 电商AI作图攻略与视觉创作补充

[在线阅读全文](https://wangge-dev.github.io/ai-visual-creation-handbook/) · [单文件HTML](https://wangge-dev.github.io/ai-visual-creation-handbook/downloads/index.html) · [整本Markdown](https://wangge-dev.github.io/ai-visual-creation-handbook/downloads/handbook.md) · [English](README.en.md)

下载后双击根目录的index.html即可阅读。正文、样式、目录、提示词、搜索和复制都在同一个文件内，不需要Node、Python、VitePress或本地服务器。

主阅读保留原稿的20章、目录、结语、30张表格、113个代码块和15节提示词包，沿用米白、黑色、橙色与原章节顺序。跨境、三类画布、PS协作等补充教程放在同页的“跨境与画布补充”；20条完整补充作图词集中放在“提示词包”，不需要逐页寻找。

## 直接找内容

- [小白准备、资料卡与拍摄](https://wangge-dev.github.io/ai-visual-creation-handbook/#一小白先看电商ai作图从哪里开始)
- [模型与工具对比表](https://wangge-dev.github.io/ai-visual-creation-handbook/#七主流模型与工具选择)
- [国内合规与高风险图片](https://wangge-dev.github.io/ai-visual-creation-handbook/#十一国内电商平台ai图合规边界)
- [平台图片规格与压缩工具](https://wangge-dev.github.io/ai-visual-creation-handbook/#十四各平台图片规格速查表)
- [榨汁杯详情页、提示词与精修](https://wangge-dev.github.io/ai-visual-creation-handbook/#十五从一张产品图到完整详情页案例)
- [Amazon A+原稿](https://wangge-dev.github.io/ai-visual-creation-handbook/#十六amazon-a图ai辅助方案)／[补充操作](https://wangge-dev.github.io/ai-visual-creation-handbook/#补充-amazon-a-plus)
- [提示词模板与迭代诊断](https://wangge-dev.github.io/ai-visual-creation-handbook/#十八电商ai作图提示词模板库)
- [跨境、三类画布与交付](https://wangge-dev.github.io/ai-visual-creation-handbook/#补充-cross-border)

原稿版本、尺寸和第三方成本记录完整保留，动态信息另列核查说明。恢复原文不代表所有技术主张都已重新验证；真实生图、软件运行与平台上传分别记录，不把原稿的“实测”说成本项目新实测。

## 修改与构建

只改对应内容源，再运行一次构建。

```sh
python scripts/build_guide.py
```

构建只用Python 3标准库，无需安装包。生成根index.html、dist/、Markdown导出和已有网址的跳转页；维护者需要Python，读者只需HTML。

| 要改什么 | 修改哪里 |
| --- | --- |
| 原稿章节／原稿提示词 | src/content/、src/prompts/ |
| 原稿模型、工具、规格、仓库表 | data/guide-catalogs.json |
| 补充教程／补充任务词 | src/supplements/、src/task-prompts/ |
| 配色、布局与复制搜索 | src/styles/、src/scripts/ |
| 资料卡与核查说明 | data/ |

HTML片段是正文源，docs/中的对应Markdown和下载件由构建生成。VitePress保留为可选参考工具，不是默认阅读入口。修改一处正文无需同时改Markdown、数据发现器与网站页面。

## 持续维护

既有候选发现、去重、复核和来源变化工具继续使用。发现线索后读取原始来源，修改具体章节或表格，保留完整提示词，再构建与发布；没有有效变化不制造日期更新。

[维护与贡献](CONTRIBUTING.md) · [维护手册](maintenance/README.md) · [更新记录](CHANGELOG.md) · [许可](LICENSE.md)

构建代码MIT；原创文档和提示词CC BY-SA 4.0，外部项目保留各自许可。中文正文完整，英文README不代表全书已翻译。
