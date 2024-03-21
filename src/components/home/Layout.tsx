import Grid from '@material-ui/core/Grid';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Nav } from './Nav';
import { SiteTheme } from '../SiteTheme';

export const Layout: React.FC = ({ children }) => {
  const isPrint = useMediaQuery('print');

  return (
    <SiteTheme>
      <Nav />
      <Grid container={!isPrint}>{children}</Grid>
    </SiteTheme>
  );
};
