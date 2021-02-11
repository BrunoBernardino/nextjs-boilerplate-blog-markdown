import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import styled from 'styled-components';

import Layout from 'components/Layout';
import {
  defaultTitle,
  defaultDescription,
  defaultKeywords,
} from 'lib/constants';
import { getAllArticles } from 'lib/utils';
import * as T from 'lib/types';

import 'styles/index.scss';

type IndexPageProps = {
  articles: T.Article[];
};

const layoutProps = {
  title: defaultTitle,
  description: defaultDescription,
  keywords: defaultKeywords,
};

const Title = styled.h1.attrs({
  className: 'main__title',
})``;

const SubTitle = styled.h3.attrs({
  className: 'main__subtitle',
})``;

const Paragraph = styled.p.attrs({
  className: 'main__description',
})``;

const IndexPage = ({ articles }: IndexPageProps) => {
  return (
    <Layout {...layoutProps}>
      <div className="main common">
        <section className="main__section">
          <Title>Welcome to a Static Markdown Blog Next.js Boilerplate!</Title>
          <Paragraph>
            This is a static markdown blog boilerplate for Next.js, with
            TypeScript, SASS/SCSS, Styled Components, Jest, ESLint, Prettier,
            and deployed with Serverless.
          </Paragraph>
          <Paragraph>
            It uses remark, remark-html, and gray-matter to parse Markdown into
            metadata and HTML.
          </Paragraph>
          <Paragraph>Below is a list of articles.</Paragraph>
          <div className="main__article-list">
            {articles.length === 0 ? (
              <SubTitle>Loading...</SubTitle>
            ) : (
              articles.map((article) => {
                return (
                  <div className="main__article-list__item" key={article.slug}>
                    <Link href={`/article/${article.slug}`}>
                      <a data-test="article-title">
                        <SubTitle>{article.title}</SubTitle>
                      </a>
                    </Link>
                    <Paragraph>{article.summary}</Paragraph>
                    <Link href={`/article/${article.slug}`}>
                      <a>Read more →</a>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const articles = getAllArticles(['slug', 'title', 'date', 'summary']);

  return {
    props: {
      articles,
    },
  };
};

export default IndexPage;
