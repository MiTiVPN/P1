# MiTiVPN — Templated Static Site

این پروژه یک **سایت کاملاً استاتیک** است که با یک اسکریپت Node ساده (بدون فریم‌ورک، بدون وابستگی خارجی) build می‌شود. خروجی، HTML خام است — روی GitHub Pages، هر VPS با Nginx، یا هر هاست استاتیک دیگری بدون تغییر کار می‌کند.

## چرا این ساختار؟

قبلاً هدر (nav+منو)، پس‌زمینه‌ی متحرک (canvas)، و فوتر در هر صفحه‌ی HTML به صورت کامل کپی شده بودند. حالا این‌ها فقط **یک بار** در `_partials/` نوشته می‌شوند و اسکریپت build آن‌ها را در تمام صفحات inject می‌کند. برای اضافه کردن صفحه‌ی جدید، دیگر لازم نیست هدر/فوتر/canvas را دوباره کپی کنید.

## ساختار پوشه‌ها

```
_partials/
  head-common.html    ← فونت‌ها، charset، viewport، لینک style.css (مشترک همه صفحات)
  header.html          ← nav کامل + دکمه منو + submenu پروتکل‌ها (مشترک همه صفحات)
  footer.html           ← فوتر کامل با ایمیل تماس (برای صفحه اصلی)
  footer-article.html   ← فوتر ساده (برای صفحات مقاله/پروتکل)

pages/
  home/
    content.html    ← بدنه‌ی صفحه اصلی (hero, about, faq, ...)
    meta.js          ← <title>, meta description, OG tags, JSON-LD مخصوص این صفحه
  protocols/
    content.html
    meta.js
    vless/
      content.html
      meta.js
    wireguard/ ...
    openvpn/ ...
    shadowsocks/ ...
    socks5/ ...

static/                ← فایل‌هایی که بدون تغییر کپی می‌شوند
  style.css
  script.js
  robots.txt
  sitemap.xml
  404.html

build.js               ← اسکریپت build (partials + pages/* → dist/)
new-page.js             ← اسکریپت کمکی برای ساخت سریع اسکلت صفحه جدید
dist/                   ← خروجی نهایی (این پوشه را deploy کنید — گیت‌ایگنور شود یا در CI ساخته شود)
```

## اضافه کردن صفحه جدید (کار روزمره)

```bash
node new-page.js protocols/newprotocol "New Protocol | MiTiVPN"
```

این دستور `pages/protocols/newprotocol/content.html` و `meta.js` را با یک اسکلت آماده می‌سازد. کافیست:

1. `content.html` را با محتوای واقعی صفحه پر کنید (فقط بدنه — هدر/فوتر/canvas خودکار اضافه می‌شوند).
2. در `meta.js`، عنوان، توضیحات، و تگ‌های OG را به‌روزرسانی کنید.
3. اگر صفحه یک صفحه‌ی سطح بالا مثل صفحه اصلی است، `footer: 'footer'` بگذارید؛ برای صفحات مقاله/زیرمجموعه `footer: 'footer-article'`.
4. اجرا کنید:

```bash
node build.js
```

خروجی در `dist/protocols/newprotocol/index.html` ساخته می‌شود — با همان هدر، منو، پس‌زمینه‌ی متحرک، و فوتر بقیه‌ی سایت، بدون این‌که چیزی را دستی کپی کرده باشید.

اگر می‌خواهید هر بار که فایلی را تغییر می‌دهید build خودکار دوباره اجرا شود:

```bash
node build.js --watch
```

## تغییر خود قالب (هدر/فوتر/منو)

فقط فایل‌های داخل `_partials/` را ویرایش کنید و دوباره `node build.js` بزنید — تغییر در همه‌ی صفحات به‌طور خودکار اعمال می‌شود.

## دیپلوی

### گزینه ۱: GitHub Pages (فعلی)
یک GitHub Action آماده در `.github/workflows/deploy.yml` قرار دارد. با هر push به شاخه `main`:
1. `node build.js` روی سرورهای GitHub اجرا می‌شود.
2. پوشه‌ی `dist/` به‌عنوان سایت منتشر می‌شود.

نیازی نیست شما `dist/` را دستی commit کنید یا بسازید — CI این کار را می‌کند. فقط باید در تنظیمات ریپو، GitHub Pages → Source → "GitHub Actions" را فعال کنید.

### گزینه ۲: VPS (در آینده)
وقتی به VPS منتقل شدید، دو راه ساده دارید:
- **همان build استاتیک**: `node build.js` را روی سرور یا در CI اجرا کنید و `dist/` را با rsync/scp به مسیر ریشه‌ی Nginx بفرستید. هیچ تغییری در کد لازم نیست.
- **ارتقا به SSR واقعی**: اگر بعداً خواستید صفحات پویا (لاگین، داشبورد و...) اضافه کنید، همین partials (`header.html`, `footer.html`) را می‌توانید مستقیماً به یک template engine مثل EJS در یک اپ Node/Express بدهید — چون از قبل جدا و مستقل از HTML صفحات هستند.

## نکته درباره لینک‌ها

همه‌ی لینک‌های داخلی در partials به‌صورت absolute path نوشته شده‌اند (مثل `/protocols/vless/` یا `/style.css`)، نه relative (`../../style.css`). این یعنی هر صفحه‌ای در هر عمقی از پوشه‌بندی باشد، لینک‌ها درست کار می‌کنند — دیگر لازم نیست برای هر صفحه تعداد `../` را حساب کنید.
