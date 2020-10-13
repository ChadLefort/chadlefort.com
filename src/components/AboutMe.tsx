import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8, 2),
    backgroundColor: theme.palette.grey[300],
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 2)
    },
    '@media print': {
      display: 'none'
    }
  }
}));

export const AboutMe: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root} id="about-me">
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography variant="h4" align="center" gutterBottom>
            About Me
          </Typography>
          <Typography paragraph>
            I've been a technology enthusiast ever since I received my first computer at the age of 11. A few years later I starting creating web sites and fell in love with the
            web. Shortly afterwards in high school I took a computer repair course that sparked my love for computer hardware. In college I had to decide which path I wanted to
            take and being a web developer won.
          </Typography>
          <Typography paragraph>
            When I'm not programming, I enjoy spending time with my wife Melanie and my cat Pat. I also enjoy building and tearing apart computers, falling down on my
            skateboarding, rocking out while playing guitar and bass, and exploring new worlds in video games!
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
