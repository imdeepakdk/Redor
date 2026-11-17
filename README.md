# REDOR — Digital Marketing & Web Engineering Agency

> Complete, production-ready website and admin portal for **REDOR**, a modern digital marketing and web engineering agency based in **Greater Noida, Uttar Pradesh, India**, founded by a solo 22-year-old developer/creator.

---

## 🚀 Live Demo & Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3 with custom origami folded-triangle geometry & dark mode
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security, Auth, Storage)
- **Animations:** Framer Motion (sub-second mobile performance, Lighthouse 90+)
- **Forms & Validation:** React Hook Form + Zod (Indian mobile/WhatsApp regex validation)
- **Deployment:** Vercel (Edge-ready)
- **Compliance:** Indian Digital Personal Data Protection Act, 2023 (DPDP Act) compliant drafting

---

## 📁 Project Architecture

```
redor/
├── .env.example              # Environment variables template
├── .env.local                # Local development credentials
├── package.json              # Dependencies (Next 14, Tailwind, Supabase, etc.)
├── tailwind.config.ts        # Brand palette (#D93A3A to #B71C1C, charcoal #111)
├── supabase/
│   └── schema.sql            # Complete DB migration, RLS policies & services seed
├── docs/
│   ├── ADMIN_GUIDE.md        # "How to add a new project to the portfolio"
│   └── PRE_LAUNCH_CHECKLIST.md # Exact checklist of items to verify before going live
├── public/
│   ├── images/
│   │   ├── logo.svg          # Pure vector origami folded-R logo
│   │   ├── redor-logo.jpg    # Original image asset
│   │   └── redor-logo-transparent.png # Clean transparent PNG
│   ├── favicon.png           # 64x64 origami favicon
│   └── icon.svg              # Scalable vector icon
└── src/
    ├── app/
    │   ├── layout.tsx        # Root layout, Google Fonts (Sora + Inter), JSON-LD schema
    │   ├── page.tsx          # Homepage (Hero, Services, 4 Steps, Testimonials, FAQ, CTA)
    │   ├── services/         # Detailed services page with timeline & deliverables
    │   ├── work/             # Portfolio case studies with category filters
    │   │   └── [slug]/       # Individual case study with challenge, solution & gallery
    │   ├── book/             # Conversion booking form with Indian phone validation
    │   ├── about/            # Honest founder story (22yo solo developer in Greater Noida)
    │   ├── contact/          # WhatsApp direct, phone, email, Greater Noida city map
    │   ├── privacy-policy/   # DPDP Act 2023 compliant draft
    │   ├── terms-of-service/ # Commercial terms of service draft
    │   ├── not-found.tsx     # Custom 404 with origami theme
    │   ├── loading.tsx       # Loading skeleton
    │   ├── sitemap.ts        # Dynamic XML sitemap generator
    │   ├── robots.ts         # Search engine crawlers policy
    │   ├── api/
    │   │   └── book/route.ts # Server-side booking intake, IP rate limiter & Resend mail
    │   └── admin/            # Protected Single-Admin Management Portal
    │       ├── layout.tsx    # Supabase session guard & sidebar
    │       ├── login/        # Admin sign-in screen
    │       ├── page.tsx      # Metrics dashboard & recent leads feed
    │       ├── leads/        # CRM pipeline (New → Won), CSV export, quick WhatsApp
    │       ├── portfolio/    # Case studies CRUD, storage upload, "Concept Demo" badge
    │       ├── services/     # Toggle starting prices and visibility
    │       ├── testimonials/ # Verified quotes manager (with consent verification)
    │       └── settings/     # Site settings, contact info, WhatsApp number, GA4/Pixel
    ├── components/
    │   ├── ui/               # Logo, Badges, EmptyState, ThemeToggle
    │   ├── layout/           # Navbar, Footer, WhatsAppButton, CookieConsent
    │   ├── home/             # Hero, HowWeWork, FeaturedProjects, Testimonials, FAQ
    │   └── forms/            # BookingForm (React Hook Form + Zod)
    ├── lib/
    │   ├── supabase/         # Browser and server clients
    │   ├── validations/      # Zod booking validation with Indian phone check
    │   └── data/             # Static fallback data and initial services
    └── types/
        └── index.ts          # Complete TypeScript data schemas
```

---

## ⚡ Quickstart & Local Setup

### 1. Clone & Install
```bash
git clone <your-repo-url> redor
cd redor
npm install
```

### 2. Configure Supabase Database
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard) and create a free project.
2. In the left navigation, click **SQL Editor**.
3. Open `supabase/schema.sql` from this repository, copy its entire contents, paste it into the Supabase SQL editor, and click **Run**.
   - This creates: `services`, `projects`, `testimonials`, `bookings`, `site_settings` tables.
   - It sets up secure **Row Level Security (RLS)** policies.
   - It creates the `portfolio` public storage bucket for image uploads.
   - It seeds the 6 core agency services.

### 3. Create Your Single Admin User
1. In the Supabase Dashboard, click **Authentication** > **Users**.
2. Click **Add User** > **Create User**.
3. Enter your email (e.g. `contact@redor.in`) and a secure password.
4. Toggle "Auto Confirm User" to true.
5. This is your admin login credentials for `/admin/login`. Public registrations are permanently disabled.

### 4. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_CALL_PHONE=+91 98765 43210
NEXT_PUBLIC_CONTACT_EMAIL=contact@redor.in

# Optional: Resend API Key for automatic email notifications on new bookings
RESEND_API_KEY=
ADMIN_NOTIFICATION_EMAIL=contact@redor.in
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public site.  
Visit [http://localhost:3000/admin](http://localhost:3000/admin) to log into the admin dashboard.

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub / GitLab.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your `redor` repository.
4. In the **Environment Variables** section, copy the keys from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (set to `https://redor.in` or your Vercel URL)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_CALL_PHONE`
   - `NEXT_PUBLIC_CONTACT_EMAIL`
   - `RESEND_API_KEY` (optional)
   - `ADMIN_NOTIFICATION_EMAIL` (optional)
5. Click **Deploy**. Your agency site is live in under 2 minutes.

---

## ⚖️ Legal & Compliance Note
The Privacy Policy (`/privacy-policy`) and Terms of Service (`/terms-of-service`) include draft provisions based on the **Digital Personal Data Protection Act, 2023 (DPDP Act)** and Indian commercial law. These are drafts for informational purposes and must be reviewed by a qualified Indian advocate prior to commercial operations.
