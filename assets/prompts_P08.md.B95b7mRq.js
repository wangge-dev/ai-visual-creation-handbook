import{_ as a,o as n,c as p,a6 as e}from"./chunks/framework.De615z8S.js";const m=JSON.parse('{"title":"画布组织与可编辑交付","description":"","frontmatter":{"id":"P08","title":"画布组织与可编辑交付","chapter":"13","status":"已公开","evidence_status":"完整模板，尚未执行图像任务","last_modified":"2026-10-14T00:00:00.000Z","resource_ids":["comfyui","invokeai"],"order":108},"headers":[],"relativePath":"prompts/P08.md","filePath":"prompts/P08.md"}'),t={name:"prompts/P08.md"};function l(i,s,o,c,r,d){return n(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="p08-画布组织与可编辑交付" tabindex="-1">P08 画布组织与可编辑交付 <a class="header-anchor" href="#p08-画布组织与可编辑交付" aria-label="Permalink to &quot;P08 画布组织与可编辑交付&quot;">​</a></h1><p>类型：规划／工具指令。变量：任务、素材、实际接口、输出文件。示例：阅读活动的封面、海报和两张知识卡；有标题、文案和自有Logo；工具未知则先给任务书，不执行。</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请帮我组织[创作任务]的画布与文件。</span></span>
<span class="line"><span>目标交付：[列出图片、尺寸、文案、编辑源文件或工作流]。</span></span>
<span class="line"><span>已提供素材：[逐项标注对象、布局／风格参考、Logo、文字和数据]。</span></span>
<span class="line"><span>可用工具：[填写当前实际已连接的工具；没有连接则写没有]。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先将内容分成：事实与原件、参考、任务与文案、创作分支、待修改、最终交付六个区。</span></span>
<span class="line"><span>每张参考图说明只借什么，不把参考对象属性混进事实。</span></span>
<span class="line"><span>按交付物安排步骤：规划、创作、局部修改、文字排版、尺寸适配、导出与检查。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>有可用接口时，仅使用真实存在的操作；没有接口时输出画布任务书或适用脚本，不报告已操作软件。</span></span>
<span class="line"><span>图像生成、背景移除、图层组装和文件导出分别记录。PSD／PPTX等编辑文件要由支持的工具创建，不把平面图片更名冒充。</span></span>
<span class="line"><span>无法恢复平面图里的原字体／矢量时，如实说明；文字必要时重新建立可编辑层。</span></span>
<span class="line"><span>保留原件和版本，交付前重新打开实际文件，核对尺寸、图层、文字、顺序与素材身份。</span></span>
<span class="line"><span>批量任务先做一件确认，再按对象／语言／尺寸矩阵复用，记录缺素材与失败项目。</span></span></code></pre></div><p>检查：编辑文件能重新打开，图层或文字确实可编辑；画布模板和普通成图不是同一种产物。</p>`,4)])])}const u=a(t,[["render",l]]);export{m as __pageData,u as default};
