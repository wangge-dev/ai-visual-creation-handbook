---
id: "cross-border-canvas"
title: "跨境画布：设计、节点与图层怎样衔接"
chapter: "03"
topic: "cross-border"
tool_ids: ["lovart", "tapnow", "photoshop", "krita"]
status: "已公开"
evidence_status: "按原稿重写并核对官方操作资料；未执行生图、软件操作或平台上传"
last_modified: "2026-10-14T00:00:00.000Z"
resource_ids: ["comfyui", "invokeai", "krita-diffusion", "ecommerce-skills", "background-replacement-workflow", "ad-production-kit"]
platform_rule_ids: ["amazon", "shopify", "shopee"]
order: 23.8
content_kind: "操作教程"
---

# 跨境画布，把一个项目交接到三个渠道

本节把DN01跨境练习放进一个可复用项目，做出画布分区、图层结构与渠道导出表。具体生成与蒙版入口见[三类画布操作](../workflows/canvases.md)，这里重点讲跨渠道交接时怎样避免串图。

### 1. 在设计画布放四组资料

第一组是事实表与真实照片，按SKU分开；第二组是渠道任务表，列Amazon主图/副图/A+、Shopify媒体/横幅、Shopee SG封面/规格；第三组放候选背景；第四组只放已完成商品核对的图片。别让候选和交付图混在一个区域里。

```text
整理DN01跨境视觉项目，不生成图片。将商品事实、真实照片、准确文案和渠道任务分区。每张图标记SKU、市场、语言、用途和版本。
Amazon主图只用真实主体与纯白底；副图解释用途和结构；A+按实际模块尺寸；Shopify横幅区分桌面和手机；Shopee SG单独核站点与变体。
列出可复用背景、必须替换的商品层和文字层、尚缺的照片与参数。候选图不进入交付清单，规划任务不标为完成。
```

### 2. 候选背景只核场景与留白

同一桌面背景可以用于不同商品页场景，但要检查用途、尺寸关系和裁切。背景里如果已经生成了假收纳盒，不能继续放真实盒子叠在旁边；先擦除或重新生成空背景。

用TapNow局部Redraw时只标假商品或多余道具，保留真实主体之外的范围；图层文件里则直接换背景。生成结果下载原文件，命名包括用途，例如 `desk_scene_no-product_v01.png`，不要写“主图已通过”。

### 3. 图层文件按职责建组

```text
DN01_scene_master.psd
  COPY_EN          审定英文标题
  PRODUCT_REAL     DN01真实主体＋蒙版
  SHADOW           接触阴影
  BACKGROUND       无字桌面环境

DN01_main_master.psd
  PRODUCT_REAL     真实主体＋蒙版
  BACKGROUND       纯白底
```

主图文件和场景文件分开，避免误把COPY层留在Amazon主图。多个语言复制文案组，保留同一商品像素；多SKU替换真实照片，不能只改图层名称。

### 4. 建渠道输出表，再裁切

| 渠道位置 | 使用哪份源文件 | 要调整什么 |
| --- | --- | --- |
| Amazon主图 | main_master | 占幅与当前类目要求，无场景文案 |
| Amazon副图 | scene/detail/size | 逐图职责与准确英文 |
| Amazon A+ | 独立模块文件 | 该模块像素与文本槽 |
| Shopify产品媒体 | 商品图序列 | 顺序、alt text、主题裁切 |
| Shopify横幅 | hero-desktop/mobile | 文字安全区与两端构图 |
| Shopee SG | cover/spec/in-box | 站点、变体、封面清晰度 |

不是每行都从一张背景裁出来。A+结构图需要真实细节，尺寸图需要参数层，主图需要纯白底。源文件适合哪项任务就复用哪部分。

### 5. 返工写到具体文件和层

“不好看”先拆成可处理的问题。DN01盒盖被裁，改商品位置与裁切；灰色SKU用了白色主体，换PRODUCT_REAL；日文缺字，换支持字体并重排COPY；主图多了文具，换纯白母版。

每次修改给新版本，保留问题和处理。交付目录只放当前选用版本，旧候选继续保留在工作区。此教程尚未实际操作画布、节点或PS；完整交接模板见[P08](../prompts/P08.md)，批量文件操作见[SKU交付](cross-border-sku-delivery.md)。
