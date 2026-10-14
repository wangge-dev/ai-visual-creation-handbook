---
id: cross-border-sku-delivery
title: "跨境SKU批量：从清单到交付目录"
chapter: "03"
topic: cross-border
status: 已公开
evidence_status: "原创教程与规划示范，尚未执行图像任务或后台上传"
last_modified: 2026-10-14
resource_ids: ["ecommerce-skills","footwear-skills","ecommerce-image-toolkit","detail-image-workflow"]
platform_rule_ids: ["amazon","shopify","shopee"]
order: 23.7
---

# 跨境SKU批量：从清单到交付目录

先让一项任务完成，再扩展清单。一个任务由“SKU×市场×语言×图片位置×版本”确定；下载后再检查，不把接口回执当成图像可交付。

## 第1步：把清单填完整

| 字段 | 示例与作用 |
| --- | --- |
| task_id | DN01_US_EN_MAIN_v01，稳定定位原任务 |
| sku | DN01-W，绑定真实白色版本照片 |
| market／language | US／en-US；SG／en-SG等分别记录 |
| position | MAIN、DETAIL、A_PLUS或HERO，不能混用 |
| source_asset | 商品实拍、细节图与准确文字版本 |
| target_size | 当前确认的宽高；未知先留待填 |
| status | planned、generated、reviewed、needs_revision、exported |
| result／note | 实际结果文件、未确认事项、返工原因 |

虚构练习清单可从[示例资产目录](/ecommerce/cross-border#这次练习准备什么)理解。正式清单里每个SKU都需要真实存在与对应素材，不把母版任意改色当成新商品。

## 第2步：先母版，再批量

复制[P19 SKU批量计划](/prompts/P19)，固定商品处理、色彩、背景、文字层与命名。先核对一个SKU的一张图，再扩展其他位置。场景与主图不能共享错误的宣传字样；跨语言只改获准的文字层与布局。

稳定的图像步骤可进入ComfyUI节点，精准文字与最终合成仍由图层／页面编辑器负责。并发、重试或服务接口由实际使用工具管理；不要为完成清单重复提交未知状态的原任务。

## 第3步：中断与返工

收到超时先查原任务ID和结果是否已经出现。商品结构不对只返工对应SKU；译文错误只改对应语言；主题裁切不合适只重排该位置。保留前一版，记录改变了哪项条件。

## 第4步：交付与状态

目录按市场／SKU／位置组织，图片名带语言与版本。另附事实表、准确文案、媒体顺序、源文件和检查表；只交真实存在的文件，不把计划路径当产物。使用[P20交付检查](/prompts/P20)得到问题位置和具体修正。

“exported”表示文件已经导出，不等于后台已上传；“published”只有查看实际平台状态后才填写。本项目尚未执行新SKU批量生成与平台上传。
