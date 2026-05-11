# Blog content

Markdown articles that power `/blog` on movena.io.

Each `.md` file in this folder becomes a public blog post on the next deploy.

## How to publish a new article

1. **Copy** an existing post (e.g. `six-tools-one-job.md`) and rename it to your slug, e.g. `quoting-without-spreadsheets.md`. The filename (without `.md`) becomes the URL: `/en/blog/quoting-without-spreadsheets`.
2. **Update the frontmatter** at the top of the file. Fields are documented in the table below.
3. **Add a cover image** to `projects/website/public/blog/` (recommended: 1600x900 JPG/PNG, under 300KB). Reference it in `image:` as `/blog/your-image.jpg`.
4. **Write the body** in markdown below the closing `---`. Headings, lists, links, blockquotes, and images all work.
5. **Commit and push**. Vercel auto-deploys, the post appears on `/blog` and `/blog/your-slug`, and the sitemap regenerates automatically.

To save a draft without publishing, set `draft: true` in the frontmatter. Drafts are excluded from build output.

## Frontmatter fields

| Field             | Required | Description                                                              |
|-------------------|----------|--------------------------------------------------------------------------|
| `title`           | yes      | The article headline                                                     |
| `slug`            | yes      | URL slug. Should match the filename                                      |
| `date`            | yes      | Publish date in `YYYY-MM-DD` format                                      |
| `excerpt`         | yes      | Short summary shown on `/blog` cards and in social previews              |
| `author`          | no       | Author name (defaults to "Movena")                                       |
| `metaTitle`       | no       | SEO title tag override (defaults to `title`)                             |
| `metaDescription` | no       | SEO meta description (defaults to `excerpt`)                             |
| `image`           | no       | Cover image path, e.g. `/blog/your-image.jpg`                            |
| `imageAlt`        | no       | Alt text for the cover image (important for accessibility and SEO)       |
| `category`        | no       | Category label shown on the card (defaults to "Industry insights")       |
| `tags`            | no       | Array of tags, e.g. `["moving", "saas"]`                                 |
| `locale`          | no       | `en` or `da` (defaults to `en`)                                          |
| `draft`           | no       | `true` to hide from production. Defaults to `false`                      |

## Voice

- Direct and personal. Sounds like a founder wrote it.
- No em dashes. No emojis. No corporate buzzwords.
- Cut any sentence that does not add value.
