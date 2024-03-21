import React from 'react';
import { Layout } from '../../components/projects/Layout';
import { SpearDashboard } from '../../components/projects/SpearDashboard';
import { HeadContent } from '../../components/Head';

export function Head() {
  return <HeadContent />;
}

const SpearDashboardPage: React.FC = () => {
  return (
    <Layout>
      <SpearDashboard />
    </Layout>
  );
};

export default SpearDashboardPage;
