import React from 'react';
import { AboutMe } from '../components/AboutMe';
import { Contact } from '../components/Contact';
import { Education } from '../components/Education';
import { Header } from '../components/Header';
import { JobExperience } from '../components/JobExperience';
import { Layout } from '../components/Layout';
import { PrintHeader } from '../components/PrintHeader';
import { SEO } from '../components/SEO';
import { Skills } from '../components/Skills';

const Home: React.FC = () => {
  return (
    <Layout>
      <SEO />
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
