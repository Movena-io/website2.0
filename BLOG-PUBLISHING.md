# Movena blog: how to publish

Short version for Villads. Detailed reference is in `content/blog/README.md`.

## Where posts live

`projects/website/content/blog/` -- one `.md` file per article. Push to GitHub, Vercel deploys, the post is live at `https://movena.io/en/blog/{slug}`.

## Publish a new article in 5 steps

1. **Create** a new file in `content/blog/`, named after your slug, e.g. `quoting-without-spreadsheets.md`. The filename becomes the URL.
2. **Paste the template** from `content/blog/README.md` (Template section) and fill in the frontmatter (title, date, excerpt, image, etc.).
3. **Add a cover image** to `public/blog/` (1600x900 JPG/PNG, under 300KB). Reference it as `/blog/your-image.jpg` in the frontmatter.
4. **Write the body** in markdown below the closing `---`. Headings, lists, links, blockquotes all work.
5. **Commit and push** to `main`. Vercel deploys, sitemap regenerates automatically.

To save without publishing: set `draft: true` in the frontmatter.

## Editing options

* **In your browser** -- open `content/blog/` on GitHub, click any post, then the pencil icon. Edit, commit. Done.
* **In Obsidian** -- point Obsidian at the `content/blog/` folder. Write, then commit and push from Cursor or terminal.
* **In Cursor / VS Code** -- edit the markdown file like any other code, commit, push.

## What happens automatically on every deploy

* The post appears on `/blog` (listing) and `/blog/{slug}` (detail).
* The sitemap (`movena.io/sitemap.xml`) updates with the new URL.
* Open Graph and Twitter Card meta tags are generated from the frontmatter.
* JSON-LD Article schema is injected so Google can show rich results.
* Canonical URLs are set per post.
* Cover image goes through `next/image` for size optimization.

## Voice rules (from `.claude/rules/communication-style.md`)

* Direct and personal. Sounds like a founder wrote it, not a marketing department.
* No em dashes. No emojis. No buzzwords (leverage, synergy, streamline, robust, cutting-edge).
* Cut any sentence that does not add value.

## One-time setup: submit sitemap to Google Search Console

`movena.io` is already verified in Search Console. The blog adds `/sitemap.xml` (auto-generated, includes every post). Submit it once:

1. Open `https://search.google.com/search-console`, pick the `movena.io` property.
2. Left sidebar, open **Sitemaps**.
3. If `sitemap.xml` is not listed, paste `https://movena.io/sitemap.xml` and click **Submit**. If it is already listed, you are done -- Google re-checks it on its own schedule.
4. After the first blog post deploys, you can speed up first indexing by pasting the post URL into **URL Inspection** at the top of GSC and clicking **Request indexing**.

After this, every new post automatically appears in the sitemap on the next deploy. No manual resubmission needed.
