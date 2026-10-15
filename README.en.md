# AI Visual Creation Handbook

An open knowledge base for ecommerce operators, sellers, designers and content creators. Ecommerce is the largest topic; the handbook also covers article visuals, photo editing, design canvases and delivery checks. It offers instructions and templates, not a hosted image generator.

## Start with a task

- Product images: [first image](docs/start/first-image.md), [image set](docs/ecommerce/image-set.md), [detail page](docs/ecommerce/detail-page.md).
- Cross-border: [Amazon listing](docs/ecommerce/amazon-listing.md), [A+](docs/ecommerce/amazon-a-plus.md), [Shopify](docs/ecommerce/shopify-product.md), [Shopee](docs/ecommerce/shopee-localization.md).
- Content and editing: [article visuals](docs/brand-content/wechat-visuals.md), [local retouching](docs/workflows/local-retouch.md).
- Resources: [prompt repositories](docs/github-repos.md), [28 task templates](docs/prompt-templates.md), [WeChat reading guide](docs/resources/wechat-reading.md). Tutorial content is primarily Chinese; this README does not imply an English translation of the whole book.

## Build and preview

For reading, open the root `index.html` directly, or download the [offline HTML](https://wangge-dev.github.io/ai-visual-creation-handbook/downloads/index.html) or [Markdown](https://wangge-dev.github.io/ai-visual-creation-handbook/downloads/handbook.md).

After editing source content, run `python scripts/build.py` from the repository root, then reopen or refresh `index.html`. The default build uses **Python 3 standard library only**. No Python packages, Node installation or VitePress server are needed for this path.

| Location | Responsibility |
| --- | --- |
| `src/content/`, `src/supplements/` | Canonical original chapters and supplementary tutorials |
| `src/styles/`, `src/scripts/` | Reader presentation and interactions |
| `src/guide.json` | Ordering, anchors and source associations |
| `data/catalogs/` | Structured table records |
| `docs/` | Generated Markdown; import individual Markdown contributions before rebuilding |
| `index.html`, `dist/` | Generated reader and downloadable outputs |
| `docs/.vitepress/` | Optional reference site, not the default build |

Contribute source corrections with original links and dates, complete prompts, or broken-link reports. Edit one canonical source, rebuild, and check navigation, search, copying and narrow-screen reading. Node dependencies are only needed for Markdown import, discovery tools and the optional reference build. See [CONTRIBUTING](CONTRIBUTING.md).

Updates separate candidate discovery, source review and actual execution. A read article is not a reproduced experiment. Teaching wireframes are labelled; image-generation results and platform upload states are never invented. Existing content and palette are preserved, data tables have one JSON source, and generated exports are not maintained independently.


[Read online](https://wangge-dev.github.io/ai-visual-creation-handbook/index.html) · [中文](README.md) · [License details](LICENSE.md)
