import React from 'react';

import { Layout } from '../../components/projects/Layout';
import { Lerna } from '../../components/projects/Lerna';
import { HeadContent } from '../../components/Head';

export function Head() {
  return <HeadContent />;
}

const LernaPage: React.FC = () => {
  return (
    <Layout>
      <Lerna />
    </Layout>
  );
};

export default LernaPage;
