# AI Visual Creation Handbook

[Read online](https://wangge-dev.github.io/ai-visual-creation-handbook/) · [中文](README.md)

Open `index.html` directly. The complete original Chinese ecommerce guide, tables, checklists and prompt package are included in one offline page. Cross-border workflows, canvas methods and 20 additional task prompts are available in the same reader. Reading requires no installation or build tool.

The original chapter order and cream, black and orange design are retained. Source claims about models, platform requirements and historical third-party costs remain distinguishable from verified updates. This project does not claim unperformed image generation, Photoshop work or platform uploads.

To edit the guide, change the relevant HTML fragment in `src/content/`, `src/prompts/`, `src/supplements/` or `src/task-prompts/`. Shared original tables live in `data/guide-catalogs.json`. Run:

```sh
python scripts/build_guide.py
```

The builder uses only the Python 3 standard library and generates the offline page, Markdown downloads and redirects for existing links. Node-based discovery remains available as a separate maintenance tool. VitePress is optional and is not required by the primary reader.

See [contribution instructions](CONTRIBUTING.md) and [license details](LICENSE.md). The handbook content is currently Chinese; this English README is not an English translation of the full guide.
