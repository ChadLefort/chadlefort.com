import React from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  logo: {
    fontFamily: `"Fjalla One", "Helvetica", "Arial", sans-serif`
  }
}));

export const Logo: React.FC<TypographyProps & { component?: React.ElementType }> = (props) => {
  const classes = useStyles();

  return (
    <Typography {...props} className={classes.logo}>
      Chad Lefort
    </Typography>
  );
};
