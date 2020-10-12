import Avatar from '@material-ui/core/Avatar';
import BookOpenVariantIcon from 'mdi-material-ui/BookOpenVariant';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DesktopClassicIcon from 'mdi-material-ui/DesktopClassic';
import Grid from '@material-ui/core/Grid';
import me from '../images/me.png';
import React from 'react';
import ThumbUpIcon from 'mdi-material-ui/ThumbUp';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8, 0),
    backgroundColor: theme.palette.grey[400]
  },
  large: {
    width: theme.spacing(40),
    height: theme.spacing(40)
  },
  avatar: {
    padding: theme.spacing(4)
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
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
      <Typography variant="h4" align="center" gutterBottom>
        Hello, I'm Chad, a Frontend Developer
      </Typography>
      <Grid container justify="center">
        <Grid container item justify="center" xs={12} className={classes.avatar}>
          <Avatar alt="Chad Lefort" src={me} className={classes.large} />
        </Grid>
        <Grid container item xs={12} md={6}>
          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Box display="flex" justifyContent="center">
                  <DesktopClassicIcon className={classes.cardIcon} />
                </Box>
                <Typography align="center" gutterBottom variant="h5" component="h2">
                  Passionate
                </Typography>
                <Typography align="center" component="p">
                  I’ve always had a strong passion for technology. Shortly after I was gifted my first computer, I grew interested in web development and programming.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Box display="flex" justifyContent="center">
                  <BookOpenVariantIcon className={classes.cardIcon} />
                </Box>
                <Typography align="center" gutterBottom variant="h5" component="h2">
                  Always Learning
                </Typography>
                <Typography align="center" component="p">
                  I'm constantly furthering my skills to keep up with the ever changing demand the web has. Programming is more than a job to me, it’s a hobby and a passion.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Box display="flex" justifyContent="center">
                  <ThumbUpIcon className={classes.cardIcon} />
                </Box>
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
