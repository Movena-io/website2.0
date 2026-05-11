# Blog content

Markdown articles that power `/blog` on movena.io.

Each `.md` file in this folder becomes a public blog post on the next deploy.

## How to publish a new article

1. **Create** a new file in this folder, named after your slug. The filename (without `.md`) becomes the URL: `quoting-without-spreadsheets.md` → `/en/blog/quoting-without-spreadsheets`.
2. **Paste the template below** and fill in the frontmatter. Fields are documented further down.
3. **Add a cover image** to `projects/website/public/blog/` (recommended: 1600x900 JPG/PNG, under 300KB). Reference it in `image:` as `/blog/your-image.jpg`.
4. **Write the body** in markdown below the closing `---`. Headings, lists, links, blockquotes, and images all work.
5. **Commit and push**. Vercel auto-deploys, the post appears on `/blog` and `/blog/your-slug`, and the sitemap regenerates automatically.

To save a draft without publishing, set `draft: true` in the frontmatter. Drafts are excluded from build output.

## Template

Copy this scaffold into a new `.md` file in this folder:

```markdown
---
title: "Your headline here"
slug: "your-slug-here"
date: "2026-05-11"
excerpt: "Short one or two sentence summary shown on /blog cards and in social previews."
metaTitle: "SEO title shown in search results (50-60 characters)"
metaDescription: "SEO meta description shown in search snippets (140-160 characters)."
image: "/blog/your-cover.jpg"
imageAlt: "Plain-language description of the cover image for screen readers and SEO."
category: "Industry insights"
tags: ["moving companies", "operations"]
locale: "en"
draft: false
---

Your first paragraph. The opening matters most -- search engines and readers both decide whether to keep going in the first two sentences.

## Section heading

Body text.
```

## Frontmatter fields

| Field             | Required | Description                                                              |
|-------------------|----------|--------------------------------------------------------------------------|
| `title`           | yes      | The article headline                                                     |
| `slug`            | yes      | URL slug. Should match the filename                                      |
| `date`            | yes      | Publish date in `YYYY-MM-DD` format                                      |
| `excerpt`         | yes      | Short summary shown on `/blog` cards and in social previews              |
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

## A note on bylines

Posts do not display an individual author. The post page renders without a name; the article schema attributes authorship to Movena (the organization), which still satisfies Google's structured-data requirement for an attributed author. If we ever want to surface a name in future, add an `author` field to the frontmatter and we will wire it into the UI then.
