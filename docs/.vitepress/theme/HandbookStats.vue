<script setup>
import navigation from '../navigation.json';
import resources from '../../../data/repositories.json';
const prompts = navigation.filter(p => /^\/prompts\/P\d+$/.test(p.link)).length;
const methods = navigation.filter(p => Number(p.chapter) < 13 && p.link !== '/outline').length;
</script>
<template><p>当前已整理 {{methods}} 篇方法与教程、{{prompts}} 条完整模板、{{resources.length}} 张仓库资料卡。14章是完整建设范围，各页标明来源和执行状态，实际生成与软件操作案例持续补充。</p></template>
