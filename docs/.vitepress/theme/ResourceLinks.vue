<script setup>
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';
import records from '../../../data/repositories.json';
import tools from '../../../data/tools.json';
import rules from '../../../data/platform-rules.json';
const { frontmatter } = useData();
const related = computed(() => records.filter(r => frontmatter.value.resource_ids?.includes(r.id)));
const other = computed(()=>[...tools.filter(t=>frontmatter.value.tool_ids?.includes(t.id)),...rules.filter(r=>frontmatter.value.platform_rule_ids?.includes(r.id)).map(r=>({...r,url:withBase('/resources/platforms/'+r.id)}))]);
</script>
<template>
  <aside v-if="frontmatter.evidence_status || related.length || other.length" class="resource-links">
    <p v-if="frontmatter.content_kind"><strong>内容类型：</strong>{{ frontmatter.content_kind }}；操作步骤与实际运行记录分别说明。</p>
    <p v-if="frontmatter.evidence_status"><strong>本页证据状态：</strong>{{ frontmatter.evidence_status }}</p>
    <p v-if="related.length">关联资料：<span v-for="r in related" :key="r.id"><a :href="withBase('/resources/cards/' + r.id)">{{ r.name }}</a>　</span></p>
    <p v-if="other.length">工具与平台入口：<span v-for="r in other" :key="r.id"><a :href="r.url">{{r.name}}</a>　</span></p>
  </aside>
</template>
