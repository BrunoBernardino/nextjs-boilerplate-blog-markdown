const fs = require('fs');
const path = require('path');
const globby = require('globby');

const libPagesFilePath = path.join(__dirname, '..', 'lib', 'pages.json');

(async () => {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'pages/**/*{.ts,.tsx,.js,.jsx}',
    '!pages/_*.tsx',
    '!pages/api',
    '!pages/rss.xml.ts',
    '!pages/sitemap.xml.ts',
    '!pages/article/[slug].tsx', // exclude dynamic route
  ]);

  const slugs = [];

  pages.forEach((page) => {
    const filePath = page
      .replace('pages', '')
      .replace('.tsx', '')
      .replace('.ts', '');
    const slug = filePath === '/index' ? '' : filePath;

    slugs.push(slug);
  });

  fs.writeFileSync(libPagesFilePath, JSON.stringify(slugs, null, 2), {
    encoding: 'utf-8',
  });

  console.log(`Built ${libPagesFilePath}!`);

  process.exit(0);
})();
