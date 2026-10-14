---
id: canvases
title: "三类画布怎么接入电商出图"
chapter: "11"
status: 已公开
evidence_status: "按原稿重写并核对官方操作资料；未执行生图、软件操作或平台上传"
last_modified: 2026-10-14
resource_ids: ["comfyui","invokeai","krita-diffusion"]
tool_ids: ["lovart","tapnow","photoshop","krita"]
order: 40
content_kind: "操作教程"
---

# 三类画布，用同一张商品场景图说明分工

本节分别说明设计画布、节点工作流和图层软件怎样处理“商品放到新背景”这个任务。先选择自己需要的路径，一张图可以直接在设计画布与图层软件完成；重复同样处理时再加入节点。

准备真实商品照片、一张能用的无字背景、准确短文案和目标画幅。以榨汁杯厨房图为例，生成环境、保留商品、加文字是三个动作，尽量保留独立产物。

## 1. Lovart或TapNow，组织资料并迭代构图

Lovart新项目上传真实商品照片，写明参考文件角色与任务，先要求一个无字场景方向。选中通过的图再做局部编辑或进一步任务；不要一次要求六张完全不同用途的图并指望模型自行核商品。[Lovart项目入门](https://www.lovart.ai/docs/getting-started/design-your-first-project)。

TapNow官方文档的操作路径更明确。Add建立图像节点，接入产品或风格参考，填写每个参考的用途，选择画幅与模型，生成后打开全尺寸。选中图像会出现工具栏，Crop做裁切，Redraw圈出局部再描述修改，更多菜单中可做Outpainting等任务。实际可用工具按当前账号界面。[TapNow图像操作](https://docs.tapnow.ai/en/docs/canvas/generate-and-edit-images)。

```text
本项目制作榨汁杯厨房场景图。上传产品照片只用于保留商品外观；场景参考只借光线和台面，不借其中的商品或文字。先做一张方形无字底图，产品在右侧，左上留标题区域，光从左前方照入。
保留真实杯盖、按钮、底座、颜色、比例和标识，不添加内部结构、配件、认证和文字。商品被改变时，改为只生成空厨房背景，下载后用真实主体合成。
```

得到可用方向后再修具体问题。例如左上有水果妨碍标题，在Redraw里只标水果和附近背景，输入“移除这处水果，延续浅木台面与光线，保持商品不变”。没有局部工具时回图层文件，不把“只改一处”的文字承诺当作像素保证。

画布保留输入、候选、选用图、返工图四个区域，给图写用途与问题。下载的是原图文件，画布截图只作过程记录。

## 2. ComfyUI，理解一次局部修背景的节点

先按当前官方安装说明准备可以运行的ComfyUI。本节使用官方基础inpaint示例理解输入和蒙版，不把SD1.5教学示例称为最新商拍最佳模型，也不要求额外下载不明节点。[官方inpaint教程](https://docs.comfy.org/tutorials/basic/inpaint)。

1. 从官方教程取得工作流示例，用Workflows → Open载入工作流JSON或带工作流信息的图像。
2. 观察Load Checkpoint，确认加载的模型与该工作流匹配；模型缺失先按官方说明处理。不同模型家族不能随手交换同名文件。
3. 在Load Image放入场景图，用Mask Editor标记需要修改的背景。看清蒙版预览与该工作流的含义，商品不进入重绘区域。
4. 正向词写新背景，负向词写本次要避免的背景元素。检查VAE Encode (for Inpainting)、KSampler、VAE Decode与Save Image的连接。
5. Queue运行一个候选，比较结果的背景、边界和商品，保存工作流与结果，再决定是否复用。

基础流程可以这样读，图像与蒙版进入编码，提示词和模型进入采样，解码后输出图片。主体保护还需要最终图层合成核对，工作流加载成功不能证明商品像素未变。

```text
正向描述示例
bright clean kitchen countertop, pale wood, cream wall, soft daylight from the left, empty space for a product, realistic photographic background

负向描述示例
text, watermark, extra appliances, cluttered background, harsh neon light

编辑范围
只覆盖需要替换的背景；杯盖、杯体、按钮、底座不进入重绘区域。
```

如果输入尺寸与输出不同，先定位缩放或裁切节点；如果背景边缘有明显接缝，调整蒙版边界和环境匹配；如果商品被改，回真实主体层合成。固定seed可以减少某些变化，不能保证所有SKU商品一致。

## 3. PS/Photopea/Krita，完成真实主体与准确文字

建立四层 `BACKGROUND`、`SHADOW`、`PRODUCT_REAL`、`COPY`。商品层来自实拍，蒙版修边；阴影层在下面；文字层输入审定文案。放大看边缘，缩小看手机阅读，再保存可编辑文件与JPG。PS步骤参考[合成图像](https://helpx.adobe.com/photoshop/desktop/crop-resize-transform/transform-manipulate-reshape/combine-images-in-photoshop.html)。

PNG可以保留透明背景，但不会自动保留可编辑文字和蒙版。PSD或KRA要重新打开检查结构，工具声称“导出PSD”也可能只导出一张平面层。实操按[第一张可用图](../start/first-image.md)逐步完成。

## 4. 三段怎样衔接

| 前一段产物 | 下一段用法 | 交接时检查 |
| --- | --- | --- |
| 设计画布无字背景 | 放进图层文件 | 原图像素、光向、留白 |
| 节点生成结果 | 用真实主体遮回需要保护的区域 | 输出尺寸、结构与颜色 |
| 图层工作文件 | 导出各用途图片 | 文字可编辑、蒙版存在、文件能打开 |

三类软件的官方文档已读，本项目没有实际生成、运行节点或交付PSD。跨境例子继续[画布交接教程](../ecommerce/cross-border-canvas.md)，Codex参与文件和PS工作的具体任务见[Codex协作PS](./codex-ps.md)。
