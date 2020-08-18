import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import styled from 'styled-components';

import Layout from 'components/Layout';
import { defaultTitle, defaultKeywords, css } from 'lib/constants';
import { getArticleBySlug, getAllArticles, markdownToHtml } from 'lib/utils';
import * as T from 'lib/types';

import 'styles/article.scss';

type ArticleProps = {
  article: T.Article;
};

const Title = styled.h1`
  font-size: 3rem;
  line-height: 4rem;
  margin-bottom: 2rem;
  font-weight: 500;
  text-align: center;
`;

const Author = styled.section`
  border-top: 2px solid ${css.pink};
  border-bottom: 2px solid ${css.pink};
  margin: 1rem auto 3rem;
  padding: 1rem 2rem;
  text-align: center;

  img {
    margin: 0 auto 1rem;
    display: block;
    max-width: 100px;
  }

  span {
    margin: 0 auto;
    display: block;
    font-weight: 500;
    color: ${css.purple};
  }
`;

const Cover = styled.img`
  margin: 1rem auto 3rem;
  display: block;
  max-width: 100%;
`;

const ArticleContent = styled.article`
  p {
    font-size: 1rem;
    line-height: 1.7rem;
    margin-bottom: 1rem;

    strong {
      font-weight: bold;
    }

    em {
      font-style: italic;
    }
  }

  blockquote {
    margin: 0;
    padding: 0 0 0 1.3rem;
    line-height: 1.5rem;
    color: ${css.textGray};
    font-style: italic;
    border-left: 0.3rem solid ${css.textGray};
  }

  code {
    display: inline-block;
    font-family: 'Lucida Console', Monaco, monospace;
    font-size: 0.9rem;
    line-height: 1.5rem;
    padding: 0.1rem 0.5rem;
    background: rgba(0, 0, 0, 0.2);
  }

  pre {
    font-family: 'Lucida Console', Monaco, monospace;
    font-size: 1rem;
    line-height: 1.5rem;
    width: calc(100% - 2rem);
    padding: 1rem;
    margin: 0 0 1.61rem;
    overflow: auto;
    overflow-y: hidden;
    background: rgba(0, 0, 0, 0.2);
    white-space: pre;

    & code {
      background: transparent;
      padding: 0;
    }
  }

  hr {
    border: none;
    background: ${css.textGray};
    height: 1px;
    display: block;
    margin: 0 0 1.61rem;
  }

  ul {
    list-style-type: disc;
    list-style-position: inside;
    margin-bottom: 1.61rem;
  }

  ol {
    list-style-type: decimal;
    list-style-position: inside;
    margin-bottom: 1.61rem;
  }

  ul li,
  ol li {
    line-height: 1.5rem;
  }
`;

const Article = ({ article }: ArticleProps) => {
  const router = useRouter();
  if (!router.isFallback && !article?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  const layoutProps = {
    title: `${article.title} | ${defaultTitle}`,
    description: article.summary,
    image: article.coverImage,
    keywords: defaultKeywords,
  };
  return (
    <Layout {...layoutProps}>
      <div className="article common">
        <section className="article__section">
          {router.isFallback ? (
            <Title>Loading…</Title>
          ) : (
            <>
              <Title>{article.title}</Title>
              <Cover src={article.coverImage} alt="Cover Image" />
              <Author>
                <img src={article.author.image} alt={article.author.name} />
                <span>{article.author.name}</span>
              </Author>
              <ArticleContent
                data-test="article-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Article;

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const article = getArticleBySlug(params.slug, [
    'slug',
    'title',
    'date',
    'summary',
    'coverImage',
    'author',
    'content',
  ]);
  const content = await markdownToHtml(article.content || '');

  return {
    props: {
      article: {
        ...article,
        content,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = getAllArticles(['slug']);

  return {
    paths: articles.map(({ slug }) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
};
