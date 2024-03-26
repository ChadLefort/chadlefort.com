import Grid from '@material-ui/core/Grid';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

import { ProjectsNav } from './Nav';
import { SiteTheme } from '../SiteTheme';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  }
}));

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  const isPrint = useMediaQuery('print');

  return (
    <SiteTheme>
      <ProjectsNav />
      <Grid className={classes.root} container={!isPrint}>
        {children}
      </Grid>
    </SiteTheme>
  );
};
