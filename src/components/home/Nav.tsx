import AccountIcon from 'mdi-material-ui/Account';
import CodeJsonIcon from 'mdi-material-ui/CodeJson';
import EmailIcon from 'mdi-material-ui/Email';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NoteIcon from 'mdi-material-ui/Note';
import React from 'react';
import SchoolIcon from 'mdi-material-ui/School';
import scroller from 'react-scroll/modules/mixins/scroller';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link as GatsbyLink } from 'gatsby';
import ApplicationBracesIcon from 'mdi-material-ui/ApplicationBraces';
import Button from '@material-ui/core/Button';

import { useScreenSize } from '../../hooks/useScreenSize';
import { Nav, ToggleDrawer } from '../Nav';

const useStyles = makeStyles((theme: Theme) => ({
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
  icon: {
    fontSize: '1.7rem'
  }
}));

export const HomeNav: React.FC = () => {
  const classes = useStyles();
  const deskTopOffset = -64;
  const duration = 500;
  const smooth = 'easeInOutQuart';
  const { isSmallDown } = useScreenSize();

  const scrollToSection = (section: string) => (_event: React.KeyboardEvent | React.MouseEvent) => {
    scroller.scrollTo(section, {
      duration,
      smooth,
      offset: isSmallDown ? -56 : deskTopOffset
    });
  };

  const links = [
    { to: 'job-experience', label: 'Job Experience', icon: NoteIcon },
    { to: 'skills', label: 'Skills', icon: CodeJsonIcon },
    { to: 'education', label: 'Education', icon: SchoolIcon },
    { to: 'about-me', label: 'About Me', icon: AccountIcon },
    { to: 'contact', label: 'Contact', icon: EmailIcon }
  ];

  const AppBarLinks: React.FC = () => (
    <>
      {links.map(({ to, label }, index) => (
        <Link key={index} component="button" variant="body2" onClick={scrollToSection(to)} className={classes.link} color="inherit" underline="none">
          {label}
        </Link>
      ))}
      <GatsbyLink to="/projects" className={classes.gatsbyLinkNav}>
        Projects
      </GatsbyLink>
    </>
  );

  const DrawerList: React.FC<{ toggleDrawer: ToggleDrawer }> = ({ toggleDrawer }) => (
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

  return <Nav AppBarLinks={AppBarLinks} DrawerList={DrawerList} />;
};
