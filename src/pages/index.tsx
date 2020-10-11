import React from 'react';
import { AboutMe } from '../components/AboutMe';
import { Contact } from '../components/Contact';
import { Education } from '../components/Education';
import { Header } from '../components/Header';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { SiteTimeline } from '../components/Timeline';
import { Skills } from '../components/Skills';

const Home: React.FC = () => {
  return (
    <Layout>
      <SEO />
      <Header />
      <SiteTimeline />
      <Skills />
      <Education />
      <AboutMe />
      <Contact />
    </Layout>
  );
};

export default Home;
