import React from 'react';
import { AboutMe } from '../components/AboutMe';
import { Contact } from '../components/Contact';
import { Education } from '../components/Education';
import { Header } from '../components/Header';
import { JobExperience } from '../components/JobExperience';
import { Layout } from '../components/Layout';
import { PrintHeader } from '../components/PrintHeader';
import { Skills } from '../components/Skills';
import { useSiteMetadata } from '../hooks/useSiteMetadata';

export function Head() {
  const { title, description, lang, avatar, siteName, siteUrl, image, email, jobTitle } = useSiteMetadata();

  return (
    <>
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
}

const Home: React.FC = () => {
  return (
    <Layout>
      <PrintHeader />
      <Header />
      <JobExperience />
      <Skills />
      <Education />
      <AboutMe />
      <Contact />
    </Layout>
  );
};

export default Home;
