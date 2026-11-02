# Saul's Sub2API fork notes

Personal AI gateway based on [Wei-Shaw/sub2api](https://github.com/Wei-Shaw/sub2api). Goal: self-host a central OpenAI/Anthropic-compatible API for personal tools and X42 experiments, then deploy to Railway after local Docker is solid.

## Remotes

| Remote   | URL |
|----------|-----|
| `origin`   | `https://github.com/sdsaibot/sub2api.git` (this fork) |
| `upstream` | `https://github.com/Wei-Shaw/sub2api.git` (vendor) |

## Sync workflow

Keep personalizations merge-friendly:

```bash
git fetch upstream
git checkout main
git merge upstream/main   # or: git rebase upstream/main
# resolve conflicts, test locally, then:
git push origin main
```

Prefer short-lived feature branches for custom work (e.g. `feat/login-personal`). Avoid editing vendor core blindly when a thin wrapper or config/env change will do — that keeps `git merge upstream/main` easier.

## Local Docker (Mac mini)

From `deploy/`:

```bash
# secrets already in deploy/.env (gitignored); recreate with docker-deploy.sh pattern if needed
docker compose -f docker-compose.local.yml up -d
docker compose -f docker-compose.local.yml logs -f sub2api
# UI: http://localhost:8080
# First-run admin password (if ADMIN_PASSWORD unset): grep logs for "Generated admin"
```

Do **not** commit `deploy/.env`, `data/`, `postgres_data/`, or `redis_data/`.

## Customizations (later)

- Login / branding / personal auth: keep in clearly named files or a dedicated branch so upstream merges stay reviewable.
- Upstream API credentials: **official API keys only** for personal/learning use. Do not wire subscription OAuth carpool accounts.

## Railway (after local OK)

Deploy from this fork (Dockerfile / Compose), attach Railway Postgres + Redis, inject the same class of secrets via Railway env vars (never bake into the image). Local Compose remains the smoke-test path before each Railway push.

## X42 note

Treat Sub2API as a **design reference** for a personal gateway. X42's verifiable relay work stays separate; do not fork Sub2 into the X42 monorepo.
