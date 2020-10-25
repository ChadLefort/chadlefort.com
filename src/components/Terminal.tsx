import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import React, { useState } from 'react';
import Typing from 'react-typing-animation';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2, 0)
  },
  menuBar: {
    height: 30,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(1, 1, 0, 0),
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing(1)
  },
  menuBarButton: {
    height: 15,
    width: 15,
    borderRadius: '50%',
    margin: theme.spacing(1)
  },
  menuBarMin: {
    backgroundColor: theme.palette.warning.main
  },
  menuBarMax: {
    backgroundColor: theme.palette.success.main
  },
  menuBarClose: {
    backgroundColor: theme.palette.error.main
  },
  mainWindow: {
    minHeight: 266,
    backgroundColor: theme.palette.grey['A400'],
    borderRadius: theme.spacing(0, 0, 1, 1),
    padding: theme.spacing(1),
    '& p': {
      color: theme.palette.common.white,
      fontFamily: 'Monospace',
      fontSize: '1.2rem',
      margin: theme.spacing(2)
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 335
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: 500
    }
  },
  cursor: {
    backgroundColor: theme.palette.common.white,
    animation: '$blink 1s linear infinite'
  },
  '@keyframes blink': {
    '0%': {
      opacity: 0
    },
    '40%': {
      opacity: 0
    },
    '50%': {
      opacity: 1
    },
    '90%': {
      opacity: 1
    },
    '100%': {
      opacity: 0
    }
  }
}));

export const Cursor: React.FC = () => {
  const classes = useStyles();
  return <span className={classes.cursor}>&nbsp;</span>;
};

export const Terminal: React.FC = () => {
  const classes = useStyles();
  const [finishedTyping, setFinishedTyping] = useState(false);
  const handleFinishedTyping = () => setFinishedTyping(true);

  return (
    <Box className={classes.root}>
      <Box className={classes.menuBar}>
        <Box className={clsx(classes.menuBarButton, classes.menuBarMin)} />
        <Box className={clsx(classes.menuBarButton, classes.menuBarMax)} />
        <Box className={clsx(classes.menuBarButton, classes.menuBarClose)} />
      </Box>
      <Box className={classes.mainWindow}>
        <Typography>
          <Typing cursor={<Cursor />} speed={150} onFinishedTyping={handleFinishedTyping}>
            $ ./chad-lefort.sh
          </Typing>
        </Typography>
        <Box style={finishedTyping ? { display: 'block' } : { display: 'none' }}>
          <Typography>&gt; Hello, I'm Chad a frontend developer from Covington, Louisiana.</Typography>
          <Typography>&gt; I’ve always had a strong passion for the web. Shortly after I was gifted my first computer, I grew interested in web development.</Typography>
          <Typography>&gt; I'm constantly furthering my skills to keep up with the ever changing demand the web has.</Typography>
          <Typography>&gt; I've always enjoyed the feeling of accomplishment when programming, and I take pride in writing clean, maintainable, and efficient code.</Typography>
          <Typography>
            $ <Cursor />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
