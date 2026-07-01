# FutureBlock LLP

Enterprise IT consultancy website — Advisory, Automation, Integrations, Business Analytics, Cloud, and AI & Innovation.

## Local development

```bash
npx serve .
```

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
