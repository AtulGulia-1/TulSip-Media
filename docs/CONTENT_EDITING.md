# Content Editing Guide

Use these files to update content without changing layout or breaking responsive format:

1. Global text + links:
`lib/data/site-content.ts`
- Hero copy
- Footer copy
- Navbar links
- Footer links
- Social labels

2. Brand/config info:
`lib/config.ts`
- Contact email/phone/address
- Map URL
- Social destination URLs
- UPI details

3. Packages:
`lib/data/packages.ts`
- Core plans in `CORE_PACKAGE_PLANS`
- Add unlimited custom plans in `CUSTOM_PACKAGE_PLANS`

4. Portfolio (public):
- Preferred: Admin Dashboard -> `Website CMS` tab
- Fallback local data: `lib/data/portfolio.ts`

5. FAQs:
`lib/data/faqs.ts`

6. Team / Story / Testimonials:
- `lib/data/team.ts`
- `lib/data/founders.ts`
- `lib/data/testimonials.ts`

All components map these arrays into fixed card/grid layouts, so adding/removing items will not break page structure.

