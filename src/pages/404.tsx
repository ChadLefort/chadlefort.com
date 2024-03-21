import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HomeIcon from 'mdi-material-ui/Home';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import { SiteTheme } from '../components/SiteTheme';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const FourOhFour: React.FC = () => {
  const classes = useStyles();

  return (
    <SiteTheme>
      <Grid container direction="row" justifyContent="center" alignItems="center" className={classes.root}>
        <Grid item>
          <Typography variant="h3" align="center" gutterBottom>
            Page not found
          </Typography>
          <Typography paragraph align="center">
            Oops! The page you are looking for has been removed or relocated.
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button color="primary" variant="contained" size="large" startIcon={<HomeIcon />} component={Link} to="/">
              Take Me Home
            </Button>
          </Box>
        </Grid>
      </Grid>
    </SiteTheme>
  );
};

export default FourOhFour;
