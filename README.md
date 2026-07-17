# YogTeck — Angular Static Site

Ye original static site (index.html + script.js + style.css) ko Angular me convert kiya gaya hai.
**Abhi koi backend/API nahi hai** — sab kuch static hai. Contact form bhi sirf local success message
dikhata hai, kisi server ko data nahi bhejta.

## Structure
- `src/app/components/home/` — poora page ek `HomeComponent` me hai (nav, hero, racks, about,
  process, projects/gallery, team, contact, footer) — same as original single-page site.
- `src/styles.css` — original `style.css` (global, kyunki theming `:root` / `html[data-theme]` pe
  depend karti hai).
- `public/assets/img/` — sab rack images.
- GSAP + ScrollTrigger animations `home.component.ts` me ported hain (mouse parallax, scroll
  progress bar, rack-to-section travel animation, gallery filter, lightbox, theme toggle, mobile
  menu, process track, contact form validation).

## Run locally
```bash
npm install
npm start        # ng serve — http://localhost:4200
```

## Production build
```bash
npm run build
```
Output `dist/bizracks-angular/browser` me milega — kisi bhi static host (Netlify, Vercel, Nginx,
Firebase Hosting) pe deploy kar sakte ho.

> Note: `angular.json` me build-time Google Fonts inlining disable ki hai (sandbox me internet
> access nahi tha is task ke waqt). Agar tum production build internet access wali machine pe le
> rahe ho aur build-time font inlining chahiye, to `angular.json` → `architect.build.options.optimization`
> se `"fonts": { "inline": false }` hata sakte ho — fonts abhi bhi `<link>` tag se runtime pe load
> ho hi jaayenge, ye sirf ek optimization step hai.

## Aage jab API chahiye ho
Jab backend/API ready ho jaye, `HttpClientModule` add karke `initializeContactForm()` me
`form.reset()` se pehle ek service call kar sakte ho — abhi wahan sirf local success UI hai.
