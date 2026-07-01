# FutureBlock LLP

Enterprise IT consultancy website — Advisory, Automation, Integrations, Business Analytics, Cloud, and AI & Innovation.

## Local development

```bash
npx serve .
```

## Production build

After editing source files in `css/` or `js/`, regenerate minified assets:

```bash
npm install
npm run build
```

Or on Git Bash / macOS / Linux:

```bash
chmod +x build.sh
./build.sh
```

This minifies CSS/JS and updates `*.min.css` / `*.min.js`. HTML files reference the minified assets.

**Important:** Do not run `javascript-obfuscator` with `--rename-globals` on split script files — it breaks cross-file calls like `initScrollAnimations()`. Do not run `html-minifier-terser` with `--remove-optional-tags` — it strips closing tags and breaks the DOM.

Then commit and push to deploy via GitHub Pages.

## Formspree setup (contact form)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and add recipients: `malkiel@futureblock.in` and `emmanuel012k@gmail.com`
3. Replace the form action in `index.html` if your endpoint differs from `https://formspree.io/f/xeebrpeo`
4. In Formspree → Email Templates, use:

**Subject:** `New Enquiry: {{service}} — FutureBlock Website`

**Body:**
```
You have a new website enquiry.

Name:    {{name}}
Email:   {{email}}
Phone:   {{phone}}
Service: {{service}}
Message: {{message}}

Submitted: {{date}}
Source: futureblock.in/contact

---
Reply directly to this email to respond to the client.
```

## Assets to replace

- `img/og-image.png` — Create a 1200×630px share image in Canva (logo + tagline "Where Strategy Meets Execution")
- `img/logo.svg` — Optional vector version of the logo (currently using `logo.png`)

## GitHub Pages

- `CNAME` is set to `futureblock.in`
- Enable custom domain + Enforce HTTPS in repository Settings → Pages
