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
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      padding: '6px 0'
    },
    '@media print': {
      margin: 0,
      padding: 0
    }
  },
  timelineContent: {
    '@media print': {
      padding: theme.spacing(1)
    }
  },
  timelineDot: {
    boxShadow: 'none',
    borderWidth: 4,
    [theme.breakpoints.down('sm')]: {
      borderWidth: 2
    }
  },
  timelineOpposite: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));

export const JobExperience: React.FC = () => {
  const classes = useStyles();
  const { isSmallDown, isPrint } = useScreenSize();
  const veriforceDate = 'July 2017 - Present';
  const netchexDate = 'November 2014 – July 2017';
  const chouestDate = 'December 2013 – November 2014';
  const scpdcDate = 'February 2013 - November 2013';

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
                <TimelineDot color="primary" className={classes.timelineDot} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className={classes.timelineContent} data-sal={!isPrint ? 'slide-left' : null} data-sal-duration="500" data-sal-easing="ease-in-out-quart">
                <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Veriforce
                  </Typography>
                  <Typography variant="subtitle2" component="h2" color="textSecondary" gutterBottom>
                    Senior Frontend Engineer
                  </Typography>
                  <Hidden mdUp>
                    <Typography variant="body2" color="textSecondary">
                      {veriforceDate}
                    </Typography>
                  </Hidden>
                  <List dense={isPrint}>
                    <ListItem>
                      <ListItemText primary="Architecting applications in React, Redux, TypeScript, and Material-UI and writing unit tests with Jest and React Testing Library for a contractor management platform." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Lead a team of two developers that met client deadlines for major revenue growing projects." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Mentor teammates by having pair programming sessions and providing feedback on code reviews daily." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Advocate for UI and code consistency throughout the application by creating patterns for other teammates to follow." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Set up a monorepo using Lerna for over a dozen React applications and NPM packages saving hours from weekly manual deployments." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Quarterly manage dependency upgrades that may fix underlying bugs and allow developers to use new features." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Proposed TypeScript and migrated existing React applications to it to reduce bugs and provide a better developer experience." />
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
                <TimelineDot color="primary" className={classes.timelineDot} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent
                className={classes.timelineContent}
                data-sal={!isPrint ? (isSmallDown ? 'slide-left' : 'slide-right') : null}
                data-sal-duration="500"
                data-sal-easing="ease-in-out-quart"
              >
                <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Netchex
                  </Typography>
                  <Typography variant="subtitle2" component="h2" color="textSecondary" gutterBottom>
                    Full Stack Software Developer
                  </Typography>
                  <Hidden mdUp>
                    <Typography variant="body2" color="textSecondary">
                      {netchexDate}
                    </Typography>
                  </Hidden>
                  <List dense={isPrint}>
                    <ListItem>
                      <ListItemText primary="Worked in an agile environment on an application that specialized in payroll, benefits, and human resources." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Led a team of three developers on a rewrite of the benefits module." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Developed applications using domain driven design with C# for REST APIs and created single page applications using AngularJS, TypeScript, and Bootstrap." />
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
                <TimelineDot color="primary" className={classes.timelineDot} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className={classes.timelineContent} data-sal={!isPrint ? 'slide-left' : null} data-sal-duration="500" data-sal-easing="ease-in-out-quart">
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
                      <ListItemText primary="Implemented automation systems on several vessels using ladder logic and GE PLCs." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Modified logic using GE Proficy and created custom interfaces for vessels using GE Cimplicity." />
                    </ListItem>
                  </List>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent className={classes.timelineOpposite}>
                <Typography variant="body2" color="textSecondary">
                  {scpdcDate}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" className={classes.timelineDot} />
              </TimelineSeparator>
              <TimelineContent
                className={classes.timelineContent}
                data-sal={!isPrint ? (isSmallDown ? 'slide-left' : 'slide-right') : null}
                data-sal-duration="500"
                data-sal-easing="ease-in-out-quart"
              >
                <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    SCPDC
                  </Typography>
                  <Typography variant="subtitle2" component="h2" color="textSecondary" gutterBottom>
                    Software Developer Intern
                  </Typography>
                  <Hidden mdUp>
                    <Typography variant="body2" color="textSecondary">
                      {scpdcDate}
                    </Typography>
                  </Hidden>
                  <List dense={isPrint}>
                    <ListItem>
                      <ListItemText primary="Developed client sites using WordPress, Bootstrap, PHP, and jQuery and modified custom reports using MS SQL Server." />
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
