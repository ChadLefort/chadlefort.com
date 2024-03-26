import React from 'react';

import { Layout } from '../components/projects/Layout';
import Home from '../components/projects/Home';
import { HeadContent } from '../components/Head';

export function Head() {
  return <HeadContent />;
}

const ProjectsPage: React.FC = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default ProjectsPage;
