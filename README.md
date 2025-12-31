# Autonops Website

Marketing website and documentation for [InfraIQ](https://github.com/autonops/infraIQ) — a DevOps automation suite.

**Live site:** https://autonops.io

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Hosting | GCP Cloud Storage + HTTPS Load Balancer |
| CDN | GCP Cloud CDN |
| SSL | Google-managed certificate (auto-renews) |
| DNS | Cloudflare (DNS only mode, not proxied) |
| Analytics | Cloudflare Web Analytics (cookieless) |
| Security | Cloudflare (DDoS, Bot Fight Mode, security headers) |
| Docs | MkDocs Material (built separately, served from `/docs/`) |
| Forms | Formspree (beta signup form) |

**Monthly cost:** ~$18-20 (mostly the GCP load balancer)

---

## File Structure

```
website/
├── index.html           # Landing page
├── pricing.html         # Pricing tiers (Free/Pro/Enterprise)
├── security.html        # Security practices page
├── privacy.html         # Privacy policy
├── install.html         # Beta install instructions (hidden from nav)
├── 404.html             # Custom error page
│
├── favicon.ico          # Favicons
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
│
├── robots.txt           # SEO + AI crawler blocking
├── sitemap.xml          # SEO sitemap
│
├── mkdocs.yml           # MkDocs configuration
├── requirements.txt     # Python deps for MkDocs
├── deploy.sh            # Deployment helper script
│
└── docs/                # Documentation source (Markdown)
    ├── index.md
    ├── getting-started/
    │   ├── installation.md
    │   ├── quickstart.md
    │   └── configuration.md
    ├── tools/
    │   ├── overview.md
    │   ├── migrateiq.md
    │   ├── verifyiq.md
    │   ├── codifyiq.md
    │   ├── complyiq.md
    │   ├── dataiq.md
    │   ├── secureiq.md
    │   └── tessera.md
    ├── guides/
    │   ├── heroku-to-aws.md
    │   ├── soc2-compliance.md
    │   └── monolith-decomposition.md
    ├── api/
    │   ├── cli.md
    │   └── python.md
    ├── about/
    │   ├── changelog.md
    │   ├── contributing.md
    │   └── license.md
    ├── assets/
    │   └── logo.svg
    └── overrides/
        └── main.html    # MkDocs template override
```

---

## Local Development

### Static Pages (HTML)

No build step required. Just open the HTML files in a browser:

```bash
# Using Python's built-in server
cd ~/Documents/website-final
python3 -m http.server 8000

# Open http://localhost:8000
```

### Documentation (MkDocs)

The docs at `/docs/` are built with MkDocs Material:

```bash
# Install dependencies
pip install -r requirements.txt

# Run local dev server with hot reload
mkdocs serve

# Open http://localhost:8000/docs/
```

To build the static docs:

```bash
mkdocs build
# Output goes to site/ directory
```

---

## Deployment

### Prerequisites

1. **GCP CLI** installed and authenticated:
   ```bash
   gcloud auth login
   gcloud config set project intense-grove-451422-s6
   ```

2. **gsutil** available (comes with gcloud CLI)

### Deploy Static Files

```bash
cd ~/Documents/website-final

# Upload all files to GCP bucket
gsutil -m cp -r * gs://autonops-website/

# Clear CDN cache (important for updates to appear)
gcloud compute url-maps invalidate-cdn-cache autonops-url-map --path="/*" --global
```

### Deploy Documentation

The docs are hosted on GitHub Pages from the `gh-pages` branch:

```bash
# Build and deploy docs
mkdocs gh-deploy

# This pushes to the gh-pages branch automatically
```

The docs are served at: https://autonops.io/docs/

### Quick Deploy Script

```bash
./deploy.sh
```

Or manually:

```bash
# 1. Upload to GCP
gsutil -m cp -r * gs://autonops-website/

# 2. Clear cache
gcloud compute url-maps invalidate-cdn-cache autonops-url-map --path="/*" --global

# 3. Commit changes
git add .
git commit -m "Update website"
git push
```

---

## Making Changes

### Editing Pages

All pages are plain HTML with embedded CSS. No framework, no build step.

**Key patterns:**
- Dark mode: Uses `[data-theme="dark"]` CSS selectors
- Theme toggle: JavaScript in each page sets `localStorage.setItem('theme', ...)`
- Responsive: CSS media queries at bottom of `<style>` block

### Adding a New Page

1. Copy an existing page (e.g., `security.html`) as a template
2. Update the `<title>` and content
3. Ensure navigation links are consistent across all pages
4. Add to `sitemap.xml` if it should be indexed
5. Deploy

### Updating Pricing

Edit `pricing.html`:
- Monthly prices: `.monthly-price` elements
- Annual prices: `.annual-price` elements  
- Annual totals: Update the `annual-note` text
- Features: Edit the `.features-list` items

### Beta Signup Form

The form on `index.html` submits to Formspree:
```html
<form action="https://formspree.io/f/xyzabcde" method="POST">
```

Submissions go to jason@autonops.io.

### Documentation

Edit Markdown files in `docs/`, then:
```bash
mkdocs gh-deploy
```

---

## Infrastructure Details

### GCP Resources

| Resource | Name |
|----------|------|
| Project | `intense-grove-451422-s6` |
| Bucket | `gs://autonops-website` |
| Static IP | `autonops-website-ip` |
| Backend | `autonops-backend` |
| URL Map | `autonops-url-map` |
| SSL Cert | `autonops-cert` |
| Load Balancer | HTTPS with CDN enabled |

### Cloudflare Configuration

**DNS Records:**
| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | @ | [GCP Static IP] | DNS only (gray) |
| A | www | [GCP Static IP] | DNS only (gray) |

**Important:** Proxy must be OFF (gray cloud). GCP manages SSL, not Cloudflare.

**Security Features Enabled:**
- DDoS Protection (automatic)
- Bot Fight Mode (blocks AI scrapers)
- Security Headers (via Transform Rules):
  - Strict-Transport-Security
  - X-Content-Type-Options
  - X-Frame-Options
  - Referrer-Policy
  - Permissions-Policy

**Analytics:**
- Cloudflare Web Analytics (cookieless, GDPR-compliant)
- No Google Analytics (to avoid cookie banners)

### robots.txt

Blocks AI training crawlers:
- GPTBot, ChatGPT-User (OpenAI)
- anthropic-ai, Claude-Web (Anthropic)
- Google-Extended (Google AI)
- CCBot (Common Crawl)
- And others...

Also hides `/install.html` from all crawlers.

---

## URLs

| Page | URL |
|------|-----|
| Landing | https://autonops.io |
| Pricing | https://autonops.io/pricing.html |
| Security | https://autonops.io/security.html |
| Privacy | https://autonops.io/privacy.html |
| Install (hidden) | https://autonops.io/install.html |
| Documentation | https://autonops.io/docs/ |

---

## Common Tasks

### Clear CDN Cache

After deploying, if changes don't appear:
```bash
gcloud compute url-maps invalidate-cdn-cache autonops-url-map --path="/*" --global
```

Then hard refresh in browser: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)

### Check Deployment

```bash
# List bucket contents
gsutil ls gs://autonops-website/

# Check specific file
gsutil cat gs://autonops-website/robots.txt
```

### Update Security Headers

1. Cloudflare dashboard → autonops.io
2. Rules → Transform Rules → Modify Response Header
3. Edit the "Security Headers" rule

### View Analytics

1. Cloudflare dashboard → autonops.io
2. Analytics & Logs → Web Analytics

---

## Design Notes

### Color Palette

```css
/* Light mode */
--primary: #2563eb;      /* Blue */
--primary-dark: #1d4ed8;
--text: #1f2937;         /* Dark gray */
--text-light: #6b7280;   /* Medium gray */
--bg: #ffffff;
--bg-alt: #f9fafb;
--border: #e5e7eb;
--success: #10b981;      /* Green */

/* Dark mode */
--primary: #3b82f6;
--text: #f9fafb;
--bg: #111827;
--bg-alt: #1f2937;
--border: #374151;
```

### Fonts

System font stack (no external fonts):
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Dark Mode

- Respects system preference by default
- User can toggle manually (saved to localStorage)
- Theme detection script in `<head>` prevents flash

---

## Troubleshooting

### Changes not appearing
1. Clear CDN cache: `gcloud compute url-maps invalidate-cdn-cache ...`
2. Hard refresh browser: `Cmd + Shift + R`
3. Check file was uploaded: `gsutil ls gs://autonops-website/`

### SSL certificate issues
- Certificate is managed by GCP, auto-renews
- Check status: `gcloud compute ssl-certificates describe autonops-cert --global`

### 404 errors
- GCP requires `.html` extension in URLs
- Links should be `/pricing.html` not `/pricing`

### Email showing as [email protected]
- Cloudflare email obfuscation is encoding mailto links
- Disable in Cloudflare: Scrape Shield → Email Address Obfuscation → Off
- Or ensure source HTML has clean `mailto:` links before upload

---

## Contact

**Jason Boykin**  
📧 jason@autonops.io  
🔗 [LinkedIn](https://linkedin.com/in/JasonBoykin2018)

---

## License

© 2025 Autonops. All rights reserved.
