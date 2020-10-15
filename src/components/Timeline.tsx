import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import Typography from '@material-ui/core/Typography';
import { ListItem } from './ListItem';
import { makeStyles } from '@material-ui/core/styles';
import { useScreenSize } from '../hooks/useScreenSize';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4)
    },
    '@media print': {
      padding: theme.spacing(1.5, 0),
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    '@media print': {
      padding: theme.spacing(1.5),
      backgroundColor: theme.palette.common.white
    }
  },
  timeline: {
    padding: '6px 16px',
    [theme.breakpoints.down('sm')]: {
      padding: '6px 0'
    },
    '@media print': {
      padding: 0
    }
  },
  timelineOpposite: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));

export const SiteTimeline: React.FC = () => {
  const classes = useStyles();
  const { isSmallDown, isPrint } = useScreenSize();
  const veriforceDate = 'July 2017 - Present';
  const netchexDate = 'November 2014 – July 2017';
  const chouestDate = 'December 2013 – November 2014';

  return (
    <Grid item xs={12} className={classes.root} id="job-experience">
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography variant="h4" align="center" gutterBottom>
            Job Experience
          </Typography>
          <Timeline align={isSmallDown ? 'left' : 'alternate'} className={classes.timeline} data-testid="timeline">
            <TimelineItem>
              <TimelineOppositeContent className={classes.timelineOpposite}>
                <Typography variant="body2" color="textSecondary">
                  {veriforceDate}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Veriforce
                  </Typography>
                  <Typography variant="subtitle2" component="h2" color="textSecondary" gutterBottom>
                    Senior Frontend Developer
                  </Typography>
                  <Hidden mdUp>
                    <Typography variant="body2" color="textSecondary">
                      {veriforceDate}
                    </Typography>
                  </Hidden>
                  <List dense={isPrint}>
                    <ListItem>
                      <ListItemText primary="Playing a pivotal role in the process of architecting newly developed applications in React, Redux, Typescript, and Material-UI." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Set up a mono repo for over a dozen React applications and several private NPM packages using Lerna and Jenkins." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Created the first private NPM package and build processes to share code between React/legacy applications." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Implemented Typescript into existing React applications." />
                    </ListItem>
                  </List>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent className={classes.timelineOpposite}>
                <Typography variant="body2" color="textSecondary">
                  {netchexDate}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Netchex
                  </Typography>
                  <Typography variant="subtitle2" component="h2" color="textSecondary" gutterBottom>
                    Software Developer
                  </Typography>
                  <Hidden mdUp>
                    <Typography variant="body2" color="textSecondary">
                      {netchexDate}
                    </Typography>
                  </Hidden>
                  <List dense={isPrint}>
                    <ListItem>
                      <ListItemText primary="Worked in a agile scrum environment doing full stack development on an application that specialized in payroll, benefits, and human resources." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Developed back-end code base using domain driven design with C#, Web API, and MVC5." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Developed frontend single page applications using AngularJS, TypeScript, Bootstrap, and LESS." />
                    </ListItem>
                  </List>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent className={classes.timelineOpposite}>
                <Typography variant="body2" color="textSecondary">
                  {chouestDate}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Edison Chouest Offshore
                  </Typography>
                  <Typography variant="subtitle2" component="h2" color="textSecondary" gutterBottom>
                    PLC Programmer
                  </Typography>
                  <Hidden mdUp>
                    <Typography variant="body2" color="textSecondary">
                      {chouestDate}
                    </Typography>
                  </Hidden>
                  <List dense={isPrint}>
                    <ListItem>
                      <ListItemText primary="Implemented automation systems on new vessels using ladder logic." />
                    </ListItem>
                  </List>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Grid>
      </Grid>
    </Grid>
  );
};
