---
id: "codex-ps"
title: "用Codex协作PS作图修图"
chapter: "12"
status: "已公开"
evidence_status: "按原稿重写并核对官方操作资料；未执行生图、软件操作或平台上传"
last_modified: "2026-10-14T00:00:00.000Z"
resource_ids: []
order: 41
content_kind: "操作教程"
tool_ids: ["photoshop"]
---

# 用Codex协作PS，从任务描述到可编辑图层

本篇做一张榨汁杯厨房场景图的PS工作文件。Codex整理素材、写脚本和检查文件，PS负责图层与像素操作。是否能直接控制PS取决于本机可用连接、脚本入口或UI工具，不能因助手会写JavaScript就宣称已经运行Photoshop。

### 1. 先确定这台电脑的执行路径

已配置可靠PS连接时，读取它实际提供的操作再使用。没有连接但有桌面版PS时，可以让Codex写脚本，由你在PS中运行。Adobe当前文档仍说明File → Scripts → Browse可运行JS/JSX；现代扩展另有UXP接口，两套API不能混写。[Adobe脚本操作](https://helpx.adobe.com/photoshop/desktop/automate-tasks/automation-settings-and-presets/automate-photoshop-with-scripts.html)、[UXP接口](https://developer.adobe.com/photoshop/uxp/ps_reference)。

只有文件读写能力时，Codex可以先交任务清单、脚本与排版计划，实际PS执行需要在相应环境完成。不要安装来源不清的“万能PS Skill”来补一个不存在的连接。

### 2. 把素材和任务给清楚

准备商品正面实拍、已核对的厨房空背景、准确标题和目标像素。商品层必须来自实拍，不能拿AI相似杯子替代。任务可以这样交给Codex。

```text
使用我提供的真实商品照片、无字厨房背景与准确标题，协作制作一张1600×1600像素场景副图。
先说明当前能用的PS执行方式与软件版本。新建工作文档，不覆盖输入。图层按BACKGROUND、SHADOW、PRODUCT_REAL、COPY命名；商品使用真实照片与蒙版，保持杯盖、按钮、底座、标识、颜色和比例。标题为“把水果饮品带进日常”，放在左上留白。
只调整背景、位置、接触阴影和文案层。不生成商品结构、认证、容量或配件。保存可编辑PSD并导出JPG，重新打开检查文字层、蒙版、宽高与成品。没有执行入口或某步失败时记录未完成，不把脚本写好说成PS已完成。
```

1600方图和标题是练习选择，正式按图片位置与商品事实改。把准确文案放在文本文件里，避免助手每次自由改写标题和数值。

### 3. 先运行一个小脚本确认入口

把下面内容保存为 `create-practice-document.jsx`。它只新建练习文档和图层，不读取、修改或保存已有商品文件，也不会生图。通过PS的File → Scripts → Browse选择该文件运行。当前示例做过JavaScript语法检查，尚未在本项目PS环境运行。

```js
#target photoshop
(function () {
  var oldUnits = app.preferences.rulerUnits;
  var oldTypeUnits = app.preferences.typeUnits;
  try {
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.POINTS;
    var doc = app.documents.add(1600, 1600, 72,
      "JB01_scene_practice", NewDocumentMode.RGB, DocumentFill.WHITE);
    doc.activeLayer.name = "BACKGROUND";
    var shadow = doc.artLayers.add();
    shadow.name = "SHADOW";
    var product = doc.layerSets.add();
    product.name = "PRODUCT_REAL";
    var copy = doc.artLayers.add();
    copy.name = "COPY";
    copy.kind = LayerKind.TEXT;
    copy.textItem.contents = "Product headline";
    copy.textItem.size = 90;
    copy.textItem.position = [100, 190];
  } finally {
    app.preferences.rulerUnits = oldUnits;
    app.preferences.typeUnits = oldTypeUnits;
  }
}());
```

可见结果应是1600方形新文档、白色背景、SHADOW空层、PRODUCT_REAL组和可编辑文字层。若脚本报API或入口错误，保留报错，按实际版本改；不能把Node里语法通过当作PS运行成功。

### 4. 导入并保护真实商品

在新文档置入背景，再置入商品照片。把商品层放进PRODUCT_REAL组，选主体并添加蒙版，100%处理边缘；等比变换放到厨房台面上。背景透视不合就换背景，不把杯子拉扁。SHADOW层画底部接触阴影，光向与背景一致。[PS合成操作](https://helpx.adobe.com/photoshop/desktop/crop-resize-transform/transform-manipulate-reshape/combine-images-in-photoshop.html)。

双击COPY文字层，换成准确标题；有中文缺字时选支持中文的字体。参数、标注和Logo分别建层，保留编辑性。需要改局部背景时圈选允许区域，商品组不参与重绘。

### 5. 改图任务具体到区域与图层

```text
当前版本商品外观已核对。只修改BACKGROUND左上区域，去掉遮挡标题的水果，延续原背景台面和光线。保持PRODUCT_REAL、尺寸、颜色、标识、SHADOW和COPY不变。另存v02，不覆盖v01。完成后比较商品、标题区和接触阴影，报告实际修改与未完成项。
```

没有可控局部编辑入口时，由PS蒙版、图层移动或手工背景处理完成。精准文字修正直接改文字层，别重新生成整张图。

### 6. 保存与交付

另存PSD，导出JPG。重新打开PSD检查PRODUCT_REAL照片、蒙版、阴影与文字层；再打开JPG看边缘、颜色、手机字号和实际像素。报告文件位置、软件版本和操作状态。只有PSD文件后缀但里面是一张平面图，不算可编辑图层交付。

本项目尚未运行PS或交付该PSD。完整手工过程见[第一张图](../start/first-image.md)，六张商品图延伸见[套图教程](../ecommerce/image-set.md)。
