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
import { Logo } from '../Logo';

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.common.white,
    margin: theme.spacing(0, 2),
    fontWeight: 600,
    verticalAlign: 'middle'
  },
  linkLogo: {
    textDecoration: 'none',
    color: theme.palette.common.white
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

  const LinkLogo: React.FC = () => (
    <GatsbyLink to="/" className={classes.linkLogo}>
      <Logo variant="h4" />
    </GatsbyLink>
  );

  const AppBarLinks: React.FC = () => (
    <>
      {links.map(({ to, label }, index) => (
        <GatsbyLink to={to} key={index} className={classes.link}>
          {label}
        </GatsbyLink>
      ))}
    </>
  );

  const DrawerList: React.FC<{ toggleDrawer: ToggleDrawer }> = ({ toggleDrawer }) => (
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

  return <Nav LinkLogo={LinkLogo} AppBarLinks={AppBarLinks} DrawerList={DrawerList} />;
};
