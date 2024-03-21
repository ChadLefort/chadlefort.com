import React from 'react';
import { Layout } from '../../components/projects/Layout';
import { ModuleFederation } from '../../components/projects/ModuleFederation';
import { HeadContent } from '../../components/Head';

export function Head() {
  return <HeadContent />;
}

const ModuleFederationPage: React.FC = () => {
  return (
    <Layout>
      <ModuleFederation />
    </Layout>
  );
};

export default ModuleFederationPage;
