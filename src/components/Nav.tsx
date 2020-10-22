import AccountIcon from 'mdi-material-ui/Account';
import AppBar from '@material-ui/core/AppBar';
import ArrowUpIcon from 'mdi-material-ui/ArrowUpBold';
import Box from '@material-ui/core/Box';
import CodeJsonIcon from 'mdi-material-ui/CodeJson';
import Drawer from '@material-ui/core/Drawer';
import EmailIcon from 'mdi-material-ui/Email';
import Fab from '@material-ui/core/Fab';
import HamburgerIcon from 'mdi-material-ui/Hamburger';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NoteIcon from 'mdi-material-ui/Note';
import React, { useEffect, useState } from 'react';
import SchoolIcon from 'mdi-material-ui/School';
import Toolbar from '@material-ui/core/Toolbar';
import { animateScroll } from 'react-scroll';
import { Link, scroller } from 'react-scroll';
import { Logo } from './Logo';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useScreenSize } from '../hooks/useScreenSize';

const useStyles = makeStyles((theme: Theme) => ({
  offset: theme.mixins.toolbar,
  root: {
    '@media print': {
      display: 'none'
    }
  },
  toolbar: {
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between'
    }
  },
  list: {
    width: 250
  },
  link: {
    cursor: 'pointer',
    margin: theme.spacing(0, 2)
  },
  scrollToTop: {
    fontSize: '1.875rem',
    boxShadow: 'none',
    position: 'fixed',
    bottom: 30,
    right: 30,
    [theme.breakpoints.down('sm')]: {
      bottom: 12,
      right: 12
    }
  }
}));

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
                <Icon />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Hidden smDown>
            {links.map(({ to, label }, index) => (
              <Link key={index} to={to} spy offset={deskTopOffset} duration={duration} smooth={smooth} className={classes.link}>
                {label}
              </Link>
            ))}
          </Hidden>
          <Hidden mdUp>
            <Box onClick={scrollToTop}>
              <Logo variant="h4" />
            </Box>

            <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={toggleDrawer(true)}>
              <HamburgerIcon />
            </IconButton>
            <Drawer anchor="right" open={drawer} onClose={toggleDrawer(false)}>
              {list()}
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
