# JEDIYWORKS Platform — Implementation Plan v2

> *"Nothing left unbuilt."*

## Background

JEDIYWORKS is a creative collective — independent creators (Jediy, Ilham/HAMSSWORK, Da/DA COLLECTIVE, Didik/DIDIKKASS) who choose to build together when projects demand more than one head. Not an agency. Not freelancers. A new category.

**Current state**: Next.js 16 skeleton with placeholder pages, commented-out Supabase client, basic Tailwind CSS 4.

**Target state**: A fully functional Neo-Swiss Luxury platform with Prisma ORM, automated DB setup, 8 public routes, CMS admin, and pixel-perfect adherence to the design spec.

---

## Key Decisions (Resolved)

| Decision | Resolution |
|---|---|
| Database ORM | **Prisma** (not Supabase client SDK) → PostgreSQL |
| DB Setup | Automated: `prisma migrate dev` + `prisma db seed` |
| Build approach | **Frontend + backend together** — Prisma schema + seed data from day one |
| Styling | **Tailwind CSS 4** (already installed) + CSS custom properties for design tokens |
| Fonts | Cormorant Garamond + Inter + JetBrains Mono via `next/font/google` |
| Content | Real manifesto, real circle members, real contact info |

---

## Proposed Changes

### Phase 1: Project Infrastructure & Prisma Setup

Set up the foundation so anyone can clone → install → setup DB → run.

---

#### [NEW] `prisma/schema.prisma`
Complete database schema:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Project {
  id            String   @id @default(uuid())
  title         String
  slug          String   @unique
  summary       String?  // 100-146 chars enforced in app
  thumbnailUrl  String?
  thumbnailAlt  String?
  category      String   // 'client_work' | 'experimental'
  pillar        String   // 'technology' | 'creative_visual' | 'audio_post'
  clientName    String?
  year          Int?
  duration      String?
  liveLink      String?
  problem       String?  // rich text
  execution     String?  // rich text
  impact        String?  // rich text
  techStack     String[] // array of tech tags
  reviewRating  Int?     // 1-5
  reviewQuote   String?
  reviewAuthor  String?
  reviewTitle   String?
  galleryImages Json     @default("[]")
  videoEmbeds   String[] @default([])
  status        String   @default("draft") // 'draft' | 'published'
  featured      Boolean  @default(false) // for homepage Selected Work
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  credits       CreditLink[]
}

model Collaborator {
  id             String   @id @default(uuid())
  fullName       String
  alias          String?
  brandingName   String
  slug           String   @unique
  defaultRole    String?
  photoUrl       String?
  bio            String?  // max 200 chars
  positionLine   String?  // max 80 chars
  socialIg       String?
  socialLinkedin String?
  socialYoutube  String?
  status         String   @default("active") // 'active' | 'inactive'
  profileVisible Boolean  @default(true)
  sortOrder      Int      @default(0) // for custom ordering
  createdAt      DateTime @default(now())
  credits        CreditLink[]
}

model CreditLink {
  id             String       @id @default(uuid())
  projectId      String
  collaboratorId String
  roleInProject  String
  project        Project      @relation(fields: [projectId], references: [id], onDelete: Cascade)
  collaborator   Collaborator @relation(fields: [collaboratorId], references: [id], onDelete: Cascade)
  @@unique([projectId, collaboratorId])
}

model Inbox {
  id        String   @id @default(uuid())
  email     String
  category  String
  message   String   // max 300 chars
  status    String   @default("new") // 'new' | 'read' | 'archived'
  createdAt DateTime @default(now())
}
```

#### [NEW] `prisma/seed.ts`
Seed script with real circle members + sample projects:
- **JEDIYWORKS (Jediy)** — Creative Director & Tech Architect
- **HAMSSWORK (Ilham)** — Mobile Engineer
- **DA COLLECTIVE (Da)** — Web Engineer
- **DIDIKKASS (Didik)** — Music & Audio
- 2–3 sample projects with credit links between members

#### [NEW] `src/libs/prisma.ts`
Prisma client singleton (handles hot-reload in dev)

#### [MODIFY] [package.json](file:///Users/abdullahmaajid/Downloads/jediyworks/tech/myportofolio/package.json)
- Add dependencies: `prisma`, `@prisma/client`
- Add scripts:
  - `"db:migrate"`: `"prisma migrate dev"`
  - `"db:seed"`: `"prisma db seed"`
  - `"db:setup"`: `"prisma migrate dev && prisma db seed"`
  - `"db:studio"`: `"prisma studio"`
  - `"postinstall"`: `"prisma generate"`
- Add `prisma.seed` config pointing to seed script

#### [NEW] `.env.example`
```
# Database — Supabase PostgreSQL or any PostgreSQL
DATABASE_URL="postgresql://user:password@host:5432/jediyworks?schema=public"

# Optional: Supabase (for file storage later)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

#### [MODIFY] [.gitignore](file:///Users/abdullahmaajid/Downloads/jediyworks/tech/myportofolio/.gitignore)
- Add `.env` (ensure not committed)
- Add `prisma/*.db` for SQLite fallback

#### [NEW] `README.md` (overwrite)
Setup instructions:
```
1. git clone → cd myportofolio
2. npm install
3. cp .env.example .env → fill DATABASE_URL
4. npm run db:setup   (creates tables + seeds data)
5. npm run dev
```

---

### Phase 2: Design System Foundation

#### [MODIFY] [globals.css](file:///Users/abdullahmaajid/Downloads/jediyworks/tech/myportofolio/src/app/globals.css)
Complete Jediyworks design system:
- CSS custom properties for all 10 color tokens
- Tailwind `@theme` integration for all tokens
- Typography scale: hero (72–96px), section (48px), card (22px), body (16px), caption (13px), tag (11px)
- Button styles: Primary CTA (crimson), Ghost (border crimson)
- Tag/pill variants for pillars
- Form elements styling
- Smooth scroll, selection color
- Animation keyframes for fade-up, stagger, star-fill
- Rating stars styling

#### [MODIFY] [layout.tsx](file:///Users/abdullahmaajid/Downloads/jediyworks/tech/myportofolio/src/app/layout.tsx)
- Load `Cormorant_Garamond`, `Inter`, `JetBrains_Mono` via `next/font/google`
- Set `lang="en"` per spec
- Apply font CSS variables to body
- Default metadata: title template, description, OG defaults

#### [NEW] `src/types/index.ts`
TypeScript interfaces matching Prisma models + UI-specific types

---

### Phase 3: Layout & Sidebar System

#### [DELETE] [navbar.tsx](file:///Users/abdullahmaajid/Downloads/jediyworks/tech/myportofolio/src/components/layout/navbar.tsx)

#### [NEW] `src/components/layout/Sidebar.tsx`
- Client component — `usePathname` for active state
- Desktop: 220px fixed, `--espresso` background
- Wordmark "JEDIYWORKS" → nav links (Work, Circle, About, Contact) → social icons (IG, LinkedIn) → copyright
- Nav: 13px uppercase, letter-spacing 0.06em
- Active indicator: `--aged-gold` 2px left border, slides between items

#### [NEW] `src/components/layout/MobileNav.tsx`
- 48px top bar: wordmark left, hamburger right
- Slide-in drawer: 80vw max 300px, `--near-black` 85% overlay
- Tap outside or X to close

#### [NEW] `src/components/layout/Footer.tsx`
- `--near-black` bg, three columns: wordmark, nav links, social icons
- Copyright at bottom, `rgba(242,239,233,0.3)` 11px
- Only renders on `/` and `/about`

#### [MODIFY] [layout.tsx (public)](file:///Users/abdullahmaajid/Downloads/jediyworks/tech/myportofolio/src/app/(public)/layout.tsx)
- Replace Navbar with Sidebar + MobileNav
- Content area: `margin-left: 220px` on desktop
- Conditionally render Footer

---

### Phase 4: Homepage — 7 Sections

#### [MODIFY] [page.tsx (homepage)](file:///Users/abdullahmaajid/Downloads/jediyworks/tech/myportofolio/src/app/(public)/page.tsx)
- Compose all 7 sections, homepage metadata + Organization schema

#### [NEW] `src/components/sections/HeroSection.tsx`
- Full viewport, `--bone` bg
- "Nothing left unbuilt." or "Built by one. Executed by many." — serif 72–96px weight 300
- Subtext from manifesto
- Dual CTA: "See Our Work" (primary) + "Start a Project" (ghost)
- Client Trust Strip (placeholder logos if none available)

#### [NEW] `src/components/sections/SelectedWorkSection.tsx`
- Fetch featured projects from Prisma
- Asymmetric grid layout
- Grayscale → color hover, staggered fade-up
- "View All Work →" gold underline link

#### [NEW] `src/components/sections/ServicesSection.tsx`
- `--near-black` bg, three pillars from manifesto:
  - **Technology & Engineering**: Web & Mobile App Dev, UI/UX, IoT, Custom AI
  - **Creative & Visual Identity**: Brand Identity, Cinematic Documentation, Video Production
  - **Audio & Post-Production**: Music Production, VFX, Sound Design
- Hover reveals sub-services (desktop), accordion (mobile)

#### [NEW] `src/components/sections/NetworkSection.tsx`
- Fetch active collaborators from Prisma
- Grayscale → color on hover, horizontal scroll snap mobile

#### [NEW] `src/components/sections/TestimonialSection.tsx`
- `--espresso` bg, single strongest testimonial
- Aged Gold stars, staggered fill animation
- Conditional render: no review = section hidden

#### [NEW] `src/components/sections/InquirySection.tsx`
- "Let's talk." — Email, Category dropdown, Message (300 char max)
- Server action to insert into Prisma `Inbox` table
- Submit micro-interaction: spinner → ✓ → "We'll be in touch."

#### Footer integrated as Section 7 via the Footer component

---

### Phase 5: Portfolio Pages

#### [MODIFY] [portofolio/page.tsx](file:///Users/abdullahmaajid/Downloads/jediyworks/tech/myportofolio/src/app/(public)/portofolio/page.tsx)
- Fetch published projects from Prisma
- Dual-dimension filters (client component):
  - Tab: All / Client Work / Experimental
  - Chips: All / Technology / Creative & Visual / Audio
- 2-column grid, grayscale cards, animated filter transitions
- Empty state: "Nothing here yet. But we're always building something."
- SEO: H1 "Work — Jediyworks"

#### [NEW] `src/app/(public)/portofolio/[slug]/page.tsx`
- Fetch project + credits from Prisma
- Hero visual → Metadata table → Blueprint (Problem/Execution/Impact) → Tech stack → Network on This Project → Client Review → Gallery → Share Bar
- `generateMetadata` for dynamic title + OG

#### [NEW] `src/components/cards/ProjectCard.tsx`
- Reusable: thumbnail (grayscale → color), title, year, summary, tag pills
- Hover: scale 1.02, overlay, title shift up 8px

#### [NEW] `src/components/ui/ShareBar.tsx` (overwrite empty file)
- Copy Link button → clipboard API → "Copied ✓" 2s feedback
- Sticky bottom, disappears at footer

---

### Phase 6: Circle Pages (NEW)

#### [NEW] `src/app/(public)/circle/page.tsx`
- `/circle` — "The Circle."
- Fetch active + profile_visible collaborators from Prisma
- 3-col grid desktop, responsive down
- Cards: grayscale → color, branding name, specialization, social on hover
- Optional filter by pillar
- SEO: "The Circle — Jediyworks"

#### [NEW] `src/app/(public)/circle/[slug]/page.tsx`
- Fetch collaborator + their credited projects from Prisma
- Profile header: full color photo, branding name serif 48px, role, socials
- Projects grid with role-specific credit per project
- Optional bio section
- Breadcrumb: Circle / @brandingname
- `generateMetadata` for dynamic SEO + OG

#### [NEW] `src/components/cards/CollaboratorCard.tsx`
- Reusable for /circle listing, homepage network, about page

---

### Phase 7: About & Contact

#### [MODIFY] [about/page.tsx](file:///Users/abdullahmaajid/Downloads/jediyworks/tech/myportofolio/src/app/(public)/about/page.tsx)
- **Opening Statement**: "Nothing left unbuilt." manifesto
- **The Founder**: Jediy — Creative Director & Tech Architect, personal paragraph
- **The Philosophy**: `--near-black` bg, four House Rules from manifesto:
  1. "We don't staff projects. We build circles."
  2. "Every collaborator is credited. Always."
  3. "We'd rather do three things well than ten things adequately."
  4. "Independent names. Shared standard."
- **The Network**: Fetch from Prisma, compact cards
- **Dual CTA**: "Have a project?" (crimson) + "Are you a creator?" (ghost → mailto)
- Alternating bone/dark backgrounds

#### [MODIFY] [contact/page.tsx](file:///Users/abdullahmaajid/Downloads/jediyworks/tech/myportofolio/src/app/(public)/contact/page.tsx)
- "Let's talk." + form (Email, Category, Message)
- Server action → Prisma Inbox insert
- Below form: "Prefer email? hello@jediyworks.com" + "WhatsApp: wa.me/6283114977893"
- SEO: "Contact — Jediyworks"

---

### Phase 8: 404 + Admin CMS

#### [MODIFY] [not-found.tsx](file:///Users/abdullahmaajid/Downloads/jediyworks/tech/myportofolio/src/app/not-found.tsx)
- Refine colors to exact tokens
- No sidebar, full viewport `--near-black`
- "404" ambient texture, `--aged-gold` CTA

#### [MODIFY] [admin/layout.tsx](file:///Users/abdullahmaajid/Downloads/jediyworks/tech/myportofolio/src/app/admin/layout.tsx)
- Admin sidebar: `--near-black` bg, nav to 4 modules

#### [NEW] `src/app/admin/projects/page.tsx`
- Project Manager: CRUD with all fields from schema
- Summary char counter (100–146), slug auto-gen, tech stack tag input
- Status toggle: Draft/Published, Preview button

#### [NEW] `src/app/admin/network/page.tsx`
- Network Manager: CRUD for collaborators
- Photo URL, bio (200 chars), position (80 chars), status toggle

#### [NEW] `src/app/admin/credits/page.tsx`
- Credit Linker: project dropdown → collaborator dropdown → role input
- Relation table view

#### [NEW] `src/app/admin/inbox/page.tsx`
- Inbox: table with status badges (New gold, Read gray, Archived dim)
- Row expand, "Reply via Email" mailto button

---

### Supporting Files

#### [DELETE] `src/components/sections/hero-section.tsx`
#### [DELETE] `src/components/sections/project-section.tsx`
#### [DELETE] `src/components/sections/skill-section.tsx`
#### [DELETE] `src/data/profile.json`
#### [DELETE] `src/data/projects.json`
#### [DELETE] `src/data/skills.json`

#### [NEW] `src/hooks/useScrollAnimation.ts`
- Intersection Observer hook for scroll-triggered fade-up animations

#### [NEW] `src/hooks/useClipboard.ts`
- Copy to clipboard with "Copied" state management

#### [NEW] `src/app/actions/inquiry.ts`
- Server action for contact form submission → Prisma Inbox insert

#### [NEW] `src/app/actions/admin.ts`
- Server actions for all admin CRUD operations

---

### Updated Sidebar Navigation

```
[JEDIYWORKS wordmark]
─────────────────────
Work          ← /portofolio
Circle        ← /circle
About         ← /about
Contact       ← /contact
─────────────────────
[Social: IG · LI · WA]
─────────────────────
© 2025 Jediyworks
Based in Yogyakarta.
```

---

### Updated Route Summary

| Route | Function | Sidebar | Access |
|---|---|---|---|
| `/` | Homepage — 7 sections | ✓ | Public |
| `/portofolio` | All projects with filters | ✓ | Public |
| `/portofolio/[slug]` | Case study detail | ✓ | Public |
| `/circle` | The Collective gallery | ✓ | Public |
| `/circle/[slug]` | Collaborator profile + projects | ✓ | Public |
| `/about` | Identity & philosophy | ✓ | Public |
| `/contact` | Contact form | ✓ | Public |
| `/404` | Not found | ✗ | Public |
| `/admin` | CMS dashboard | Admin sidebar | Admin |
| `/admin/projects` | Project manager | Admin sidebar | Admin |
| `/admin/network` | Network manager | Admin sidebar | Admin |
| `/admin/credits` | Credit linker | Admin sidebar | Admin |
| `/admin/inbox` | Message inbox | Admin sidebar | Admin |

---

## Clone-to-Run Setup Flow

```bash
# 1. Clone & install
git clone <repo> && cd myportofolio
npm install          # → triggers postinstall → prisma generate

# 2. Configure environment
cp .env.example .env
# Edit .env → add DATABASE_URL (Supabase PostgreSQL or local)

# 3. Setup database
npm run db:setup     # → prisma migrate dev + prisma db seed
                     # Creates all tables + seeds circle members + sample data

# 4. Run
npm run dev          # → http://localhost:3000
```

> [!TIP]
> For local development without Supabase, any PostgreSQL works:
> ```
> DATABASE_URL="postgresql://postgres:postgres@localhost:5432/jediyworks"
> ```
> Or even use Docker: `docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:16`

---

## Verification Plan

### Automated
- `npm run build` — zero build errors
- `npx prisma migrate dev --name test` — schema validates
- `npm run lint` — clean output
- Browser: navigate all 10 routes, verify rendering
- Browser: responsive at 1440px, 1024px, 768px, 375px
- Browser: sidebar active states, mobile drawer
- Browser: portfolio filter interactions
- Browser: contact form submission → check DB

### Manual
- Visual review against color tokens, typography, spacing
- Hover states: cards, buttons, nav, collaborator photos
- Scroll animation timing
- Share bar clipboard
- Admin CRUD operations

---

## Phase 9: Homepage Redesign (Visual Reference Match)

> [!IMPORTANT]
> **User Review Required**
> The user provided a reference image with a highly editorial, overlapping photo aesthetic. I propose redesigning the Homepage (`src/app/(public)/page.tsx` and its sections) to match this vibe exactly. Do you approve this redesign?

### Proposed Design Upgrades:
1. **Script Font Accent**: Add a handwritten/script font (e.g., `Great Vibes` or `Alex Brush` via Google Fonts) to recreate the signature and handwritten notes ("Hi, I'm...", "i'm here because i want...").
2. **Centered Hero**: Adjust `HeroSection.tsx` to have perfectly centered, massive serif typography over the full-bleed background image, moving the Client Strip below the hero onto a Bone background.
3. **Overlapping Editorial Layout**: Create a new `AboutPreviewSection.tsx` (replacing the standard Services grid) that features a large photo with smaller offset photos overlapping it, paired with the script signature.
4. **Massive Crimson Manifesto Block**: Update the Testimonial or add a Manifesto block that mimics the deep red section in the reference: Huge centered serif text, script accent text floating on top, and small overlapping image cards.
5. **Cinematic Cards**: Update `SelectedWorkSection.tsx` to display projects as large, edge-to-edge cinematic cards (like the "Wedding Atelier" section).

### Files to Modify:
#### [MODIFY] `src/app/layout.tsx` (Add Script Font)
#### [MODIFY] `src/app/globals.css` (Add script font utility)
#### [MODIFY] `src/components/sections/HeroSection.tsx`
#### [NEW] `src/components/sections/AboutPreviewSection.tsx`
#### [MODIFY] `src/components/sections/ManifestoSection.tsx` (or Testimonial)
#### [MODIFY] `src/app/(public)/page.tsx`

