import Button from '@material-ui/core/Button';
import EmailIcon from 'mdi-material-ui/Email';
import GithubIcon from 'mdi-material-ui/Github';
import Grid from '@material-ui/core/Grid';
import LinkedinIcon from 'mdi-material-ui/Linkedin';
import React from 'react';
import TwitterIcon from 'mdi-material-ui/Twitter';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8, 2),
    backgroundColor: theme.palette.grey[200],
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 2)
    },
    '@media print': {
      display: 'none'
    }
  },
  button: {
    margin: theme.spacing(2, 1)
  }
}));

export const Contact: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root} id="contact">
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography variant="h4" align="center" gutterBottom>
            Contact
          </Typography>
          <Typography paragraph align="center" gutterBottom>
            Have questions, a job opportunity, or want to hire me to develop a website? Let's get in touch.
          </Typography>
          <Grid container item justify="center">
            <Button
              color="primary"
              variant="contained"
              size="large"
              startIcon={<EmailIcon />}
              className={classes.button}
              component="a"
              href="mailto:chadlefort@gmail.com"
              target="_blank"
              rel="noopener"
            >
              Email
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="large"
              startIcon={<GithubIcon />}
              className={classes.button}
              component="a"
              href="https://github.com/ChadLefort"
              target="_blank"
              rel="noopener"
            >
              Github
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="large"
              startIcon={<LinkedinIcon />}
              className={classes.button}
              component="a"
              href="http://www.linkedin.com/in/chadlefort"
              target="_blank"
              rel="noopener"
            >
              Linkedin
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="large"
              startIcon={<TwitterIcon />}
              className={classes.button}
              component="a"
              href="http://twitter.com/ChadLefort"
              target="_blank"
              rel="noopener"
            >
              Twitter
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
