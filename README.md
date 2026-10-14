# AI视觉创作实战知识库

面向实际交付的作图、修图与工作流手册。电商是最大专题，覆盖跨境电商、品牌物料、内容配图、人物、空间、信息图、插画与视频。设计画布、ComfyUI节点和PS／Krita图层按任务衔接。

[在线阅读](https://wangge-dev.github.io/ai-visual-creation-handbook/) · [完整建设目录](https://wangge-dev.github.io/ai-visual-creation-handbook/outline) · [资源资料卡](https://wangge-dev.github.io/ai-visual-creation-handbook/resources/)

首批包含14章完整建设目录、18篇基础方法、电商核心流程、8条完整原创模板与11张仓库资料卡。模板尚未执行图像任务，平台粘贴与PS操作也不冒充已实测；真实案例持续补充。

- [阅读目录](docs/outline.md)
- [第一张可用图](docs/start/first-image.md)
- [电商套图](docs/ecommerce/image-set.md)／[跨境交付](docs/ecommerce/cross-border.md)
- [三类画布](docs/workflows/canvases.md)／[Codex协作PS](docs/workflows/codex-ps.md)
- [完整模板](docs/prompts/index.md)
- [维护与贡献](maintenance/README.md)

## 本地运行

需要Node.js 22或更高版本。

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build`从同一份正文生成阅读站、整本Markdown、独立阅读HTML及公众号内联正文。下载件在`docs/.vitepress/dist/downloads/`，不手工编辑生成件。

## 维护

```sh
npm run maintain -- --discover --limit 3
npm run maintain -- --repo dlazy-ai/ecommerce-skills
npm run test
```

维护器读取GitHub公开信息，记录候选、实际变化、失败与影响页面，保留失败来源的成功位置。它不会安装仓库、执行外部Skill或自动把候选变成推荐。发布内容经来源复核后提交；没有有效变化不制造空更新。

代码采用MIT；本项目原创文档、提示词与编写的资料卡采用CC BY-SA 4.0，详见[许可说明](LICENSE.md)。引用项目保留各自许可，链接收录不赋予复制其代码、图片或商标的权利。
