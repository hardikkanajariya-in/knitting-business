# Software Requirements Specification (SRS)
**Document Version:** 1.0  
**Date:** 07-Mar-2026  
**Agency:** Nifty Solutions — [https://niftysolutions.co.in](https://niftysolutions.co.in)  
**Project Type:** Plain HTML (Static) Website  
**Theme:** Modern minimal + Light/Dark mode + Mobile-first responsive

---

## 1) Purpose & Context
This SRS defines the scope, UI layouts, functional behavior, and delivery expectations for a simple, modern, minimal corporate website to be developed as an outsourced requirement for Nifty Solutions.

This is the first project with Nifty Solutions, so the goal is to deliver clean, white-label, easily maintainable code to build a long-term working relationship.

---

## 2) Scope & Requirements

### 2.1 In-Scope Pages (Sitemap)
Top navigation and pages will follow the provided structure: Home, About, Nirbhai Knitting (NK), NirChem (NC), Sustainability, Our Team, Contact Us.

NK and NC can contain inner sections/sub-pages if later required (to be handled as change request).

### 2.2 Tech Stack
- HTML5 (semantic layout)
- CSS3 (Flexbox/Grid, CSS Variables)
- Vanilla JavaScript (only for theme toggle + hamburger menu + minor UI)
- Mobile-first responsive design (base styles for mobile, then media queries)

### 2.3 Theme Support
- Light + Dark theme using CSS variables
- Default respects `prefers-color-scheme`
- Manual theme toggle (saved using `localStorage`)

### 2.4 Content Inputs (Client Will Provide)
- Final logo, brand colors (if any), and typography preference (if any)
- Photos (factory/team/product)
- Final text content for About, Sustainability, NK/NC descriptions
- Contact details (email, phone, address), social links

### 2.5 Reference Style Direction
Design should match a creative-minimal, modern industrial feel inspired by the shared reference sites. [file:3]

---

## 3) UI Layout (As per Wireframes)

### 3.1 Global Layout
- **Header (Sticky):**
  - Left: Logo
  - Right: Menu links (NK, NC, About, Sustainability, Our Team, Contact)
  - Mobile: Hamburger menu + slide-down / off-canvas navigation
  - Theme toggle icon/button in header
- **Footer (4 Blocks):**
  - Quick links
  - Contact info
  - Social icons
  - Copyright

### 3.2 Home / About
- Hero section:
  - Option A: Split layout (photo + write-up)
  - Option B: Full-width image with overlay filter + write-up on top
- Journey/Map style section:
  - A visual “path”/timeline to present company story/process

### 3.3 NK (Nirbhai Knitting)
- Intro banner (title + short description)
- Feature grid (2x2):
  - Raised, 3D, FR, Coated
- Large content block (image/video placeholder)
- CTA strip: “Contact Us”

### 3.4 NC (NirChem)
- Intro banner + description
- Product grid (2x2):
  - Synthetic Leather, Genuine Leather, Direct Coating, Others
- Large content block
- CTA strip: “Contact Us”

### 3.5 Our Team + Contact
- “Our Team” header section:
  - Split layout: text + factory/team photo
- Leadership cards:
  - Photo + Name + Designation (MD/Chairman, CEO, etc.)
- Contact form:
  - Name, Email, Phone (optional), Message, Submit
  - Note: Static UI only (no backend). Backend/email integration is an add-on.

---

## 4) Non-Functional Requirements & Deliverables

### 4.1 Non-Functional
- Fully responsive (mobile-first) for modern phones, tablets, desktops
- Cross-browser support: Chrome, Edge, Firefox, Safari (latest versions)
- Performance-first: optimized images, minimal JS, clean CSS
- Basic accessibility: semantic tags, focus states, labels for forms

### 4.2 Deliverables
- `/index.html` + individual page HTML files (or folder routing)
- `/assets/css/style.css` (structured sections + variables)
- `/assets/js/main.js` (theme toggle + menu)
- `/assets/img/*` (optimized images)
- Reusable components approach (same header/footer across pages)
- White-label handoff (no third-party branding)

### 4.3 Acceptance Criteria
- Theme toggle works, persists on refresh
- Hamburger menu works and is usable on mobile
- Layout matches wireframes and stays clean in both themes
- No broken layout at common breakpoints (360px, 768px, 1024px+)

---

## 5) Pricing Breakdown (INR)

> Pricing is based on the above scope (static site, 7 main pages, light/dark, mobile-first).  
> Any new pages, backend work, CMS, multi-language, or advanced animations are change requests.

### 5.1 Package Options (Recommended for agency work)

| Package | Best for | Includes | Price |
|---|---|---|---:|
| Starter | Tight budget | 7 pages, responsive, light/dark toggle, basic UI | ₹7,500 |
| Premium | High polish | Starter + extra design iteration rounds, performance pass + image optimization, enhanced components | ₹12,000 |

### 5.2 Itemized Cost (How the price is built)
(Useful for quoting transparently to Nifty Solutions)

| Module / Task | Est. Hours | Rate | Amount |
|---|---:|---:|---:|
| Project setup + folder structure | 0.5 | ₹500/hr | ₹250 |
| Global UI (Header/Footer + Mobile menu) | 2 | ₹500/hr | ₹1,000 |
| Theme system (Light/Dark + persistence) | 1 | ₹500/hr | ₹500 |
| Home/About page layout | 2.5 | ₹500/hr | ₹1,250 |
| NK page + 2x2 grid section | 2 | ₹500/hr | ₹1,000 |
| NC page + 2x2 grid section | 1.5 | ₹500/hr | ₹750 |
| Sustainability page (simple modern layout) | 1.5 | ₹500/hr | ₹750 |
| Our Team page | 1.5 | ₹500/hr | ₹750 |
| Contact page + form UI | 1.5 | ₹500/hr | ₹750 |
| Responsive QA + fixes | 1 | ₹500/hr | ₹500 |
| **Estimated Total** | **15** |  | **₹7,500** |

### 5.4 Payment Milestones (Agency-friendly)
- 40% advance (start work)
- 40% after first full draft (all pages wired + responsive)
- 20% after final fixes + handover

### 5.5 Timeline
- Starter/Standard: 2–3 working days (depends on content availability)
- Premium: 4–5 working days (extra iterations + polish)

---

## Notes for Quotation (Agency Relationship)
- We will keep the code clean, white-label, and easy for your agency team to reuse for future projects.
- First collaboration discount can be applied if Nifty Solutions confirms recurring work (optional negotiation).