import EmailIcon from 'mdi-material-ui/Email';
import GithubIcon from 'mdi-material-ui/Github';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LinkedInIcon from 'mdi-material-ui/Linkedin';
import React from 'react';
import TwitterIcon from 'mdi-material-ui/Twitter';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4)
    },
    '@media print': {
      display: 'none'
    }
  },
  button: {
    margin: theme.spacing(0, 1),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, 0.5)
    }
  },
  icon: {
    fontSize: '1.7rem'
  }
}));

export const Contact: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root} id="contact">
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography variant="h4" align="center" gutterBottom>
            Contact
          </Typography>
          <Typography paragraph align="center">
            Have questions or a job opportunity? Let's get in touch.
          </Typography>
          <Grid container item justifyContent="center">
            <IconButton aria-label="email" component="a" href="mailto:chadlefort@gmail.com" target="_blank" rel="noopener" className={classes.button}>
              <EmailIcon className={classes.icon} />
            </IconButton>
            <IconButton aria-label="github" component="a" href="https://github.com/ChadLefort" target="_blank" rel="noopener" className={classes.button}>
              <GithubIcon className={classes.icon} />
            </IconButton>
            <IconButton aria-label="linkedin" component="a" href="https://www.linkedin.com/in/chadlefort" target="_blank" rel="noopener" className={classes.button}>
              <LinkedInIcon className={classes.icon} />
            </IconButton>
            <IconButton aria-label="twitter" component="a" href="https://twitter.com/ChadLefort" target="_blank" rel="noopener" className={classes.button}>
              <TwitterIcon className={classes.icon} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
