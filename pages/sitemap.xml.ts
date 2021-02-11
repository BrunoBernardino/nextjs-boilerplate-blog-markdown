import { GetServerSideProps } from 'next';
import { SitemapStream, streamToPromise } from 'sitemap';

import { getAllArticles } from 'lib/utils';
import * as T from 'lib/types';
import pages from 'lib/pages.json';

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context && context.res) {
    const { res } = context;

    const articles = getAllArticles(['slug', 'date']);

    const sitemap = await buildSitemap(articles);

    res.setHeader('content-type', 'text/xml');
    res.write(sitemap.toString());
    res.end();
  }

  return {
    props: {},
  };
};

const SitemapPage = () => null;

export default SitemapPage;
