<script setup>
import { ref, computed } from 'vue';
import { withBase } from 'vitepress';
import repos from '../../../data/repositories.json';
import tools from '../../../data/tools.json';
import rules from '../../../data/platform-rules.json';
const query = ref('');
const type = ref('全部');
const types = ['全部', ...new Set(repos.map(r => r.type))];
const filtered = computed(() => repos.filter(r => (type.value === '全部' || type.value === r.type) && `${r.name} ${r.use} ${r.type}`.toLowerCase().includes(query.value.toLowerCase())));
</script>
<template>
  <div class="resource-filter">
    <label>搜索资源<input v-model="query" placeholder="任务、仓库或关键词" /></label>
    <label>类型<select v-model="type"><option v-for="t in types" :key="t">{{t}}</option></select></label>
  </div>
  <p role="status">找到 {{ filtered.length }} 条资源</p>
  <div class="resource-grid">
    <article v-for="r in filtered" :key="r.id" class="resource-card">
      <span class="card-type">{{r.type}}</span>
      <h2><a :href="withBase('/resources/cards/'+r.id)">{{r.name}}</a></h2>
      <p>{{r.use}}</p><p class="muted">{{r.evidence}}</p>
      <a :href="r.url" target="_blank" rel="noopener noreferrer">原始仓库 ↗</a>
    </article>
  </div>
  <p v-if="!filtered.length">暂无匹配结果，试试其他任务词。</p>
  <h2>画布与图层工具入口</h2>
  <ul><li v-for="t in tools" :key="t.id"><a :href="t.url">{{t.name}}</a>：{{t.note}}（{{t.evidence}}）</li></ul>
  <h2>平台规则核对入口</h2>
  <ul><li v-for="r in rules" :key="r.id"><a :href="r.url">{{r.name}}</a>：{{r.scope}}。{{r.note}}</li></ul>
</template>
