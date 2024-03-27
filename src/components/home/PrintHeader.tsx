import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { PrintHeaderContent } from './PrintHeaderContent';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'none',
    '@media print': {
      display: 'block',
      backgroundColor: theme.palette.common.white,
      paddingBottom: theme.spacing(1.5)
    }
  },
  item: {
    paddingTop: theme.spacing(1.5)
  }
}));

export const PrintHeader: React.FC = () => {
  const classes = useStyles();
  const yearsOfExperience = new Date().getFullYear() - 2013;

  return (
    <Grid item xs={12} className={classes.root}>
      <PrintHeaderContent />

      <Grid container item className={classes.item}>
        <Typography>
          Over the {yearsOfExperience}+ years of my career I've specialized in frontend solutions. I've architected and delivered a wide range of revenue growing projects while
          leveraging a variety of modern frameworks and libraries. Committed to team success, I prioritize delivering exceptional products that provide an outstanding user
          experience. Most recently I have led the development of a mobile first dashboard and sign up cart for users. The dashboard saw user engagement improvements of over 9000%
          in areas and the new sign up cart exceeded new membership goals by 25%. Additionally, I've set up and managed different configurations and created build pipelines for
          projects that have resulted in cost efficiency and improved productivity.
        </Typography>
      </Grid>
    </Grid>
  );
};
