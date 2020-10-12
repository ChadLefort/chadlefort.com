import AppBar from '@material-ui/core/AppBar';
import ArrowUpCircleIcon from 'mdi-material-ui/ArrowUpCircle';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { animateScroll, Link } from 'react-scroll';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { SiteTheme } from './SiteTheme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    offset: theme.mixins.toolbar,
    toolbar: {
      justifyContent: 'center'
    },
    link: {
      cursor: 'pointer',
      margin: theme.spacing(0, 2)
    },
    activeLink: {
      color: theme.palette.grey[300],
      fontWeight: theme.typography.fontWeightBold
    },
    scrollToTop: {
      color: theme.palette.grey[800],
      fontSize: '3.5em',
      position: 'fixed',
      bottom: 30,
      right: 30,
      cursor: 'pointer'
    }
  })
);

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  const offset = -65;
  const duration = 500;
  const [atTopOfPage, setAtTopOfPage] = useState(true);

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
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <SiteTheme>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Link to="job-experience" spy smooth duration={duration} offset={offset} className={classes.link} activeClass={classes.activeLink}>
            Job Experience
          </Link>
          <Link to="skills" spy smooth duration={duration} offset={offset} className={classes.link} activeClass={classes.activeLink}>
            Skills
          </Link>
          <Link to="education" spy smooth duration={duration} offset={offset} className={classes.link} activeClass={classes.activeLink}>
            Education
          </Link>
          <Link to="about-me" spy smooth duration={duration} offset={offset} className={classes.link} activeClass={classes.activeLink}>
            About Me
          </Link>
          <Link to="contact" spy smooth duration={duration} offset={offset} className={classes.link} activeClass={classes.activeLink}>
            Contact
          </Link>
        </Toolbar>
      </AppBar>
      <Box className={classes.offset} />
      <Grid container justify="center" alignContent="center">
        {children}
      </Grid>
      <ArrowUpCircleIcon onClick={scrollToTop} className={classes.scrollToTop} style={atTopOfPage ? { display: 'none' } : { display: 'block' }} />
    </SiteTheme>
  );
};
