# Burxon — Landing Page

Maktab qo‘ng‘iroq qurilmasi uchun reklama sahifasi. Bitta sahifa, framework yo‘q,
Tailwind CDN orqali stillar, Inter font Google Fonts dan.

## Lokal ishga tushirish

Bu statik sahifa, har qanday HTTP server bilan ishlaydi:

```bash
cd landing_page
python3 -m http.server 8080
# brauzerda: http://localhost:8080
```

## Tuzilishi

```
landing_page/
├── index.html          # asosiy sahifa (Hero, Features, How, Pricing, FAQ, Contact)
├── assets/
│   ├── main.js         # theme toggle + footer year (deferred, ~1KB)
│   ├── favicon.svg     # SVG favicon (vektor, har xil ekran o'lchami uchun)
│   ├── icon-192.svg    # apple-touch-icon (192×192 SVG)
│   └── og-image.svg    # Open Graph rasmi
├── robots.txt
├── sitemap.xml
└── README.md
```

## Texnik tafsilotlar

- **Tailwind CSS** CDN orqali (`cdn.tailwindcss.com`), `darkMode: 'class'`.
- **Dark mode**: `prefers-color-scheme` + qo‘lda almashtirish (localStorage da saqlanadi).
- **Font**: Inter (Google Fonts), `&display=swap` — render bloklamaydi.
- **Performance**: Tailwind CDN script `defer`, sahifa JS ~1KB, lazy images bilan,
  hech qanday tracker yo‘q. Maqsad: < 2s FCP 4G da.
- **A11y**: semantik landmarklar (`<header>`, `<main>`, `<section>`, `<footer>`),
  `:focus-visible` ring, skip-link, FAQ `<details>` orqali (keyboard ishlaydi).
- **SEO**: meta description, canonical, OG/Twitter tag, JSON-LD `Product`.
- **CSP** meta tag bilan: faqat ishlatiladigan CDN (Tailwind, Google Fonts) ruxsat etilgan.

## Tekshirish

### Mahalliy preview

```bash
cd landing_page && python3 -m http.server 8080
```

### Lighthouse (mobile)

```bash
npx lighthouse http://localhost:8080 \
  --only-categories=performance,accessibility,seo,best-practices \
  --form-factor=mobile \
  --chrome-flags="--headless"
```

Maqsad: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.

### A11y skanerlash

```bash
npx @axe-core/cli http://localhost:8080
```

Maqsad: 0 ta kritik xato.

## TODO (productionga chiqishdan oldin)

- [ ] `index.html` da `https://burxon.example` URL ni haqiqiy domenga almashtirish.
- [ ] `assets/og-image.svg` o‘rniga 1200×630 PNG joylash (ijtimoiy tarmoqlar SVG ni bajonidil ko‘rsatmaydi).
- [ ] Telefon raqami va Telegram username ni haqiqiysi bilan almashtirish.
- [ ] Form `mailto:` o‘rniga Formspree yoki o‘zimizning `/api/leads` endpoint ga ulash + privacy notice.
- [ ] Cookie banner (agar analytics qo‘shilsa) — hozircha analytics yo‘q.
- [ ] Real qurilma rasmi (PNG/WebP) ni Hero bo‘limidagi placeholder o‘rniga qo‘yish.

## Deploy

Statik sayt bo‘lgani uchun har qanday CDN/hosting:

- **Netlify / Vercel / Cloudflare Pages**: shu papkani drag-drop yoki git push.
- **Nginx**: `landing_page/` ni `root` qilib qo‘ying, `try_files $uri /index.html;`.
- **GitHub Pages**: `gh-pages` branchga yoki `main`/`docs/` ga.

Production header tavsiyalari (server tomonida qo‘shish):

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```
