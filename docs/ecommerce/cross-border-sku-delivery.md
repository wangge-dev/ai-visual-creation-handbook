---
id: "cross-border-sku-delivery"
title: "跨境SKU批量：从清单到交付目录"
chapter: "03"
topic: "cross-border"
status: "已公开"
evidence_status: "按原稿重写并核对官方操作资料；未执行生图、软件操作或平台上传"
last_modified: "2026-10-14T00:00:00.000Z"
resource_ids: ["ecommerce-skills", "footwear-skills", "ecommerce-image-toolkit", "detail-image-workflow"]
platform_rule_ids: ["amazon", "shopify", "shopee"]
order: 23.7
content_kind: "操作教程"
---

# 跨境SKU批量，从两款商品做到交付清单

这一篇做出两款SKU、两个渠道的任务清单与文件目录。先做一款能交付的母版，再扩到多款。DN01白色、DN02灰色仅为虚构练习ID，正式商品各用真实照片与参数，不能靠改色生成不同SKU。

### 1. 把任务展开成一行一张图

一项任务用SKU、市场、语言、图片位置和版本确定。比如Amazon US主图和Shopify场景图，虽然都展示同一商品，背景、文字和裁切职责不同。

```csv
task_id,sku,market,language,position,source_photo,output_file,status
DN01-AMZ-MAIN-v01,DN01-white,amazon-us,en,main,DN01_white_front.jpg,DN01_white_amazon-us_01-main_en_v01.jpg,planned
DN01-SHP-SCENE-v01,DN01-white,shopify,en,scene,DN01_white_front.jpg,DN01_white_shopify_02-scene_en_v01.jpg,planned
DN02-AMZ-MAIN-v01,DN02-gray,amazon-us,en,main,DN02_gray_front.jpg,DN02_gray_amazon-us_01-main_en_v01.jpg,planned
DN02-SHP-SCENE-v01,DN02-gray,shopify,en,scene,DN02_gray_front.jpg,DN02_gray_shopify_02-scene_en_v01.jpg,planned
```

每行还应有准确文案、真实尺寸、目标像素和源文件位置。正式使用增加渠道需要的字段，先别把未安排的十几个位置全部复制成待办。

### 2. 建目录，保留输入和源文件

```text
project/
  facts/              商品事实、尺寸、配件、准确文案
  input/DN01-white/    原照片
  input/DN02-gray/     原照片
  backgrounds/        通过的无字环境
  working/            PSD、蒙版、文字层
  output/amazon-us/en/
  output/shopify/en/
  tasks.csv           一行一项的状态与文件名
  corrections.csv     问题、修改位置和新版本
```

输入原照片保留不覆盖，工作文件与输出分开。文件名中的颜色是实际SKU颜色，不只是运营希望显示的颜色。

### 3. 先跑DN01的两项任务

按[Amazon主图](amazon-listing.md)做纯白图，按[Shopify商品媒体](shopify-product.md)做场景图。记录实际照片、提示词、模型或软件、结果文件、裁切与人工核对结果。

主图不需要生成时直接图层处理；场景商品被改掉就只生成背景。只有两张文件真实保存、能重新打开、对应位置正确，才开始第二款。画布显示“完成”但本地没下载的任务仍是待下载。

### 4. 换第二款真实主体，不重画整套

复制DN01源文件为DN02，换成灰色实拍商品层，核对尺寸与配件是否相同。相同的背景、光线、字体和标题位置可复用；差异字段需要更新。灰色实拍与白色照片光向不同，就先调背景，不能靠把商品涂成另一种材质统一。

```text
根据tasks.csv、两款商品事实表和照片索引，整理跨境图片批量制作清单。保留每行任务ID、真实SKU、市场、语言、位置、输入照片、准确文案和输出文件名。
先检查是否有缺照片、颜色串错、尺寸来源缺失和文件名重复。然后说明哪些背景和排版可以复用，哪些商品层、参数和发货内容必须分别替换。不要生成图片，不把规划行标为完成，不覆盖原照片。
给出逐行执行顺序和返工列，失败行保留原任务ID，只更新实际状态与错误原因。
```

### 5. 状态跟实际产物走

可以用planned、generated、downloaded、composited、checked、uploaded几个状态，按实际流程选择。不是所有任务都经过生成，有的直接合成。checked只表示已经核对成品，uploaded需要实际后台记录。

| 状态问题 | 处理 |
| --- | --- |
| 已生成但下载失败 | 保留原任务，重试原下载，别重新提交生图 |
| 图片已存但颜色错误 | 标返工，改真实商品层，生成新版本文件 |
| 两行输出同名 | 改文件映射，避免覆盖另一款 |
| 主图带了场景标题 | 回位置要求，删除文字与道具层 |

### 6. 交付时抽清文件并核每一行

导出目录按渠道与语言划分，工作PSD另给位置。逐行确认文件存在、能打开、像素与图片位置正确，再把交付清单里的文件名与实际目录核对。检查的是整个矩阵，不能只看第一款的第一张图。

本项目尚未执行这四项图像任务或后台上传。完整批量模板[P19](../prompts/P19.md)，交付检查[P20](../prompts/P20.md)；同一方法也适用于鞋类、服装和多规格产品，具体商品字段另改。
