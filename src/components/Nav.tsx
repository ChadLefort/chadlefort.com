import animateScroll from 'react-scroll/modules/mixins/animate-scroll';
import AppBar from '@material-ui/core/AppBar';
import ArrowUpIcon from 'mdi-material-ui/ArrowUpBold';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import HamburgerIcon from 'mdi-material-ui/Hamburger';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import LightbulbOffIcon from 'mdi-material-ui/LightbulbOff';
import LightbulbOnIcon from 'mdi-material-ui/LightbulbOn';
import React, { useContext, useEffect, useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { Logo } from './Logo';
import { ThemeContext } from './SiteTheme';
import { useScreenSize } from '../hooks/useScreenSize';

const useStyles = makeStyles((theme: Theme) => ({
  offset: theme.mixins.toolbar,
  root: {
    '@media print': {
      display: 'none'
    }
  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between'
    }
  },
  linksOffset: {
    marginLeft: 51.19
  },
  scrollToTop: {
    fontSize: '1.875rem',
    boxShadow: 'none',
    position: 'fixed',
    bottom: 30,
    right: 30
  },
  icon: {
    fontSize: '1.7rem'
  },
  themeIconButton: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    padding: theme.spacing(1)
  }
}));

const ToggleThemeButton: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const classes = useStyles();
  const { isSmallDown } = useScreenSize();
  const oppositeTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <IconButton color={theme === 'dark' || isSmallDown ? 'default' : 'inherit'} aria-label={`turn on ${oppositeTheme} mode`} onClick={toggleTheme}>
      {theme === 'dark' ? <LightbulbOnIcon className={classes.icon} /> : <LightbulbOffIcon className={classes.icon} />}
    </IconButton>
  );
};

export type ToggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;

type Props = {
  LinkLogo?: React.ComponentType;
  AppBarLinks: React.ComponentType;
  DrawerList: React.ComponentType<{ toggleDrawer: ToggleDrawer }>;
};

export const Nav: React.FC<Props> = ({ LinkLogo, AppBarLinks, DrawerList }) => {
  const classes = useStyles();
  const duration = 500;
  const [drawer, setDrawer] = useState(false);
  const [atTopOfPage, setAtTopOfPage] = useState(true);
  const { isSmallDown, isPrint } = useScreenSize();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    setDrawer(open);
  };

  const scrollToTop = () => {
    animateScroll.scrollToTop({ duration });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset !== 0) {
        setAtTopOfPage(false);
      } else {
        setAtTopOfPage(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box className={classes.root}>
      <AppBar position="fixed" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Hidden smDown>
            <Grid container justifyContent="center">
              <Grid item className={classes.linksOffset}>
                <AppBarLinks />
              </Grid>
            </Grid>
            <ToggleThemeButton />
          </Hidden>
          <Hidden mdUp>
            {LinkLogo ? (
              <LinkLogo />
            ) : (
              <Box onClick={scrollToTop}>
                <Logo variant="h4" />
              </Box>
            )}
            <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={toggleDrawer(true)}>
              <HamburgerIcon className={classes.icon} />
            </IconButton>
            <Drawer anchor="right" open={drawer} onClose={toggleDrawer(false)}>
              <DrawerList toggleDrawer={toggleDrawer} />
              <Box className={classes.themeIconButton}>
                <ToggleThemeButton />
              </Box>
            </Drawer>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Box className={classes.offset} />
      <Fab
        color="primary"
        aria-label="scroll-to-top"
        onClick={scrollToTop}
        className={classes.scrollToTop}
        style={atTopOfPage || isPrint || isSmallDown ? { display: 'none' } : { display: 'block' }}
      >
        <ArrowUpIcon />
      </Fab>
    </Box>
  );
};
