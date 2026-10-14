<script setup>
import { withBase } from 'vitepress';
</script>
<template>
<p><a :href="withBase('/downloads/handbook.md')" download>整本Markdown（飞书）</a> · <a :href="withBase('/downloads/handbook.html')">独立阅读HTML</a> · <a :href="withBase('/downloads/wechat-preview.html')">公众号正文复制页</a></p>
<p><a :href="withBase('/downloads/cross-border.md')" download>跨境教程与模板Markdown</a> · <a :href="withBase('/downloads/cross-border.html')">跨境专项阅读HTML</a></p>
</template>
