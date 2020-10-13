import ArrowUpCircleIcon from 'mdi-material-ui/ArrowUpCircle';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { animateScroll } from 'react-scroll';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Nav } from './Nav';
import { SiteTheme } from './SiteTheme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    offset: theme.mixins.toolbar,
    toolbar: {
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'space-between'
      }
    },
    logo: {
      fontFamily: `'Economica', sans-serif`
    },
    list: {
      width: 250
    },
    link: {
      cursor: 'pointer',
      margin: theme.spacing(0, 2)
    },
    activeLink: {
      color: theme.palette.grey[200],
      fontWeight: theme.typography.fontWeightBold
    },
    scrollToTop: {
      color: theme.palette.grey[800],
      fontSize: '3.5em',
      position: 'fixed',
      bottom: 30,
      right: 30,
      cursor: 'pointer',
      [theme.breakpoints.down('sm')]: {
        bottom: 5,
        right: 5
      }
    }
  })
);

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

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SiteTheme>
      <Nav />
      <Grid container={!isPrint}>{children}</Grid>
      <ArrowUpCircleIcon onClick={scrollToTop} className={classes.scrollToTop} style={atTopOfPage || isPrint ? { display: 'none' } : { display: 'block' }} />
    </SiteTheme>
  );
};
