import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import ResourceDirectory from './ResourceDirectory.vue';
import ResourceLinks from './ResourceLinks.vue';
import DownloadLinks from './DownloadLinks.vue';
import './style.css';
export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, { 'doc-after': () => h(ResourceLinks) }),
  enhanceApp({ app }) { app.component('ResourceDirectory', ResourceDirectory); app.component('DownloadLinks', DownloadLinks); }
};
