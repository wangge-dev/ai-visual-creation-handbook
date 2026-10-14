import test from 'node:test';
import assert from 'node:assert/strict';
import { publicLinks } from './links.mjs';
const url = 'https://wangge-dev.github.io/ai-visual-creation-handbook';
test('GitHub source .md links become absolute clean routes in downloads', () => {
  assert.equal(publicLinks('[模板](../prompts/P01.md#输入) [目录](../prompts/index.md)', 'start/first-image.md', url),
    `[模板](${url}/prompts/P01#输入) [目录](${url}/prompts/)`);
});
test('local section links and external source URLs are unchanged', () => {
  const text = '[本节](#步骤) [来源](https://example.com/a.md?x=1) [邮件](mailto:test@example.com)';
  assert.equal(publicLinks(text,'ecommerce/image-set.md',url),text);
});
test('download files preserve their extensions', () => {
  assert.equal(publicLinks('[下载](/downloads/handbook.md)', 'index.md', url), `[下载](${url}/downloads/handbook.md)`);
});
