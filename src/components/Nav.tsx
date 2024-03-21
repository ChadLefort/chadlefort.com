import AccountIcon from 'mdi-material-ui/Account';
import animateScroll from 'react-scroll/modules/mixins/animate-scroll';
import AppBar from '@material-ui/core/AppBar';
import ArrowUpIcon from 'mdi-material-ui/ArrowUpBold';
import Box from '@material-ui/core/Box';
import CodeJsonIcon from 'mdi-material-ui/CodeJson';
import Drawer from '@material-ui/core/Drawer';
import EmailIcon from 'mdi-material-ui/Email';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import HamburgerIcon from 'mdi-material-ui/Hamburger';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import LightbulbOffIcon from 'mdi-material-ui/LightbulbOff';
import LightbulbOnIcon from 'mdi-material-ui/LightbulbOn';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NoteIcon from 'mdi-material-ui/Note';
import React, { useContext, useEffect, useState } from 'react';
import SchoolIcon from 'mdi-material-ui/School';
import scroller from 'react-scroll/modules/mixins/scroller';
import Toolbar from '@material-ui/core/Toolbar';
import { Logo } from './Logo';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ThemeContext } from './SiteTheme';
import { useScreenSize } from '../hooks/useScreenSize';
import { Link as GatsbyLink } from 'gatsby';
import ApplicationBracesIcon from 'mdi-material-ui/ApplicationBraces';
import Button from '@material-ui/core/Button';

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
  list: {
    width: 250
  },
  listItem: {
    fontWeight: 600
  },
  link: {
    cursor: 'pointer',
    margin: theme.spacing(0, 2),
    fontWeight: 600
  },
  gatsbyLinkNav: {
    textDecoration: 'none',
    color: theme.palette.common.white,
    margin: theme.spacing(0, 2),
    fontWeight: 600,
    verticalAlign: 'middle'
  },
  gatsbyLinkDrawer: {
    padding: 0,
    width: '100%'
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

export const Nav: React.FC = () => {
  const classes = useStyles();
  const deskTopOffset = -64;
  const duration = 500;
  const smooth = 'easeInOutQuart';
  const [drawer, setDrawer] = useState(false);
  const [atTopOfPage, setAtTopOfPage] = useState(true);
  const { isSmallDown, isPrint } = useScreenSize();

  const scrollToSection = (section: string) => (_event: React.KeyboardEvent | React.MouseEvent) => {
    scroller.scrollTo(section, {
      duration,
      smooth,
      offset: isSmallDown ? -56 : deskTopOffset
    });
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    setDrawer(open);
  };

  const links = [
    { to: 'job-experience', label: 'Job Experience', icon: NoteIcon },
    { to: 'skills', label: 'Skills', icon: CodeJsonIcon },
    { to: 'education', label: 'Education', icon: SchoolIcon },
    { to: 'about-me', label: 'About Me', icon: AccountIcon },
    { to: 'contact', label: 'Contact', icon: EmailIcon }
  ];

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

  const list = () => (
    <div className={classes.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {links.map(({ to, label, icon }, index) => {
          const Icon = icon;
          return (
            <ListItem button key={index} onClick={scrollToSection(to)}>
              <ListItemIcon>
                <Icon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={label} classes={{ primary: classes.listItem }} />
            </ListItem>
          );
        })}
        <Button component={GatsbyLink} to="/projects" className={classes.gatsbyLinkDrawer}>
          <ListItem>
            <ListItemIcon>
              <ApplicationBracesIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Projects" classes={{ primary: classes.listItem }} />
          </ListItem>
        </Button>
      </List>
    </div>
  );

  return (
    <Box className={classes.root}>
      <AppBar position="fixed" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Hidden smDown>
            <Grid container justifyContent="center">
              <Grid item className={classes.linksOffset}>
                {links.map(({ to, label }, index) => (
                  <Link key={index} component="button" variant="body2" onClick={scrollToSection(to)} className={classes.link} color="inherit" underline="none">
                    {label}
                  </Link>
                ))}
                <GatsbyLink to="/projects" className={classes.gatsbyLinkNav}>
                  Projects
                </GatsbyLink>
              </Grid>
            </Grid>
            <ToggleThemeButton />
          </Hidden>
          <Hidden mdUp>
            <Box onClick={scrollToTop}>
              <Logo variant="h4" />
            </Box>
            <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={toggleDrawer(true)}>
              <HamburgerIcon className={classes.icon} />
            </IconButton>
            <Drawer anchor="right" open={drawer} onClose={toggleDrawer(false)}>
              {list()}
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
