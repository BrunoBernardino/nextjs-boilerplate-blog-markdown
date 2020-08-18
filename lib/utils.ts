import fs from 'fs';
import path from 'path';
import remark from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';

import * as T from './types';

type MarkdownToHtml = (markdown: string) => Promise<string>;
type GetArticleSlugs = () => string[];
type GetArticleBySlug = (slug: string, fields: string[]) => T.Article;
type GetAllArticles = (fields: string[]) => T.Article[];

export const markdownToHtml: MarkdownToHtml = async (markdown) => {
  const result = await remark().use(html).process(markdown);
  return result.toString();
};

const getArticleSlugs: GetArticleSlugs = () => {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  return fs.readdirSync(articlesDirectory);
};

export const getArticleBySlug: GetArticleBySlug = (slug, fields) => {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(articlesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const article: T.Article = {};

  fields.forEach((field) => {
    if (field === 'slug') {
      article[field] = realSlug;
    }

    if (field === 'content') {
      article[field] = content;
    }

    if (data[field]) {
      article[field] = data[field];
    }
  });

  return article;
};

export const getAllArticles: GetAllArticles = (fields) => {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug, fields))
    .sort((article1, article2) => {
      if (article1.date > article2.date) {
        return -1;
      }
      if (article1.date < article2.date) {
        return 1;
      }
      return 0;
    });
  return articles;
};
