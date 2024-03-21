import HomeIcon from 'mdi-material-ui/Home';
import ApplicationBracesIcon from 'mdi-material-ui/ApplicationBraces';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link as GatsbyLink } from 'gatsby';
import Button from '@material-ui/core/Button';
import { Nav, ToggleDrawer } from '../Nav';

const useStyles = makeStyles((theme: Theme) => ({
  link: {
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
  icon: {
    fontSize: '1.7rem'
  },
  list: {
    width: 250
  },
  listItem: {
    fontWeight: 600
  }
}));

export const ProjectsNav = () => {
  const classes = useStyles();

  const links = [
    { to: '/', label: 'Home', icon: HomeIcon },
    { to: '/projects', label: 'Projects', icon: ApplicationBracesIcon }
  ];

  const appBarLinks = () =>
    links.map(({ to, label }, index) => (
      <GatsbyLink to={to} key={index} className={classes.link}>
        {label}
      </GatsbyLink>
    ));

  const drawerList = ({ toggleDrawer }: { toggleDrawer: ToggleDrawer }) => (
    <div className={classes.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {links.map(({ to, label, icon }, index) => {
          const Icon = icon;
          return (
            <Button component={GatsbyLink} to={to} key={index} className={classes.gatsbyLinkDrawer}>
              <ListItem>
                <ListItemIcon>
                  <Icon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={label} classes={{ primary: classes.listItem }} />
              </ListItem>
            </Button>
          );
        })}
      </List>
    </div>
  );

  return <Nav appBarLinks={appBarLinks} drawerList={drawerList} />;
};
