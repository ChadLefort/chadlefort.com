import Box from '@material-ui/core/Box';
import CodeTagsIcon from 'mdi-material-ui/CodeTags';
import React from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    fontFamily: `"Economica", "Helvetica", "Arial", sans-serif`
  },
  logoIcon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.h1.fontSize
    }
  }
}));

export const Logo: React.FC<TypographyProps> = (props) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <CodeTagsIcon className={classes.logoIcon} titleAccess="Angle Brackets" />
      <Typography {...props} className={classes.logo}>
        Chad Lefort
      </Typography>
    </Box>
  );
};
