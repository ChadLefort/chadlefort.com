import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import me from '../../static/me.png';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Logo } from './Logo';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8, 2),
    backgroundColor: theme.palette.grey[400],
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 2)
    },
    '@media print': {
      display: 'none'
    }
  },
  large: {
    width: theme.spacing(40),
    height: theme.spacing(40),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(30),
      height: theme.spacing(30)
    }
  },
  avatar: {
    padding: theme.spacing(2, 4)
  },
  item: {
    padding: theme.spacing(2)
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200]
  },
  cardIcon: {
    fontSize: theme.typography.h1.fontSize
  }
}));

export const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      <Hidden smDown>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Logo variant="h2" align="center" />
        </Box>
      </Hidden>
      <Grid container justify="center">
        <Grid container item justify="center" xs={12} className={classes.avatar}>
          <Avatar alt="Chad Lefort" src={me} className={classes.large} />
        </Grid>
        <Grid container item xs={12} md={10} lg={8} xl={6}>
          <Grid item xs={12} md={4} className={classes.item}>
            <Card className={classes.card}>
              <CardContent>
                <Typography align="center" gutterBottom variant="h5" component="h2">
                  Passionate
                </Typography>
                <Typography align="center" component="p">
                  I’ve always had a strong passion for technology. Shortly after I was gifted my first computer, I grew interested in web development and programming.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} className={classes.item}>
            <Card className={classes.card}>
              <CardContent>
                <Typography align="center" gutterBottom variant="h5" component="h2">
                  Always Learning
                </Typography>
                <Typography align="center" component="p">
                  I'm constantly furthering my skills to keep up with the ever changing demand the web has. Programming has always been a hobby I enjoy.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} className={classes.item}>
            <Card className={classes.card}>
              <CardContent>
                <Typography align="center" gutterBottom variant="h5" component="h2">
                  Motivated
                </Typography>
                <Typography align="center" component="p">
                  I've always enjoyed the feeling of accomplishment when programming, and I take pride in writing clean, readable, maintainable, and efficient code.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
