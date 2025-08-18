## promptly-web-revamp

### Quick start
```bash
npm i
npm run dev
```

### Environment
Create `.env` (copy `.env.example`) and set:
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### Routing on Cloudflare Pages
SPA routing is configured via `public/_redirects`:
```
/*  /index.html  200
```

### SEO
- `public/robots.txt`, `public/sitemap.xml`
- Set your canonical domain and OG image in `index.html`

### DX
- Prettier + lint-staged + Husky (`npm run prepare`) for pre-commit formatting

### Security
- See `supabase/migrations/20250817_rls_template.sql` and enable RLS/policies for your tables before launch.
