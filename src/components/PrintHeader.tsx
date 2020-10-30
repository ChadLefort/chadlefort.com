import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import DesktopClassicIcon from 'mdi-material-ui/DesktopClassic';
import EmailIcon from 'mdi-material-ui/Email';
import GithubIcon from 'mdi-material-ui/Github';
import Grid from '@material-ui/core/Grid';
import Img from 'gatsby-image';
import PhoneIcon from 'mdi-material-ui/Phone';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Logo } from './Logo';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useProfileImage } from '../hooks/useProfileImage';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'none',
    '@media print': {
      display: 'block',
      backgroundColor: theme.palette.common.white,
      paddingBottom: theme.spacing(1.5)
    }
  },
  medium: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  avatar: {
    paddingRight: theme.spacing(1.5)
  },
  icon: {
    margin: theme.spacing(0, 1)
  },
  item: {
    paddingTop: theme.spacing(3.5)
  }
}));

export const PrintHeader: React.FC = () => {
  const classes = useStyles();
  const fluid = useProfileImage();

  return (
    <Grid item xs={12} className={classes.root}>
      <Grid container justify="space-between">
        <Grid container item xs={8} alignItems="center">
          <Grid item className={classes.avatar}>
            <Avatar alt="Chad Lefort" className={classes.medium} component={Img} fluid={fluid} loading="eager" />
          </Grid>
          <Grid item>
            <Logo variant="h2" component="h1" />
            <Typography color="textSecondary" variant="h5">
              Frontend Engineer
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={4} alignItems="center" justify="flex-end">
          <Box>
            <Box display="flex" alignItems="center">
              <PhoneIcon fontSize="small" className={classes.icon} />
              <Typography>(985) 696-4781</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <EmailIcon fontSize="small" className={classes.icon} />
              <Typography>chadlefort@gmail.com</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <GithubIcon fontSize="small" className={classes.icon} />
              <Typography>github.com/ChadLefort</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <DesktopClassicIcon fontSize="small" className={classes.icon} />
              <Typography>chadlefort.com</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container item className={classes.item}>
        <Typography>
          I’ve always had a strong passion for the web. Shortly after I was given my first computer, I grew interested in web development. I take pride in writing clean,
          maintainable, and efficient code and have always enjoyed the feeling of accomplishment when programming. I not only take pride in my own work, but genuinely care that the
          team I'm a part of succeeds in delivering great products that offer an excellent user experience. I'm also constantly furthering my skills by learning new patterns,
          libraries, and frameworks to keep up with the ever changing demand the web has.
        </Typography>
      </Grid>
    </Grid>
  );
};
