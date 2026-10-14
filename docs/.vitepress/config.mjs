import { defineConfig } from 'vitepress';
import fs from 'node:fs';
const entries = JSON.parse(fs.readFileSync(new URL('./navigation.json', import.meta.url)));
const groups = [
  ['开始与共用基础', ['00','01','02']], ['电商视觉实战', ['03']],
  ['品牌、内容与其他创作', ['04','05','06','07','08','09','10']],
  ['画布、Codex与批量', ['11','12']], ['完整模板', ['13']]
];
export default defineConfig({
  lang: 'zh-CN', title: 'AI视觉创作', description: '面向实际交付的视觉创作知识库',
  base: process.env.SITE_BASE || '/ai-visual-creation-handbook/',
  cleanUrls: true,
  themeConfig: {
    logo: undefined, siteTitle: 'AI视觉创作',
    nav: [{ text: '完整目录', link: '/outline' }, { text: '资料库', link: '/resources/' }, { text: '更新', link: '/changelog' }],
    sidebar: groups.map(([text, chapters]) => ({ text, collapsed: text !== '开始与共用基础', items: entries.filter(p => chapters.includes(p.chapter)).map(p => ({text:p.title,link:p.link})) })),
    outline: { level: [2, 3], label: '本页内容' }, search: { provider: 'local' },
    socialLinks: [{icon:'github',link:'https://github.com/wangge-dev/ai-visual-creation-handbook'}],
    docFooter: { prev:'上一篇', next:'下一篇' },
    footer: { message: '原创文档 CC BY-SA 4.0 · 构建代码 MIT', copyright: '方法、来源与实际结果分别记录' }
  }
});
