import React from 'react';

import { Layout } from '../../components/projects/Layout';
import { SpearCart } from '../../components/projects/SpearCart';
import { HeadContent } from '../../components/Head';

export function Head() {
  return <HeadContent />;
}

const SpearCartPage: React.FC = () => {
  return (
    <Layout>
      <SpearCart />
    </Layout>
  );
};

export default SpearCartPage;
