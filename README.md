# Tian & Omy — Wedding Invitation

Single-page wedding invitation built with Next.js (App Router). Sections: cover
(with personalized guest name), countdown, event details with map links,
gallery, RSVP (attendance + message), and gift/bank info.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Append `?to=Guest+Name`
to personalize the cover greeting, e.g. `http://localhost:3000?to=Budi`.

## Editing content

- **Wedding details** (names, date, venues, bank accounts, gallery list):
  [src/lib/config.ts](src/lib/config.ts)
- **All on-page text** (Indonesian copy, labels, messages):
  [src/lib/copy.ts](src/lib/copy.ts)
- **Photos**: replace the placeholder SVGs in `public/gallery/` and
  `public/cover.svg` with real JPG/PNG files, then update the paths in
  `src/lib/config.ts`.

## RSVP backend (Google Apps Script)

The RSVP form posts to `/api/rsvp`, a Next.js route that forwards to a Google
Apps Script Web App bound to your spreadsheet.

1. Open the spreadsheet: https://docs.google.com/spreadsheets/d/1sSYH5xI3x_JOSNgPmIOxD40LoL7HODR4WabPZKskJZI
   — make sure it has two sheets: `attendance` (columns: Name, Attendance)
   and `message` (columns: Name, Message).
2. In the Sheet, go to **Extensions > Apps Script**.
3. Delete any starter code and paste the contents of
   [apps-script/Code.gs](apps-script/Code.gs).
4. Click **Deploy > New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Authorize when prompted, then copy the deployment URL
   (ends in `/exec`).
6. Create `.env.local` in this project (copy from `.env.example`) and set:
   ```
   APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec
   ```
7. Restart `npm run dev` (or redeploy on Vercel with the same env var set
   under Project Settings > Environment Variables).

If you ever edit `Code.gs`, you must create a **new deployment version**
(Deploy > Manage deployments > Edit > New version) for changes to take effect.

## Deploying to Vercel

```bash
npx vercel
```

Set `APPS_SCRIPT_URL` as an environment variable in the Vercel project
settings (Production and Preview) before the RSVP form will work live.
