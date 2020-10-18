import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import DesktopClassicIcon from 'mdi-material-ui/DesktopClassic';
import EmailIcon from 'mdi-material-ui/Email';
import GithubIcon from 'mdi-material-ui/Github';
import Grid from '@material-ui/core/Grid';
import mePNG from '../images/me.png';
import meWebP from '../images/me.webp';
import PhoneIcon from 'mdi-material-ui/Phone';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'none',
    '@media print': {
      display: 'block',
      backgroundColor: theme.palette.common.white,
      paddingBottom: theme.spacing(1.5)
    }
  },
  name: {
    fontFamily: `"Economica", "Helvetica", "Arial", sans-serif`
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
  }
}));

export const PrintHeader: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      <Grid container justify="space-between">
        <Grid container item xs={8} alignItems="center">
          <Grid item className={classes.avatar}>
            <Avatar alt="Chad Lefort" src={meWebP} className={classes.medium} imgProps={{ height: 500, width: 427 }}>
              <img src={mePNG} alt="Chad Lefort" className={classes.medium} height="500" width="427" />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography className={classes.name} variant="h2" component="h1">
              Chad Lefort
            </Typography>
            <Typography color="textSecondary" variant="h5">
              Frontend Developer
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
              <Typography>ChadLefort</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <DesktopClassicIcon fontSize="small" className={classes.icon} />
              <Typography>chadlefort.com</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
