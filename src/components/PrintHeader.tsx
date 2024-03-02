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
  },
  typography: {
    padding: theme.spacing(1)
  }
}));

export const PrintHeader: React.FC = () => {
  const classes = useStyles();
  const fluid = useProfileImage();
  const yearsOfExperience = new Date().getFullYear() - 2013;

  return (
    <Grid item xs={12} className={classes.root}>
      <Grid container justifyContent="space-between">
        <Grid container item xs={8} alignItems="center">
          <Grid item className={classes.avatar}>
            <Avatar alt="Chad Lefort" className={classes.medium} component={Img} fluid={fluid} loading="eager" />
          </Grid>
          <Grid item>
            <Logo variant="h2" component="h1" />
            <Typography color="textSecondary" variant="h5">
              Senior Frontend Engineer
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={4} alignItems="center" justifyContent="flex-end">
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
          I’ve always had a strong passion for web development. I enjoy the feeling of accomplishment when programming, and I take pride in writing maintainable and efficient code.
          Committed to team success, I prioritize delivering exceptional products that provide an outstanding user experience. Over the {yearsOfExperience} years of my career I've
          specialized in frontend solutions. I've architected and delivered a wide range of revenue growing projects while leveraging a variety of modern frameworks and libraries.
          Additionally, I've set up and managed different configurations and created build pipelines for projects that have resulted in cost efficiency and improved productivity.
          One project that I recently worked on had substantial growth across all aspects of the website with significant increases in views, clicks, and user engagement, ranging
          from 325% to 9564% over a 90 day period.
        </Typography>
      </Grid>
    </Grid>
  );
};
