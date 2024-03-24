import React, { useEffect, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typing from '@chadlefort/react-typing-animation';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

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
    minHeight: 350,
    backgroundColor: theme.palette.grey['A400'],
    borderRadius: theme.spacing(0, 0, 1, 1),
    padding: theme.spacing(1),
    '& p': {
      color: theme.palette.common.white,
      fontFamily: 'JetBrains Mono Variable',
      fontSize: '1rem',
      margin: theme.spacing(2)
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: 768
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
  },
  typingContainer: {
    display: 'flex'
  },
  typing: {
    marginLeft: 9
  }
}));

export const Cursor: React.FC = () => {
  const classes = useStyles();
  return <span className={classes.cursor}>&nbsp;</span>;
};

export const Terminal: React.FC = () => {
  const classes = useStyles();
  const [finishedTyping, setFinishedTyping] = useState(false);
  const [show, setShow] = useState(false);
  const handleFinishedTyping = () => setFinishedTyping(true);
  const yearsOfExperience = new Date().getFullYear() - 2013;

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Box className={classes.root}>
      <Box className={classes.menuBar}>
        <Box className={clsx(classes.menuBarButton, classes.menuBarMin)} />
        <Box className={clsx(classes.menuBarButton, classes.menuBarMax)} />
        <Box className={clsx(classes.menuBarButton, classes.menuBarClose)} />
      </Box>
      <Box className={classes.mainWindow}>
        <Typography className={classes.typingContainer}>
          $
          <Typing cursor={<Cursor />} startDelay={500} speed={100} onFinishedTyping={handleFinishedTyping} className={classes.typing}>
            ./chad-lefort.sh
          </Typing>
        </Typography>
        {show && (
          <Box style={finishedTyping ? { display: 'block' } : { display: 'none' }}>
            <Typography>&gt; Hello, I'm Chad, a senior frontend engineer from Mandeville, Louisiana with {yearsOfExperience}+ years of development experience.</Typography>
            <Typography>&gt; Shortly after I was given my first computer, I developed a strong passion for programming.</Typography>
            <Typography>&gt; I'm constantly furthering my skills to keep up with the ever changing demand the web has.</Typography>
            <Typography>&gt; I enjoy the feeling of accomplishment when programming, and I take pride in writing maintainable and efficient code.</Typography>
            <Typography>&gt; Committed to team success, I prioritize delivering exceptional products that provide an outstanding user experience.</Typography>
            <Typography>
              $ <Cursor />
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
