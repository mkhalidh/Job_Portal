# Job Portal

A two-sided job board: job seekers browse and apply to listings, recruiters
sign in to post openings and review applicants. Built as a React client plus
an Express/MongoDB API, with Clerk handling authentication for both sides.

**🔗 Live demo:** https://job-portal-client-alpha-sand.vercel.app
**API:** https://job-portal-server-opal-seven.vercel.app

## Current state

The frontend is fully built out — job listing/search, an apply flow with
resume upload, a recruiter dashboard for posting and managing jobs and
reviewing applicants. The backend so far only implements the Clerk user-sync
webhook (creating/updating/deleting a `User` document when someone signs up
via Clerk) — the job/application CRUD endpoints the frontend UI expects
aren't wired up yet, so the job listings you see on the live demo are static
sample data (`client/src/assets/assets.js`), not served from the database.
That's the natural next thing to build on top of this.

**Auth and the Apply flow are real, not mocked**: Recruiter Login and the
general Login button both go through actual Clerk sign-in/sign-up (there's
one shared account system - "recruiter" isn't a separate credential store,
it's just the same signed-in user visiting `/dashboard`, which is now
guarded and redirects home if you're not signed in). "Apply Now" checks
you're signed in (prompting sign-in if not) and confirms the submission
with a toast - but since there's no `Application` model on the backend yet,
that confirmation isn't persisted anywhere. Both of these were previously
inert UI with no logic behind the buttons at all.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router, Quill (rich text), Clerk (auth) |
| Backend | Node.js, Express, Mongoose/MongoDB, Clerk webhooks (via Svix), Sentry (error tracking) |
| Hosting | Vercel (client and server as separate projects) |
| CI/CD | GitHub Actions |

## Security note

This repo's `.env` files were committed to git with a live, credentialed
MongoDB connection string in it — a real exposure, since public GitHub repos
get scraped for exactly this pattern within minutes. Both `.env` files have
been removed from git tracking (`.env.example` files added in their place,
`.gitignore` updated) but **the MongoDB Atlas password should still be
rotated** (Database Access → the user → Edit → Password) — untracking a file
going forward doesn't undo something that was already public, and there's
no way to know if it was scraped before this fix.

## Running it locally

**Prerequisites:** Node.js ≥ 18, a MongoDB Atlas cluster (or local MongoDB), a
Clerk application (for both frontend and backend keys).

```bash
git clone https://github.com/mkhalidh/Job_Portal.git
cd Job_Portal
```

**Backend:**
```bash
cd server
npm install
cp .env.example .env   # fill in MONGODB_URI and CLERK_WEBHOOK_SECRET
npm run server          # nodemon, http://localhost:5000
```

**Frontend** (separate terminal):
```bash
cd client
npm install
cp .env.example .env   # fill in VITE_CLERK_PUBLISHABLE_KEY
npm run dev              # http://localhost:5173
```

## Deployment

Client and server are deployed as two independent Vercel projects (the
server can't be a "function" inside the client's project the way a Next.js
API route would be — it's a standalone Express app deployed via the legacy
`builds`/`routes` format in `server/vercel.json`, since it's a plain
`app.listen()` server rather than an exported request handler).

**MongoDB Atlas note:** Vercel's serverless functions don't have a static
outbound IP on the free tier, so Atlas's IP allowlist needs
`0.0.0.0/0` (Allow Access from Anywhere) added under Network Access, or
every database connection from the deployed server fails.

CI/CD runs via GitHub Actions:
- `.github/workflows/ci.yml` — lints and builds the client, and does an
  install + syntax check on the server, on every push/PR
- `.github/workflows/deploy.yml` — deploys both client and server to Vercel
  on every push to `main`. Needs six repo secrets: `VERCEL_CLIENT_TOKEN`,
  `VERCEL_CLIENT_ORG_ID`, `VERCEL_CLIENT_PROJECT_ID`, `VERCEL_SERVER_TOKEN`,
  `VERCEL_SERVER_ORG_ID`, `VERCEL_SERVER_PROJECT_ID` (the client and server
  are separate Vercel projects, so separate tokens/IDs — a single Vercel
  token works for both if you'd rather reuse one).

### A note on Sentry

`server/config/instrument.cjs` originally included `@sentry/profiling-node`
for CPU profiling. That package ships a platform-specific native binary
that Vercel's serverless bundler didn't include in the deployed function,
which crashed **every single request** with `Cannot find module
'./sentry_cpu_profiler-...'`. Profiling was removed entirely (basic Sentry
error tracking doesn't need it, and native-binary profiling doesn't fit
ephemeral serverless functions well regardless) - if you re-add it, budget
time to solve the bundling problem first.

## Project structure

```
Job_Portal/
├── client/
│   ├── src/
│   │   ├── pages/           # Home, ApplyJob, Application, AddJobs,
│   │   │                     Dashboard, ManageJobs, ViewApplications
│   │   ├── components/      # Navbar, Hero, JobListing, JobCard, etc.
│   │   └── context/          # AppContext - jobs list, search, auth state
│   └── vercel.json           # SPA rewrite for React Router
├── server/
│   ├── controller/webhook.js  # Clerk user.created/updated/deleted sync
│   ├── models/User.js
│   ├── config/db.js            # Mongoose connection
│   └── vercel.json              # legacy builds/routes config
└── .github/workflows/           # CI/CD
```

## License

ISC
