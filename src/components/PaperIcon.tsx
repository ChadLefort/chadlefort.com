import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { useScreenSize } from '../hooks/useScreenSize';

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    margin: theme.spacing(2),
    maxWidth: 110,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1)
    },
    '@media print': {
      maxWidth: 75,
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    padding: theme.spacing(1),
    '@media print': {
      padding: theme.spacing(0.5),
      backgroundColor: theme.palette.common.white
    }
  },
  icon: {
    margin: theme.spacing(1, 2)
  }
}));

type Props = {
  name: string;
};

export const PaperIcon: React.FC<Props> = ({ children, name }) => {
  const classes = useStyles();
  const { isPrint } = useScreenSize();

  return (
    <Grid item className={classes.item}>
      <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
        <Box className={classes.icon}>{children}</Box>
        <Typography variant="body2" align="center">
          {name}
        </Typography>
      </Paper>
    </Grid>
  );
};
