---
id: shopify-product
title: "Shopify产品页：媒体顺序与准确文字"
chapter: "03"
topic: cross-border
status: 已公开
evidence_status: "按原稿重写并核对官方操作资料；未执行生图、软件操作或平台上传"
last_modified: 2026-10-14
resource_ids: ["ecommerce-skills","detail-image-workflow","cross-border-knowledge"]
platform_rule_ids: ["shopify"]
order: 23.3
content_kind: "操作教程"
---

# Shopify产品页，制作媒体序列并检查变体

本节把一套商品图放进Shopify产品页的制作流程，得到媒体顺序表、准确alt text、变体对应表与桌面/手机检查记录。练习使用虚构DN01收纳盒；实际后台操作需要你的店铺账户，本项目尚未上传。

## 1. 先定商品媒体顺序

打开同类产品页思考读者先需要什么。封面先认商品，第二张解释用途，第三张看结构，第四张读尺寸，第五张看发货。首页大横幅另有主题裁切逻辑，不能直接拿来当商品封面。

| 顺序 | 素材 | 文件/说明 |
| --- | --- | --- |
| 01 | 白色完整商品 | DN01_white_01-front_en.jpg |
| 02 | 桌面场景 | 无字背景＋真实商品 |
| 03 | 开盖/隔板 | 对应结构实拍 |
| 04 | 外尺寸 | 矢量数字，明确L×W×H |
| 05 | 发货平铺 | 盒体1、盖子1、隔板1 |

本练习用2048×2048方形母版便于统一媒体序列，它是常见制作选择，主题可能有不同显示比例。产品媒体支持范围和限制查[官方媒体类型](https://help.shopify.com/en/manual/products/product-media/product-media-types)，不要把普通主题图片限制混为产品媒体限制。

## 2. 制作场景媒体

已经做过[Amazon副图](./amazon-listing.md)可复用真实商品和适用场景，但去掉不适合主题的烘焙文字。Shopify页面标题、价格、购买按钮由网页表达，媒体负责商品与使用环境。

```text
为白色桌面收纳盒制作Shopify产品页场景底图。真实商品照片是唯一外观依据，保留盒体、盖子、比例、颜色和标识。明亮书桌，浅木台面，奶油白背景，柔和左侧窗光，简洁日常摄影。
商品处于画面中央偏下，四周留合理裁切空间。文具只作少量场景道具，不暗示随商品发货。不生成标题、折扣、按钮、数字、认证或水印，不制造新隔板。商品被改变时只生成空桌面背景，真实主体后期合成。
```

导出原图后检查商品。不要让画布截图里的边框、节点线和选择框进入媒体。

## 3. 在产品后台上传并排顺序

进入Products，打开目标商品，在Media区域添加文件。上传后按任务表调整顺序；官方文档说明媒体可重新排列，具体界面按当前后台。[添加产品媒体](https://help.shopify.com/en/manual/products/product-media/add-media)。

先保存一款测试商品或当前授权的草稿，再查看前台。没有实际上传授权时，可以完成全部文件和媒体表，把后台步骤留给运营执行；不能用本地预览冒充上线。

## 4. 逐张填写alt text

打开一张媒体，找到编辑alt text的入口，描述画面实际内容。DN01例子可写如下，正式使用改真实商品名和颜色。[官方alt text说明](https://help.shopify.com/en/manual/products/product-media/add-alt-text)。

```text
01: White lidded desk organizer, front view.
02: White desk organizer on a wooden desk with stationery nearby.
03: Open desk organizer showing one removable divider.
04: External dimensions of the organizer: 220 x 150 x 120 mm.
05: Box body, lid and one divider included with the organizer.
```

alt text用于描述图片。不要每张重复堆“best cheap storage box”等关键词，也不要把同一段长广告塞进所有媒体。图中包含必要尺寸信息时，文字描述与事实表一致。

## 5. 关联变体并看三个位置

白色、灰色SKU分别使用真实颜色照片。按当前后台变体媒体入口指定对应图。切换变体时看主媒体有没有一起变化，颜色名称有没有与图片相反。再查看产品页、集合卡片和手机画廊，确认主题裁切没有切掉盒盖与参数。

| 现象 | 处理 |
| --- | --- |
| 集合页裁掉商品顶部 | 调主体位置或改主题媒体比例 |
| 变体切换仍是旧颜色图 | 查变体媒体关联与主题支持 |
| 方图里文字手机很小 | 移到网页文字区，保留图像说明 |
| 加载慢 | 保留清晰母版，另导出适当像素与压缩版本 |

最终交付媒体排序CSV、图片、alt text文本和变体映射。后台实际表现另记录。完整任务模板见[P13](../prompts/P13.md)，首页横幅继续[桌面/手机排版](./shopify-hero.md)。
