import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import meAndMelPNG from '../../static/me-and-mel.png';
import meAndMelWebP from '../../static/me-and-mel.webp';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8, 2),
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4)
    },
    '@media print': {
      display: 'none'
    }
  },
  large: {
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(30),
      height: theme.spacing(30)
    }
  },
  avatar: {
    padding: theme.spacing(0, 4, 0, 0),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 4),
      display: 'flex',
      justifyContent: 'center'
    }
  }
}));

export const AboutMe: React.FC = () => {
  const classes = useStyles();
  const onError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = meAndMelPNG;
  };

  return (
    <Grid item xs={12} className={classes.root} id="about-me">
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography variant="h4" align="center" gutterBottom>
            About Me
          </Typography>
          <Grid container>
            <Grid item xs={12} md={4} lg={3} className={classes.avatar}>
              <Avatar alt="Chad and Melanie" variant="rounded" src={meAndMelWebP} className={classes.large} imgProps={{ onError, height: 292, width: 279 }} />
            </Grid>
            <Grid container alignContent="center" item xs={12} md={8} lg={9}>
              <Typography paragraph>
                I've been a technology enthusiast ever since I received my first computer at the age of 11. A few years later I starting creating web sites and fell in love with
                the web. Shortly afterwards in high school I took a computer repair course that sparked my love for computer hardware. In college I had to decide which path I
                wanted to take and being a web developer won.
              </Typography>
              <Typography paragraph>
                When I'm not programming, I enjoy spending time with my wife Melanie and my cat Pat. I also enjoy building and tearing apart computers, falling down on my
                skateboarding, rocking out while playing guitar and bass, and exploring new worlds in video games!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
