# GitHub Pages Deploy

Public site:

https://kawinthorn11.github.io/english-scholarship-trainer/

## What Deploys The Site

The workflow at `.github/workflows/deploy-pages.yml` runs on every push to `main`.

It installs dependencies with `npm ci`, builds the Vite app, uploads `dist`, and deploys it through GitHub Pages.

## Update The Site Later

On Windows, double-click `deploy-github-pages.bat`.

The helper runs the build, validations, lint, commits safe project files, and pushes to `origin main`.

Never commit `.env.local`, `.env`, Supabase service role keys, Stripe secrets, or any private API key.

## Blank Page Troubleshooting

Check that `vite.config.js` contains:

```js
base: '/english-scholarship-trainer/'
```

Then rebuild and push again.

## 404 On Refresh Troubleshooting

This project includes `public/404.html`, which redirects GitHub Pages deep links back into the app.

If refreshing `/academy` or `/grammar` gives a 404, confirm `public/404.html` exists and the latest workflow deployed successfully.

## CSS Or Asset Troubleshooting

Missing CSS usually means the base path is wrong or an old deployment is cached.

Run:

```bash
npm run build
git push
```

Then wait for the GitHub Pages workflow to finish.

## Custom Domain Later

In GitHub:

Settings -> Pages -> Custom domain

Add the domain there, then configure DNS with your domain provider. Do not add custom domain settings until the default GitHub Pages URL works first.
