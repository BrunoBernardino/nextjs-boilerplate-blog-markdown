import { SitemapStream, streamToPromise } from 'sitemap';
import { NowRequest, NowResponse } from '@now/node';
import dotenv from 'dotenv';

dotenv.config();

import { getAllArticles } from '../lib/utils';
import * as T from '../lib/types';
import pages from './pages.json';

type BuildSitemap = (items: T.Article[]) => Promise<any>;

const hostUrl = process.env.API_URL;

const buildSitemap: BuildSitemap = (items) => {
  const sitemap = new SitemapStream({
    hostname: hostUrl,
  });

  pages.forEach((page) => {
    sitemap.write({
      url: `${hostUrl}${page}`,
      lastmodISO: new Date().toISOString(),
      priority: page === '' ? 1 : 0.7,
    });
  });

  items.forEach((item) => {
    sitemap.write({
      url: `${hostUrl}/article/${item.slug}`,
      lastmodISO: new Date(item.date).toISOString(),
      priority: 0.8,
    });
  });

  sitemap.end();

  return streamToPromise(sitemap);
};

// @ts-ignore
export default async (req: NowRequest, res: NowResponse) => {
  const articles = getAllArticles(['slug', 'date']);

  const sitemap = await buildSitemap(articles);

  res.setHeader('content-type', 'application/xml');
  res.status(200).send(sitemap.toString());
};
