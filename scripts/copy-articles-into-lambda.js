const fs = require('fs-extra');
const path = require('path');

const articlesDirPath = path.join(__dirname, '..', 'articles');

const lambdaArticlesDirPath = path.join(
  __dirname,
  '..',
  '.serverless_nextjs',
  'default-lambda',
  'articles',
);

fs.copySync(articlesDirPath, lambdaArticlesDirPath, { recursive: true });

console.log(
  `Copied articles directory from ${articlesDirPath} to ${lambdaArticlesDirPath}!`,
);
