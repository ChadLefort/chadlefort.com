import ArrowUpIcon from 'mdi-material-ui/ArrowUpBold';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { animateScroll } from 'react-scroll';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Nav } from './Nav';
import { SiteTheme } from './SiteTheme';

const useStyles = makeStyles((theme: Theme) => ({
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

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  const duration = 500;
  const [atTopOfPage, setAtTopOfPage] = useState(true);
  const isPrint = useMediaQuery('print');

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
    <SiteTheme>
      <Nav />
      <Grid container={!isPrint}>{children}</Grid>
      <Fab
        color="primary"
        aria-label="scroll-to-top"
        onClick={scrollToTop}
        className={classes.scrollToTop}
        style={atTopOfPage || isPrint ? { display: 'none' } : { display: 'block' }}
      >
        <ArrowUpIcon />
      </Fab>
    </SiteTheme>
  );
};
