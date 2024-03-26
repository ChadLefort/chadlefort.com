import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

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
  secondaryTitle: {
    marginTop: theme.spacing(4)
  }
}));

type Props = {
  title: string;
  subtitle: string;
  SwiperImages?: React.ComponentType;
  TextContent: React.ComponentType;
  BuiltWith: React.ComponentType;
};

export const Project: React.FC<Props> = ({ title, subtitle, SwiperImages, TextContent, BuiltWith }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography variant="h4" align="center" gutterBottom className={classes.title}>
            {title}
            <Typography paragraph variant="subtitle2" color="textSecondary">
              {subtitle}
            </Typography>
          </Typography>
          <Grid container>
            {SwiperImages && <SwiperImages />}
            <Grid container alignContent="center" item xs={12}>
              <TextContent />
            </Grid>
          </Grid>

          <Typography variant="h5" align="center" gutterBottom className={classes.secondaryTitle}>
            Built With
          </Typography>

          <BuiltWith />
        </Grid>
      </Grid>
    </Grid>
  );
};
