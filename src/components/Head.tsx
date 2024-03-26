import React from 'react';

import { useSiteMetadata } from '../hooks/useSiteMetadata';

export const HeadContent: React.FC = () => {
  const { title, description, lang, avatar, siteName, siteUrl, image, email, jobTitle } = useSiteMetadata();

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={lang} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
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
    </>
  );
};
