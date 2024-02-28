import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FileDownloadIcon from 'mdi-material-ui/FileDownload';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Img from 'gatsby-image';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Logo } from './Logo';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Terminal } from './Terminal';
import { useProfileImage } from '../hooks/useProfileImage';
import { useScreenSize } from '../hooks/useScreenSize';

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
    width: theme.spacing(25),
    height: theme.spacing(25),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(30),
      height: theme.spacing(30)
    }
  },
  avatar: {
    padding: theme.spacing(2, 0),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 4, 2, 4)
    }
  },
  item: {
    padding: theme.spacing(2)
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: theme.spacing(2, 0)
  },
  button: {
    margin: theme.spacing(2, 1),
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 0)
    }
  },
  icon: {
    '& svg': {
      fontSize: '1.7rem !important'
    }
  },
  title: {
    padding: theme.spacing(0, 4)
  }
}));

export const Header: React.FC = () => {
  const classes = useStyles();
  const { isSmallDown } = useScreenSize();
  const fluid = useProfileImage();

  return (
    <Grid item xs={12} className={classes.root}>
      <Grid container justifyContent="center">
        <Grid container item justifyContent="center" alignItems="center" xs={12}>
          <Grid item className={classes.avatar}>
            <Avatar className={classes.large} component={Img} fluid={fluid} alt="Chad Lefort" />
          </Grid>
          <Hidden smDown>
            <Grid item className={classes.title}>
              <Logo variant="h1" component="h1" />
              <Typography color="textSecondary" variant="h3" component="h2">
                Senior Frontend Engineer
              </Typography>
            </Grid>
          </Hidden>
        </Grid>
        <Grid container item xs={12} md={10} lg={8} xl={6} justifyContent="center">
          <Grid item xs={12}>
            <Terminal />
          </Grid>
          <Grid item container justifyContent="center">
            <Button
              color="primary"
              variant="contained"
              disableElevation
              size="large"
              startIcon={<FileDownloadIcon />}
              className={classes.button}
              component="a"
              href="/Chad Lefort - Resume.pdf"
              download
              fullWidth={isSmallDown}
              classes={{ iconSizeLarge: classes.icon }}
            >
              Download Resume
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
