# Markdown Blog Next.js Boilerplate

[![](https://github.com/BrunoBernardino/nextjs-boilerplate-blog-markdown/workflows/Run%20Tests/badge.svg)](https://github.com/BrunoBernardino/nextjs-boilerplate-blog-markdown/actions?workflow=Run+Tests)

Markdown blog boilerplate for [Next.js](https://nextjs.org), with [TypeScript](https://www.typescriptlang.org), [SASS/SCSS](https://sass-lang.com), [Styled Components](https://styled-components.com), [Jest](https://jestjs.io), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), and deployed with [Vercel](https://vercel.com).

Markdown is rendered via [`remark`](https://remark.js.org/) and [`remark-html`](https://github.com/remarkjs/remark-html), with the Markdown metadata handled via [`gray-matter`](https://github.com/jonschlinkert/gray-matter).

Also supports imports with absolute paths.

It runs UI tests with [Cypress](https://cypress.io), for which I'd recommend only testing "critical" aspects of the app, as these tests are harder to maintain than the other unit tests, but these can catch many other things.

All pages are statically generated, meaning they'll be built via server for the first time they're requested (akin to SSR), but the subsequent requests will be as if a pre-rendered static page, incredibly fast (while still being updated after the initial load). This is good for SEO and also for showing up-to-date pages to clients quickly.

Demo at [markdown-blog-nextjs-boilerplate.brn.sh](https://markdown-blog-nextjs-boilerplate.brn.sh).

See more boilerplates at [nextjs-boilerplates.brn.sh](https://nextjs-boilerplates.brn.sh).

## Development

```bash
make install # installs dependencies
make start # starts the app
make pretty # prettifies the code
make test # runs linting and tests (including UI tests via cypress)
make test/update # runs tests, updating snapshots
make test/cypress # opens cypress to manually run/watch tests (easier for writing and testing/updating them)
make deploy # deploys to markdown-blog-nextjs-boilerplate.brn.sh (requires `vercel` to be installed globally)
```

## TODOs

Here are some things you will likely want to change before "publishing" this, or after cloning it:

- [ ] Analytics code (`usefathom.com`) and `theme-color` in `pages/_document.tsx`
- [ ] Name, repository, author, and version in `package.json`
- [ ] Values in `lib/constants.ts` and `styles/__variables.scss`
- [ ] Scope, alias, and env values in `vercel.json`
- [ ] Values in `.env.sample`
- [ ] Title, description, and links in this `README.md` file
- [ ] URL in `public/robots.txt`
- [ ] test/remove `pages/api/v0/test-sitemap-lambda.ts` (easy way to test the sitemap locally, by visiting http://localhost:3000/api/v0/test-sitemap-lambda)
