# Pre-Launch Checklist for REDOR Founder

Before pointing your production domain (e.g. `redor.in`) to this website, review and customize the following items:

---

## 1. Contact Information & WhatsApp Links
- [ ] **WhatsApp Number**: Replace `919876543210` with your real personal/business WhatsApp number in:
  - `.env.local` (`NEXT_PUBLIC_WHATSAPP_NUMBER=91...`)
  - Admin Portal > **Site Settings** (`/admin/settings`)
  - `src/lib/data/initialData.ts`
- [ ] **Phone Number**: Replace `+91 98765 43210` with your real business mobile number in `.env.local` and `/admin/settings`.
- [ ] **Contact Email**: Update `contact@redor.in` in `.env.local` and `/admin/settings`.
- [ ] **Operational Hours**: Verify whether `Mon – Sat: 10:00 AM – 7:30 PM IST` matches your preferred schedule in `src/components/layout/Footer.tsx`.

---

## 2. Founder Story & About Page
- [ ] Open `src/app/about/page.tsx` and review the founder bio.
- [ ] Add your personal details, specific college/background if desired, or replace the founder initial avatar with your real headshot/photo (place it in `public/images/founder.jpg`).
- [ ] Verify social links in `src/components/layout/Footer.tsx` and `src/app/contact/page.tsx` (Instagram handle, LinkedIn profile).

---

## 3. Database Migration & Admin User
- [ ] Log in to [Supabase](https://supabase.com/dashboard) and run `supabase/schema.sql` in the **SQL Editor**.
- [ ] Go to **Authentication > Users** in Supabase and create your single admin user with your private email and strong password.
- [ ] Test logging in at `/admin/login`.
- [ ] Create your first 1–2 projects in the portfolio manager (mark concept prototypes as "Concept Demo").

---

## 4. Email Notifications (Optional)
- [ ] If you want automatic email alerts whenever someone submits a booking on `/book`:
  - Create a free account at [Resend](https://resend.com) (free tier covers 3,000 emails/month).
  - Add your `RESEND_API_KEY` to `.env.local` and Vercel Environment Variables.
  - Set `ADMIN_NOTIFICATION_EMAIL` to your inbox.
  - *Note:* If left blank, inquiries still save to your Supabase `bookings` table and visitors still get the direct WhatsApp pre-filled link.

---

## 5. Analytics & Pixels (Optional)
- [ ] **Google Analytics 4**: If you use GA4, create a web stream in Google Analytics and enter the Measurement ID (e.g. `G-XXXXXXXXXX`) into `/admin/settings` or `.env.local`.
- [ ] **Meta Pixel**: If you run Facebook/Instagram Ads, enter your Meta Pixel ID into `/admin/settings` or `.env.local`.
- [ ] *Notice:* In compliance with the DPDP Act 2023, tracking scripts only execute after the visitor clicks "Accept Cookies" on the cookie consent banner.

---

## 6. Legal Pages Review by an Indian Lawyer
- [ ] **Privacy Policy** (`/privacy-policy`): Have a qualified advocate review the draft clauses regarding the **Digital Personal Data Protection Act, 2023 (DPDP Act)**, especially grievance redressal timelines and business entity status (sole proprietorship vs LLP/Pvt Ltd).
- [ ] **Terms of Service** (`/terms-of-service`): Have an advocate review payment milestone terms, intellectual property transfer terms, and jurisdiction clauses for Gautam Buddha Nagar / Greater Noida courts.
- [ ] Once reviewed, remove the yellow draft alert banner at the top of both files (`src/app/privacy-policy/page.tsx` and `src/app/terms-of-service/page.tsx`).

---

## 7. Deployment & Domain
- [ ] Import the repository into **Vercel**.
- [ ] Add all `.env.local` keys to Vercel Project Settings > Environment Variables.
- [ ] Connect your custom domain (e.g. `redor.in`) via DNS records (A Record: `76.76.21.21` or CNAME: `cname.vercel-dns.com`).
- [ ] Verify SSL certificate generation and test submission on a real 4G/5G mobile phone at 360px screen width.
