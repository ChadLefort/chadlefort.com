import MuiListItem, { ListItemProps } from '@material-ui/core/ListItem';
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0.5),
    '@media print': {
      padding: 0
    }
  }
}));

export const ListItem: React.FC<Omit<ListItemProps, 'button'>> = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <MuiListItem {...rest} classes={{ root: classes.root }}>
      {children}
    </MuiListItem>
  );
};
