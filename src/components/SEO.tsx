import React from 'react';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../hooks/useSiteMetadata';

export const SEO: React.FC = () => {
  const { title, description, lang } = useSiteMetadata();
  const meta = [
    {
      name: `description`,
      content: description
    },
    {
      property: `og:title`,
      content: title
    },
    {
      property: `og:description`,
      content: description
    },
    {
      property: `og:type`,
      content: `website`
    }
  ];

  return <Helmet htmlAttributes={{ lang }} title={title} titleTemplate={`%s | ${title}`} meta={meta} />;
};
