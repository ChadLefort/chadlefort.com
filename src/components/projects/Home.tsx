import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link as GatsbyLink } from 'gatsby';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    flexGrow: 1,
    padding: theme.spacing(8, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4)
    }
  },
  title: {
    marginBottom: theme.spacing(4)
  },
  card: {
    boxShadow: 'none'
  },
  cardTitle: {
    marginBottom: theme.spacing(2)
  },
  link: {
    textDecoration: 'none'
  }
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography variant="h4" align="center" gutterBottom className={classes.title}>
            Projects
          </Typography>
          <Grid container>
            <Grid item alignContent="center" xs={12} md={6} lg={4}>
              <GatsbyLink to="/projects/spear-dashboard" className={classes.link}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h5" component="h2" className={classes.cardTitle}>
                        Spear Dashboard
                      </Typography>
                      <Typography color="textSecondary">
                        Built and architected a new mobile-first dashboard for an education SaaS platform tailored to dentists and their practices.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </GatsbyLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
