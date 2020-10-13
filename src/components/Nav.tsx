import AccountIcon from 'mdi-material-ui/Account';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import CodeJsonIcon from 'mdi-material-ui/CodeJson';
import Drawer from '@material-ui/core/Drawer';
import EmailIcon from 'mdi-material-ui/Email';
import HamburgerIcon from 'mdi-material-ui/Hamburger';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NoteIcon from 'mdi-material-ui/Note';
import React from 'react';
import SchoolIcon from 'mdi-material-ui/School';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link, scroller } from 'react-scroll';
import { Logo } from './Logo';
import { useScreenSize } from '../hooks/useScreenSize';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    activeLink: {
      color: theme.palette.grey[300],
      fontWeight: theme.typography.fontWeightBold
    }
  })
);

export const Nav: React.FC = () => {
  const classes = useStyles();
  const deskTopOffset = -65;
  const duration = 500;
  const smooth = 'easeInOutQuart';
  const [drawer, setDrawer] = React.useState(false);
  const { smallDown } = useScreenSize();

  const scrollToSection = (section: string) => (_event: React.KeyboardEvent | React.MouseEvent) => {
    scroller.scrollTo(section, {
      duration,
      smooth,
      offset: smallDown ? -55 : deskTopOffset
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
              <Link key={index} to={to} spy offset={deskTopOffset} duration={duration} smooth={smooth} className={classes.link} activeClass={classes.activeLink}>
                {label}
              </Link>
            ))}
          </Hidden>
          <Hidden mdUp>
            <Logo variant="h4" />
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
    </Box>
  );
};
