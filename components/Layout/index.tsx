import React, { useState } from 'react';
import Head from 'next/head';
import { Helmet } from 'react-helmet';

import Loading from 'components/Loading';
import Header from './Header';
import Footer from './Footer';

type LoadingContextValue = {
  showLoading: () => void;
  hideLoading: () => void;
};

const loadingContextDefault: LoadingContextValue = {
  showLoading: () => {},
  hideLoading: () => {},
};

export const LoadingContext = React.createContext(loadingContextDefault);

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
};

const Layout = ({
  children,
  title,
  description,
  keywords,
  image,
}: LayoutProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const metaTags = [
    { property: 'og:title', content: title },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content: keywords,
    },
  ];

  if (image) {
    metaTags.push({ property: 'og:image', content: image });
  }

  const SEOOverride =
    title && description ? <Helmet title={title} meta={metaTags} /> : null;

  const loadingContextValue: LoadingContextValue = {
    showLoading: () => setIsLoading(true),
    hideLoading: () => setIsLoading(false),
  };

  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        {title && <meta property="og:title" content={title} />}
        {image && <meta property="og:image" content={image} />}
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
      </Head>
      {SEOOverride}
      <Loading isShowing={isLoading} />
      <div className="wrapper">
        <Header />
        <LoadingContext.Provider value={loadingContextValue}>
          {children}
        </LoadingContext.Provider>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
