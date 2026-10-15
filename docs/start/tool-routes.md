---
id: "tool-routes"
title: "网站、图层、节点与API：选择并跑通制作路线"
chapter: "00"
status: "已公开"
content_kind: "方法说明"
evidence_status: "沿原稿制作路线重写并核对官方文档；未调用生成服务"
last_modified: "2026-10-14T00:00:00.000Z"
resource_ids: ["comfyui", "invokeai", "rembg"]
tool_ids: ["lovart", "tapnow", "photoshop", "krita"]
order: 4
---

# 网站、图层、节点与API，按当前任务选择路线

原稿把制作分为网站版、工具版和API版。这一章保留分工，去掉计费内容和未经核实的模型排名。先看你手上有什么素材、要交什么文件，再选需要的工具，不用一开始把所有软件都装上。

### 一张图，先走网站与图层路线

有真实产品照片，要做场景副图，就用支持参考图的设计画布生成环境，再在PS/Photopea放回真实商品与准确文字。得到图片原文件、可编辑源文件和预览。这条路线的逐步操作、提示词与返工见[第一张图](first-image.md)。

Lovart从项目与素材开始，TapNow按图像节点接参考和任务。实际功能以当前界面为准，参考文件的身份和用途先说清楚。[Lovart项目文档](https://www.lovart.ai/docs/getting-started/design-your-first-project)、[TapNow图像文档](https://docs.tapnow.ai/en/docs/canvas/generate-and-edit-images)。

### 主图、参数与Logo，图层软件先接管

白底主图不一定需要生图，真实商品抠图、轻修、等比缩放和规范导出即可。尺寸、发货数量、Logo与准确文本优先保留可编辑层，方便多语言与SKU版本。操作见[Amazon主图](../ecommerce/amazon-listing.md)和[套图](../ecommerce/image-set.md)。

Photopea可在浏览器打开图像并保存PSD或导出JPG/PNG；PS与Krita按实际软件能力完成蒙版与排版。[Photopea打开与保存](https://www.photopea.com/learn/opening-saving)。保存PSD后重新打开检查，文件后缀不能证明文字和图层可编辑。

### 重复同一处理，再考虑节点

需要对多张图重复背景编辑时，可以用ComfyUI工作流保留模型、输入、蒙版、提示词与输出路径。先跑官方基础示例理解节点，再改为自己的任务；缺模型或节点先解决环境，不能靠一条提示词补齐。[ComfyUI基础inpaint](https://docs.comfy.org/tutorials/basic/inpaint)。

节点路线的蒙版、采样和保存步骤见[三类画布](../workflows/canvases.md)。本项目没有实际运行节点，不把社区README的效果视为本项目已验证结果。

### 商品库与大量任务，API负责连接而非审核

API路线将商品事实、素材索引和任务表交给已选图像接口，再接收任务结果、下载原图、合成与核对。具体代码必须对应接口当前官方字段、身份配置和错误方式，不能把一个模型的参数套给另一个模型。

```text
商品事实与素材索引
  → 一行一项的任务表
  → 已配置的图像生成或编辑接口
  → 保存任务ID与状态
  → 下载原结果
  → 真实主体合成与准确文字
  → 逐图核对与交付清单
```

网络失败先判断请求是否已经提交，保留原任务ID；有结果但下载失败重试原下载。返回成功只说明接口过程，不证明商品、文字、SKU与渠道要求正确。文件与状态方法见[批量任务](../workflows/batch.md)。本章没有调用接口、安装工具或建立生成服务。

### 下一步直接做一个任务

| 当前情况 | 下一篇 |
| --- | --- |
| 只有随手拍，需要第一张场景图 | [第一张图](first-image.md) |
| 已有清晰照片，需要六张商品图 | [完整套图](../ecommerce/image-set.md) |
| 需要十屏详情页 | [逐屏详情页](../ecommerce/detail-page.md) |
| 需要多个渠道与语言 | [跨境制作路径](../ecommerce/cross-border.md) |
| 需要复用节点与图层 | [三类画布](../workflows/canvases.md) |
