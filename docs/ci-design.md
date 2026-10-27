# CI design

Workflow: `.github/workflows/ci.yml` (name: CI)

- Triggers: every `pull_request`, and `push` to `main`.
- Permissions: `contents: read`. No secrets used.
- Runtime: Node 22 (LTS) via `actions/setup-node` with npm cache; `npm ci`.

| Job (check name) | Steps |
|---|---|
| `lint` | `npm ci`, `npm run lint` (eslint) |
| `test` | `npm ci`, `npm test` (vitest component test + node:test API test), `npm run build` |

Deploys are out of scope for CI (Vercel Git integration handles those).
