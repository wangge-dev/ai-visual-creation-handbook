import unittest
from html_documents import markdown

class MarkdownExport(unittest.TestCase):
    def test_multiline_prompt_is_not_reflowed(self):
        value='第一行\n\n  保留两个空格\n中文与<tag>文字'
        self.assertIn(value,markdown('<pre><code>第一行\n\n  保留两个空格\n中文与&lt;tag&gt;文字</code></pre>'))
    def test_table_keeps_link_unit_and_column_boundary(self):
        text=markdown('<table><tr><th>项目</th><th>数值</th></tr><tr><td><a href="https://example.com">来源</a></td><td>220 × 150 mm | 外尺寸</td></tr></table>')
        self.assertIn('[来源](https://example.com)',text)
        self.assertIn('220 × 150 mm \\| 外尺寸',text)
    def test_copy_toolbar_is_not_exported_as_prompt_text(self):
        value=markdown('<div class="codebox"><div class="codebar">text<button>复制</button></div><pre><code>真实提示词</code></pre></div>')
        self.assertNotIn('复制',value);self.assertIn('真实提示词',value)
    def test_local_links_use_export_mapping(self):
        self.assertIn('(other.md)',markdown('<a href="#other">下一步</a>',{'#other':'other.md'}))

if __name__=='__main__':unittest.main()
