import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import { ListItem } from './ListItem';
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
      marginBottom: 0,
      padding: 0
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
  const { isSmallDown, isExtraSmallDown, isPrint } = useScreenSize();
  const cditDate = 'December 2020 - Present';
  const veriforceDate = 'July 2017 - December 2020';
  const netchexDate = 'November 2014 – July 2017';

  return (
    <Grid item xs={12} className={classes.root} id="job-experience">
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography variant="h4" align="center" gutterBottom>
            Job Experience
          </Typography>
          <Timeline align={isSmallDown ? 'left' : 'alternate'} className={classes.timeline} data-testid="timeline">
            <TimelineItem>
              <TimelineOppositeContent className={classes.timelineOpposite}>
                <Typography variant="body2" color="textSecondary">
                  {cditDate}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" className={classes.timelineDot} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent
                data-sal={!isPrint && !isExtraSmallDown ? (isSmallDown ? 'slide-left' : 'slide-right') : null}
                data-sal-duration="500"
                data-sal-easing="ease-in-out-quart"
              >
                <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    CDIT
                  </Typography>
                  <Typography variant="subtitle2" component="h2" color="textSecondary" gutterBottom>
                    Senior Frontend Engineer
                  </Typography>
                  <Hidden mdUp>
                    <Typography variant="body2" color="textSecondary">
                      {cditDate}
                    </Typography>
                  </Hidden>
                  <List dense={isPrint}>
                    <ListItem>
                      <ListItemText primary="Currently working on an instructor-guided online education platform for dentist using Vue, TypeScript, Nuxt, and Graphql." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Helped build a new platform in React for a VOIP client and migrated modules from NPM packages to Webpack Module Federation to allow for a better Microfrontend architecture." />
                    </ListItem>
                  </List>
                </Paper>
              </TimelineContent>
            </TimelineItem>
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
              <TimelineContent data-sal={!isPrint && !isExtraSmallDown ? 'slide-left' : null} data-sal-duration="500" data-sal-easing="ease-in-out-quart">
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
                      <ListItemText primary="Architected applications in React, Redux, TypeScript, and Material-UI and wrote unit tests with Jest and React Testing Library for a contractor management platform." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Led a team of developers that met client deadlines for major revenue growing projects." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Mentored teammates by having pair programming sessions and provided feedback on code reviews daily." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Advocated for UI and code consistency throughout the application by creating patterns for other teammates to follow." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Set up a monorepo using Lerna for over a dozen React applications and NPM packages saving hours from weekly manual deployments." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Quarterly managed dependency upgrades that fixed underlying bugs and allowed developers to use new features." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Migrated existing React applications to TypeScript to reduce bugs and provide a better developer experience." />
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
              </TimelineSeparator>
              <TimelineContent
                data-sal={!isPrint && !isExtraSmallDown ? (isSmallDown ? 'slide-left' : 'slide-right') : null}
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
                      <ListItemText primary="Led a team of developers on a rewrite of the benefits module." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Developed applications using domain driven design with C# for REST APIs and created single page applications using AngularJS, TypeScript, and Bootstrap." />
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
