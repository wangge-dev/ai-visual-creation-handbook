<script setup>
import navigation from '../navigation.json';
import resources from '../../../data/repositories.json';
const prompts = navigation.filter(p => /^\/prompts\/P\d+$/.test(p.link)).length;
const tutorials = navigation.filter(p => p.kind === '操作教程').length;
const entries = navigation.filter(p => ['方法说明','任务入门','专题导航'].includes(p.kind)).length;
</script>
<template><p>当前有 {{tutorials}} 篇操作教程文稿、{{entries}} 篇方法说明与入门导航、{{prompts}} 条独立完整模板、{{resources.length}} 张仓库资料卡。教程中另含逐步提示词。14章仍有未完成内容；生图、软件实操、源文件与平台上传尚未验证。</p></template>
