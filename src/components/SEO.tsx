import React from 'react';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../hooks/useSiteMetadata';

export const SEO: React.FC = () => {
  const { title, description, lang, avatar, siteName, siteUrl, image, email, jobTitle } = useSiteMetadata();
  const meta = [
    {
      name: 'description',
      content: description
    },
    {
      property: 'og:type',
      content: `website`
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:description',
      content: description
    },
    {
      property: 'og:url',
      content: siteUrl
    },
    {
      property: 'og:site_name',
      content: siteName
    },
    {
      property: 'og:image',
      content: image
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      property: 'twitter:description',
      content: description
    },
    {
      property: 'twitter:title',
      content: title
    },
    {
      property: 'twitter:image',
      content: image
    }
  ];

  return (
    <Helmet htmlAttributes={{ lang }} title={title} meta={meta}>
      <script type="application/ld+json">{`
        {
          "@context": "http://schema.org",
          "@type": "Person",
          "email": "mailto:${email}",
          "image": "${avatar}",
          "jobTitle": "${jobTitle}",
          "name": "${siteName}",
          "url": "${siteUrl}"
        }
    `}</script>
    </Helmet>
  );
};
