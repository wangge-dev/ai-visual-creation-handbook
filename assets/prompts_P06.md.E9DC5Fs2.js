import{_ as a,o as n,c as p,a6 as e}from"./chunks/framework.De615z8S.js";const m=JSON.parse('{"title":"只改一处的局部修图","description":"","frontmatter":{"id":"P06","title":"只改一处的局部修图","chapter":"13","status":"已公开","evidence_status":"完整模板，尚未执行图像任务","last_modified":"2026-10-14T00:00:00.000Z","resource_ids":["krita-diffusion"],"order":106},"headers":[],"relativePath":"prompts/P06.md","filePath":"prompts/P06.md"}'),t={name:"prompts/P06.md"};function i(l,s,o,c,r,d){return n(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="p06-只改一处的局部修图" tabindex="-1">P06 只改一处的局部修图 <a class="header-anchor" href="#p06-只改一处的局部修图" aria-label="Permalink to &quot;P06 只改一处的局部修图&quot;">​</a></h1><p>类型：编辑提示词。变量：原图、蒙版／标注、修改内容、保护内容。示例：移除背景右下角杂物；人物、服装、前景、镜头位置和其他背景保留。</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请修改我上传的原图，只处理[蒙版／标注位置或明确区域描述]。</span></span>
<span class="line"><span>要改成：[具体替换或修复内容]。</span></span>
<span class="line"><span>需要保留：[对象身份、形状、颜色、文字、构图、光线及其他区域]。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>使用当前工具实际支持的选区／蒙版／局部编辑功能。</span></span>
<span class="line"><span>保持区域边缘、透视、光线和接触阴影自然，不重新设计整张图。</span></span>
<span class="line"><span>如果修改文字，旧文字为[填写]，新文字必须为[准确字符串]；区域放不下时给排版调整建议，不偷偷改字。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果工具只能重生成整图，请说明非修改区可能变化，并提供适合后期合成的局部素材或操作方案，不能报告像素完全不变。</span></span>
<span class="line"><span>对已出现的文字、Logo或真实对象逐项比较；发现其他区域变化要指出。</span></span>
<span class="line"><span>保存一个新版本，不覆盖原件。输出实际支持的格式，并说明修改了哪里、还有哪里需人工检查。</span></span></code></pre></div><p>检查：目标修复成功，边缘自然，保护对象未发生意外变化；严格像素保留需要真实蒙版与合成操作验证。</p>`,4)])])}const u=a(t,[["render",i]]);export{m as __pageData,u as default};
