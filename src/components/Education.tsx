import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8, 0),
    backgroundColor: theme.palette.grey[300]
  },
  button: {
    margin: theme.spacing(2, 1)
  }
}));

export const Education: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" align="center" gutterBottom>
            Education
          </Typography>
          <Typography paragraph align="center" gutterBottom>
            Education go here
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
