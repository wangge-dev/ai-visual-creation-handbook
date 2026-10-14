<script setup>
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';
import records from '../../../data/repositories.json';
const { frontmatter } = useData();
const related = computed(() => records.filter(r => frontmatter.value.resource_ids?.includes(r.id)));
</script>
<template>
  <aside v-if="frontmatter.evidence_status || related.length" class="resource-links">
    <p v-if="frontmatter.evidence_status"><strong>本页证据状态：</strong>{{ frontmatter.evidence_status }}</p>
    <p v-if="related.length">关联资料：<span v-for="r in related" :key="r.id"><a :href="withBase('/resources/cards/' + r.id)">{{ r.name }}</a>　</span></p>
  </aside>
</template>
