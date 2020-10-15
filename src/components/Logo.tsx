import Box from '@material-ui/core/Box/Box';
import CodeTagsIcon from 'mdi-material-ui/CodeTags';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      fontFamily: `"Economica", "Helvetica", "Arial", sans-serif`
    },
    logoIcon: {
      marginRight: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.h1.fontSize
      }
    }
  })
);

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
