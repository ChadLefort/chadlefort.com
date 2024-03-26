import React from 'react';

import { AboutMe } from '../components/home/AboutMe';
import { Contact } from '../components/home/Contact';
import { Education } from '../components/home/Education';
import { Header } from '../components/home/Header';
import { JobExperience } from '../components/home/JobExperience';
import { Layout } from '../components/home/Layout';
import { PrintHeader } from '../components/home/PrintHeader';
import { Skills } from '../components/home/Skills';
import { HeadContent } from '../components/Head';

export function Head() {
  return <HeadContent />;
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
