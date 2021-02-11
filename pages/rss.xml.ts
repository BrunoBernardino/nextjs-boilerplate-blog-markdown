import { GetServerSideProps } from 'next';
import { Feed } from 'feed';
import moment from 'moment';

import { getAllArticles } from 'lib/utils';
import { defaultTitle, defaultDescription } from 'lib/constants';
import * as T from 'lib/types';

type BuildFeed = (items: T.Article[]) => any;

const hostUrl = process.env.API_URL;

const buildFeed: BuildFeed = (items) => {
  const feed = new Feed({
    id: hostUrl,
    link: hostUrl,
    title: defaultTitle,
    description: defaultDescription,
    copyright: "These are mine, but you're welcome to share them.",
    updated: moment(items[0].date, 'YYYY-MM-DD').toDate(),
    author: {
      name: 'Bruno Bernardino',
      link: hostUrl,
    },
  });

  items.forEach((item: T.Article) => {
    feed.addItem({
      title: item.title,
      link: `${hostUrl}/article/${item.slug}`,
      description: item.summary,
      date: moment(item.date, 'YYYY-MM-DD').toDate(),
    });
  });

  return feed;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context && context.res) {
    const { res } = context;

    const articles = getAllArticles(['slug', 'date', 'title', 'summary']);

    const feed = buildFeed(articles);
    res.setHeader('content-type', 'text/xml');
    res.write(feed.rss2());
    res.end();
  }

  return {
    props: {},
  };
};

const RssPage = () => null;

export default RssPage;
