import{_ as a,o as n,c as p,a6 as e}from"./chunks/framework.De615z8S.js";const m=JSON.parse('{"title":"商品场景图","description":"","frontmatter":{"id":"P01","title":"商品场景图","chapter":"13","status":"已公开","evidence_status":"完整模板，尚未执行图像任务","last_modified":"2026-10-14T00:00:00.000Z","resource_ids":["rembg","birefnet"],"order":101},"headers":[],"relativePath":"prompts/P01.md","filePath":"prompts/P01.md"}'),l={name:"prompts/P01.md"};function t(i,s,c,o,r,d){return n(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="p01-商品场景图" tabindex="-1">P01 商品场景图 <a class="header-anchor" href="#p01-商品场景图" aria-label="Permalink to &quot;P01 商品场景图&quot;">​</a></h1><p>类型：生图／合成任务。变量：真实商品图、事实表、场景、构图、比例、文案。示例填写：真实收纳盒实拍＋尺寸记录；家庭书桌场景；右侧主体、左侧留白；3:4；无文字。示例不附真实素材，不视为已执行。</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请根据我上传的真实商品图，完成一张用于[图片用途]的[场景名称]视觉图。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输入身份：</span></span>
<span class="line"><span>- 图1：真实商品外观依据。</span></span>
<span class="line"><span>- 图2（如有）：只参考背景、配色和布局，不使用其商品、Logo或参数。</span></span>
<span class="line"><span>- 事实表：[贴入已核实的商品信息，未知项写未知]。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>画面要求：</span></span>
<span class="line"><span>- 构图：[主体位置、留白和视角]；比例：[填写]。</span></span>
<span class="line"><span>- 环境：[场景、背景物、光线方向和风格]。</span></span>
<span class="line"><span>- 保留商品可见的形状、颜色、部件、包装文字和标志，不增加配件或功能。</span></span>
<span class="line"><span>- 道具：[列出获准道具；无则写无]，不要让道具看起来属于发货套装。</span></span>
<span class="line"><span>- 文字：[准确文案或写无文字]；需要文字时另留可编辑排版稿。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如工具支持主体合成，请将真实主体与生成背景分开处理并匹配光影。</span></span>
<span class="line"><span>如工具只能生成整图且无法保留主体像素，请只生成合适背景供后续合成，并说明未完成最终商品合成。</span></span>
<span class="line"><span>不要根据照片猜尺寸、温度、性能、认证或内部结构；不补未拍摄的真实角度。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>本次只完成一张图。输出后核对商品、配件、比例、颜色和文字；无法核对的项目逐项说明。</span></span>
<span class="line"><span>使用工具实际支持的尺寸与格式，报告实际输出像素，不把提示词中的画质词当输出尺寸。</span></span></code></pre></div><p>检查：商品身份与配件正确，背景不遮挡主体，大小关系合理，结果实际像素符合任务。缺清晰商品图时先列需要补的素材，不凭空画正式商品。</p>`,4)])])}const h=a(l,[["render",t]]);export{m as __pageData,h as default};
