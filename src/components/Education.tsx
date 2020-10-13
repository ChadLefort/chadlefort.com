import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { ListItem } from './ListItem';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useScreenSize } from '../hooks/useScreenSize';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8, 2),
    backgroundColor: theme.palette.grey[300],
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 2)
    },
    '@media print': {
      padding: theme.spacing(1.5, 0),
      backgroundColor: theme.palette.common.white,
      pageBreakBefore: 'always'
    }
  },
  button: {
    margin: theme.spacing(2, 1)
  },
  item: {
    padding: theme.spacing(2, 0),
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  },
  logo: {
    maxWidth: 110,
    width: '100%'
  },
  divider: {
    marginTop: theme.spacing(2)
  }
}));

export const NichollsLogo: React.FC = () => {
  const classes = useStyles();

  return (
    <svg viewBox="0 0 533 260" className={classes.logo}>
      <g transform="translate(0, 260) scale(0.1, -0.1)" fill="#c51230">
        <path
          d="M1207 2523 c-4 -3 -7 -159 -7 -345 l0 -338 95 0 95 0 0 -205 0 -205
        -177 0 -178 0 -29 62 c-38 83 -139 188 -181 188 -3 0 -5 -56 -5 -125 l0 -125
        -294 0 c-249 0 -295 2 -306 15 -7 8 -24 15 -39 15 -106 0 -145 -191 -55 -270
        29 -25 41 -30 67 -25 31 6 34 4 55 -40 32 -66 106 -140 171 -172 119 -59 249
        -28 350 83 l51 56 0 -71 c0 -82 6 -86 68 -42 45 33 93 98 123 166 l20 45 179
        0 180 0 0 -220 0 -220 -95 0 -95 0 2 -338 3 -337 558 -3 557 -2 0 340 0 340
        -85 0 -85 0 0 221 0 220 24 -3 c18 -2 127 -134 461 -561 l438 -557 476 2 476
        3 3 338 2 337 -100 0 -100 0 0 48 c-2 121 1 386 3 389 2 1 95 7 208 13 500 26
        818 100 1048 247 29 19 51 36 48 39 -3 3 -54 -2 -113 -10 -148 -20 -432 -34
        -846 -41 l-348 -6 0 205 0 205 98 3 97 3 0 340 0 340 -565 0 -565 0 -3 -342
        -2 -343 100 0 100 0 0 -205 0 -205 -32 0 c-31 1 -54 27 -463 548 l-430 547
        -476 3 c-261 1 -479 -1 -482 -5z m1305 -591 c213 -271 388 -495 388 -497 0 -3
        -15 -5 -33 -5 -32 0 -48 18 -403 470 l-369 470 -367 0 -368 0 0 -190 0 -190
        95 0 95 0 0 -695 0 -695 -95 0 -95 0 0 -185 0 -185 405 0 405 0 0 185 0 185
        -85 0 -85 0 0 541 0 542 93 -118 c50 -64 94 -121 95 -126 2 -5 -12 -9 -30 -9
        -28 0 -39 7 -64 40 -16 22 -32 40 -36 40 -5 0 -8 -191 -8 -425 l0 -424 88 -3
        87 -3 3 -242 2 -243 -465 0 -465 0 0 245 0 245 95 0 95 0 0 635 0 635 -95 0
        -95 0 0 250 0 250 412 -2 412 -3 388 -493z m1418 254 l0 -243 -46 -7 c-26 -3
        -71 -6 -100 -6 l-54 0 0 -635 0 -635 100 0 100 0 0 -245 0 -245 -408 0 -408 0
        -390 496 c-214 273 -393 503 -397 511 -7 12 -2 14 27 11 35 -3 50 -20 410
        -478 l373 -475 366 -3 367 -2 0 185 0 185 -100 0 -100 0 0 695 0 695 100 0
        100 0 0 190 0 190 -415 0 -415 0 0 -190 0 -190 100 0 100 0 0 -537 c0 -300 -4
        -533 -9 -528 -4 6 -52 66 -106 134 -74 94 -94 125 -84 132 27 17 47 8 85 -38
        20 -27 41 -52 46 -58 4 -5 8 181 8 413 l0 422 -95 0 -95 0 0 250 0 250 470 0
        470 0 0 -244z m840 -812 c-140 -34 -506 -64 -782 -64 l-158 0 0 30 0 30 243 1
        c133 1 325 5 427 8 102 4 217 8 255 8 l70 1 -55 -14z m-4249 -4 c289 0 299 -1
        299 -19 0 -11 -8 -22 -17 -24 -10 -2 -147 -4 -305 -3 -222 1 -289 -2 -293 -11
        -8 -22 -45 -14 -57 12 -16 35 5 59 45 51 16 -3 164 -6 328 -6z m869 -30 l0
        -30 -170 0 c-140 0 -170 2 -170 14 0 8 -3 21 -6 30 -5 14 13 16 170 16 l176 0
        0 -30z m1700 0 l0 -30 -470 0 -470 0 0 30 0 30 470 0 470 0 0 -30z m-2309
        -169 c-14 -26 -65 -67 -115 -94 -56 -30 -193 -31 -246 -3 -48 26 -108 74 -121
        97 -9 18 -2 19 241 19 243 0 250 -1 241 -19z"
        />
      </g>
    </svg>
  );
};

export const Education: React.FC = () => {
  const classes = useStyles();
  const { isSmallDown, isPrint } = useScreenSize();

  return (
    <Grid item xs={12} className={classes.root} id="education">
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography variant="h4" align="center" gutterBottom>
            Education
          </Typography>
          <Grid container justify="space-between" direction={isSmallDown && !isPrint ? 'column-reverse' : 'row'}>
            <Grid item xs={isPrint ? 10 : 12} md={10}>
              <Typography variant="h5" component="h1" gutterBottom align={isSmallDown && !isPrint ? 'center' : 'inherit'}>
                Nicholls State University
              </Typography>
              <Typography variant="subtitle2" component="h2" color="textSecondary" align={isSmallDown && !isPrint ? 'center' : 'inherit'}>
                Bachelor of Science (B.S.)
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom align={isSmallDown && !isPrint ? 'center' : 'inherit'}>
                August 2009 - December 2013
              </Typography>
            </Grid>
            <Grid item xs={isPrint ? 2 : 12} md={2} className={classes.item}>
              <NichollsLogo />
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <List dense={isPrint}>
            <ListItem>
              <ListItemText primary="Majored in Computer Information Systems" />
            </ListItem>
            <ListItem>
              <ListItemText primary="GPA: 3.6" />
            </ListItem>
          </List>
          <Typography variant="h6" component="h3">
            Awards
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Consistently been awarded the President’s List award since the Fall 2010 semester. The President’s List award requires a student to maintain a scholastic GPA of 3.5 or higher." />
            </ListItem>
          </List>
          <Typography variant="h6" component="h3">
            Organizations
          </Typography>
          <List dense={isPrint}>
            <ListItem>
              <ListItemText primary="Member of Beta Gamma Sigma. It is the highest recognition a business student anywhere in the world can receive in a business program accredited by AACSB International." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Member of Upsilon Pi Epsilon. It is the first and only existing international honor society in the Computing and Information disciplines." />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};
