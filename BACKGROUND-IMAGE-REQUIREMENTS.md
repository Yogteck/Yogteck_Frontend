# YOGTECK Website Redesign — Background Image & Asset Requirements

This document specifies the raster and graphic assets required for the YOGTECK UI/UX redesign according to Section G of the redesign specification.

> **Development Notice**: During initial development and component assembly, modern CSS placeholders (layered deep navy linear/radial gradients `#050B1A` / `#0A1330` with blurred orange `#FF9A1F` and electric blue `#2F7BFF` ambient glow backdrops) are used so that no visual progress or functionality is blocked. When these high-resolution raster assets are provided, place them in the corresponding paths below.

---

## 1. Required Raster Images

| Asset ID | File Name & Path | Recommended Dimensions | Format | Description & Composition | Safe Area / Constraints | Mobile Adaptation |
|---|---|---|---|---|---|---|
| **BG-01** | `public/assets/images/hero-bg-desktop.webp` | 1920 × 900 px | WebP / PNG (optimized, < 180 KB) | Night city bokeh background, deep navy (`#050B1A`) with soft electric blue ambient glow on left/center and warm golden-orange glow at bottom-right. | **Left 45% must remain dark, low-contrast, and clean** for headline and sub-copy legibility. **NO text, NO laptop, NO logos baked in.** | — |
| **BG-02** | `public/assets/images/hero-bg-mobile.webp` | 828 × 1200 px | WebP / PNG (optimized, < 120 KB) | Vertical aspect ratio crop of the night city bokeh scene with deep navy ambient glow. | **Top 55% must be dark and calm** for mobile headline & CTA buttons. | Dedicated mobile background |
| **AS-03** | `public/assets/images/hero-laptop.webp` *(Optional)* | ~1400 × 900 px | Transparent WebP / PNG | Modern angled or front-facing laptop mockup showcasing a clean, generic modern e-commerce dashboard / product storefront. | **Transparent background.** No commercial brand marks or unreadable pixelated text. *(If not supplied, generated via layered CSS/SVG component).* | Scaled responsively with CSS max-width |
| **AS-04** | `public/assets/images/growth-bg.webp` *(Optional)* | 1600 × 700 px | WebP / PNG | Subtle dark network grid / circuit / glowing node pattern for the Business Growth Journey section. | Subtle opacity (5%–10% luminance) so timeline cards stand out. | Centered crop |

---

## 2. Client & Brand Graphic Assets

| Asset ID | Target Path | Format | Details | Current Fallback in Code |
|---|---|---|---|---|
| **LOGO-01** | `public/assets/images/yogteck-logo.svg` | SVG / Transparent PNG | Official YOGTECK brand logo with tagline *"Build • Grow • Succeed"*. | Clean SVG brand mark + typography using `favicon.svg` & stylized YOGTECK wordmark. |
| **CLIENT-01** | `public/assets/images/clients/mmr-constructions.svg` | SVG / PNG | Logo for MMR Constructions and Developer Private Limited | Polished dark glass pill card with typography & corporate badge icon. |
| **CLIENT-02** | `public/assets/images/clients/yogkart-healthcare.svg` | SVG / PNG | Logo for Yogkart Healthcare Private Limited | Polished dark glass pill card with typography & healthcare badge icon. |
| **CLIENT-03** | `public/assets/images/clients/business-web-solutions.svg` | SVG / PNG | Logo for Business Web Solutions | Polished dark glass pill card with typography & web solutions icon. |

---

## 3. Reference Design Image (Dev Only)

- **Target Path**: `src/assets/reference/yogteck-reference.png`
- **Purpose**: Internal layout & styling source of truth.
- **Rule**: Never bundle or serve in production builds.

---

## 4. Summary of Code-Rendered Elements (No Raster Images Needed)

All remaining visual elements are built natively in HTML5 / SVG / CSS / Angular components:
- **Hero Visual Elements**: Laptop screen frame, e-commerce cards, floating checklist card *"Your Business Online"*, floating cart card, floating revenue/growth chart, plant graphic, and upward script growth arrow *"More Customers / More Growth"*.
- **Marketplace Chips**: Clean glass chips for Amazon, Flipkart, Meesho, Walmart rendered via CSS/SVG with verified brand colors.
- **Feature Strip**: 6 interactive icons + badges with hover glow effects.
- **Service Cards**: 8 light-theme cards with gradient icon tiles and shadow elevation.
- **Interactive Forms & Controls**: Zero-overlap input controls with perfectly aligned icons, validation states, and responsive sticky action bars.
