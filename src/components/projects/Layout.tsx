import Grid from '@material-ui/core/Grid';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Nav } from './Nav';
import { SiteTheme } from '../SiteTheme';
import { makeStyles } from '@material-ui/core/styles';

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
      <Nav />
      <Grid className={classes.root} container={!isPrint}>
        {children}
      </Grid>
    </SiteTheme>
  );
};
