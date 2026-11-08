# Rohit Gupta — Portfolio

Next.js 15 + Tailwind CSS + Three.js (React Three Fiber). Builds to a static site.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Edit content

Everything (projects, skills, education, services, links) is in **`src/data/site.ts`**.

- Add your GitHub / LinkedIn / LeetCode / Fiverr / Upwork URLs in `profile.links`. Empty links stay hidden.
- Resume: put `resume.pdf` in `public/` and set `resume: "/resume.pdf"`. The download buttons then appear.
- Project links: add `links: [{ label: "GitHub", href: "https://..." }]` to any project.
- Photo: `public/rohit.webp` (transparent background).

## Deploy free on Vercel

1. Push this folder to a GitHub repo.
2. Go to https://vercel.com, sign in with GitHub, click **Add New → Project**, pick the repo.
3. Keep the defaults and click **Deploy**.
4. In Project → Settings → Domains you can rename it to something like `rohitgupta.vercel.app`.

Every push to GitHub redeploys the site automatically.
