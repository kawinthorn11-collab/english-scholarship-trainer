# GitHub Pages Deploy

Public site:

https://kawinthorn11-collab.github.io/english-scholarship-trainer/

## What Deploys The Site

The workflow at `.github/workflows/deploy-pages.yml` runs on every push to `main`.

It installs dependencies with `npm ci`, builds the Vite app, uploads `dist`, and deploys it through GitHub Pages.

## Update The Site Later

On Windows, double-click `deploy-github-pages.bat`.

The helper runs lint, data validation and the build, commits the project files, and pushes to `origin main`.

The site is fully static: there is no login, database or API key to configure.

## Blank Page Troubleshooting

Check that `vite.config.js` contains:

```js
base: '/english-scholarship-trainer/'
```

Then rebuild and push again.

## Links And Refresh

Pages use hash links such as `#/exam/setM?q=5` and `#/grammar/conjunction`, so refreshing never hits a GitHub Pages 404.
`public/404.html` sends old links from the previous version of the site back to the home page.

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
