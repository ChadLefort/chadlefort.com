import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { SiteTheme } from './SiteTheme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    nav: {
      flexGrow: 1
    },
    button: {
      padding: theme.spacing(2),
      height: '100%'
    },
    formLabel: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  })
);

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <SiteTheme>
      <AppBar position="static">
        <Toolbar></Toolbar>
      </AppBar>
      <Grid container justify="center" alignContent="center" className={classes.root}>
        {children}
      </Grid>
    </SiteTheme>
  );
};
