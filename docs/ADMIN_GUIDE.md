# Admin Guide: How to Add a New Project to the REDOR Portfolio

This guide explains how to add, preview, and publish client websites, reels, video edits, and design case studies from your REDOR admin panel.

---

## Step 1: Log in to the Admin Portal
1. Navigate to `https://your-domain.com/admin` (or `http://localhost:3000/admin` in local development).
2. Enter your admin email and password.
3. You will land on the **Agency Overview Dashboard**.

---

## Step 2: Open Portfolio Manager
1. Click **Portfolio Manager** in the left sidebar menu (or click the **+ Add New Project** button on the dashboard).
2. Click the **+ Add New Project** button at the top right.

---

## Step 3: Fill in Project Details
Complete the following fields in the modal:

1. **Project Title**: e.g., `Iron Pulse Gym & Fitness Website`
2. **URL Slug**: Automatically generated from your title (e.g., `iron-pulse-gym-website`). You can customize this if desired.
3. **Category**: Select from:
   - `Website`
   - `Reels/Video`
   - `Design`
   - `Social Media`
   - `Ads`
4. **Client Name** *(Optional)*: e.g., `Iron Pulse LLP`
5. **Client Industry**: e.g., `Health & Fitness`
6. **Services Provided**: Click to select tags (e.g. `Next.js Development`, `Local SEO`, `Video Editing`).
7. **Short Description**: 1–2 crisp sentences describing the core deliverable. This appears on the portfolio card on `/work` and `/`.
8. **The Challenge**: Describe what problem the client was facing (e.g., slow WordPress site, low Google Maps rankings).
9. **Our Solution**: Describe how REDOR engineered the fix (e.g., custom Next.js web app, geo-tagged photo uploads).

---

## Step 4: Upload Media Assets
- **Cover Image**:
  - Click **Upload File** to upload an image from your computer directly to the Supabase `portfolio` storage bucket.
  - Alternatively, paste a public image URL into the field.
- **Video URL** *(Optional)*:
  - If you created a video or Instagram Reel, paste the YouTube URL (e.g., `https://youtube.com/watch?v=...`) or direct reel link.
- **Live Project Link** *(Optional)*:
  - Paste the live website URL (e.g., `https://ironpulse.in`) so visitors can click through and verify the real build.

---

## Step 5: Add Real Results *(Only if verifiable)*
- Under **Measurable Results**, click **+ Add Metric Pair**.
- Enter honest numbers, e.g.:
  - Value: `+140%` | Label: `Local Google Map Inquiries in 30 Days`
  - Value: `0.7s` | Label: `Mobile Page Load Speed`
- **Rule**: If the project does not have verifiable metrics yet, leave this section blank. Never fabricate numbers.

---

## Step 6: Choose Badges & Status
- **Mark as "Concept Demo"**:
  - If this project is an unofficial redesign, personal concept, or prototype rather than a paying client, **check this box**.
  - It will display a clear `Concept Demo` badge on the site to maintain 100% honesty.
- **Feature on Homepage**:
  - Check this box if you want this project featured in the top 3 on the front page.
- **Publish Status**:
  - Choose `Published` to make it visible to the public immediately.
  - Choose `Draft` if you are still adding photos or writing copy.

---

## Step 7: Save & Verify
1. Click **Create Project**.
2. Click the external link icon (↗) next to the project row in the table to open its live public case study page at `/work/<slug>`.
3. Check mobile formatting and verify all links work properly.
