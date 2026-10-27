# vercel-vite-react-api-demo

Vite + React frontend with a Node serverless API (`/api/hello`), built as a quick Vercel deployment learning example.

## What this is

- Vite + React + TypeScript frontend (`src/`) that fetches `/api/hello` and renders the response, plus `VITE_APP_NAME` as the page heading.
- `api/hello.js`: a Vercel Node Serverless Function returning `{ message, time }`. `message` comes from env var `GREETING` (default `Hello from the Vercel API`).
- CI (`.github/workflows/ci.yml`, design in `docs/ci-design.md`): jobs `lint` and `test` (tests + build) on every pull request and push to `main`.

## Prerequisites

- Node.js >= 22 (LTS) and npm
- Optional: Vercel CLI (`npm i -g vercel`) for running the API locally

## Local dev

```sh
npm i
cp .env.example .env.local   # optional; set VITE_APP_NAME / GREETING
npm run dev                  # Vite only: frontend; /api/hello will 404
vercel dev                   # frontend + API together (needs Vercel CLI)
```

`npm run dev` serves only the frontend; use `vercel dev` to have `/api/hello` work.

Scripts: `npm run lint`, `npm test`, `npm run build`.

## Run manually

Commands below were executed in this repo; output is real (trimmed).

```sh
npm run lint
```
```
> eslint .
```
(no further output = no problems)

```sh
npm test
```
```
 Test Files  1 passed (1)
      Tests  2 passed (2)
...
# tests 2
# pass 2
# fail 0
```

```sh
npm run build
```
```
> tsc -b && vite build
vite v8.3.5 building client environment for production...
✓ 15 modules transformed.
dist/index.html                  0.34 kB │ gzip:  0.24 kB
dist/assets/index-D-5tJ_Nc.js  220.04 kB │ gzip: 68.83 kB
✓ built in 61ms
```

Calling the API handler directly with a stub response object (a small script, `run.mjs`, importing `api/hello.js`; `vercel dev` was NOT run):

```
$ node run.mjs
status 200
{"message":"Hello from the Vercel API","time":"2026-10-27T13:32:34.029Z"}
$ GREETING="Hi from env" node run.mjs
status 200
{"message":"Hi from env","time":"2026-10-27T13:32:34.054Z"}
```

## Deploying to Vercel

> **Not yet executed.** These are the planned steps.

1. In Vercel, **Add New → Project** and import this GitHub repo.
2. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`. (`api/` is detected automatically; no `vercel.json` needed.)
3. Environment variables (set for both **Preview** and **Production**): `VITE_APP_NAME`, `GREETING`. `VITE_*` vars are baked in at build time, so redeploy after changing them.
4. Preview vs production: every PR/branch push gets a Preview deployment URL; pushes to `main` deploy to Production.
5. Rollback: in the project's Deployments tab, pick a previous good production deployment and choose **Instant Rollback** / **Promote to Production**.
