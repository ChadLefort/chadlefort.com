import ChevronRightIcon from 'mdi-material-ui/ChevronRight';
import Grid from '@material-ui/core/Grid';
import HotelIcon from 'mdi-material-ui/OfficeBuilding';
import LaptopMacIcon from 'mdi-material-ui/LaptopMac';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import RepeatIcon from 'mdi-material-ui/Repeat';
import Timeline from '@material-ui/lab/Timeline';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8, 0),
    backgroundColor: theme.palette.grey[300]
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200]
  },
  timelineDate: {
    lineHeight: 2.5
  }
}));

export const SiteTimeline: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" align="center" gutterBottom>
            Job Experience
          </Typography>
          <Timeline align="alternate">
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary" className={classes.timelineDate}>
                  July 2017 - Present
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <LaptopMacIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Veriforce
                  </Typography>
                  <Typography variant="subtitle2" component="h2" color="textSecondary" gutterBottom>
                    Senior Frontend Developer
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <ChevronRightIcon />
                      </ListItemIcon>
                      <ListItemText primary="Pivotal role in the process of architecting newly developed applications in React, Redux, Typescript, and Material-UI." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ChevronRightIcon />
                      </ListItemIcon>
                      <ListItemText primary="Set up a mono repo for over a dozen React applications and several private NPM packages using Lerna and Jenkins." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ChevronRightIcon />
                      </ListItemIcon>
                      <ListItemText primary="Created the first private NPM package and build processes to share code between React/legacy applications." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ChevronRightIcon />
                      </ListItemIcon>
                      <ListItemText primary="Implemented Typescript into existing React applications." />
                    </ListItem>
                  </List>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary" className={classes.timelineDate}>
                  November 2014 – July 2017
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" variant="outlined">
                  <HotelIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Netchex
                  </Typography>
                  <Typography variant="subtitle2" component="h2" color="textSecondary" gutterBottom>
                    Software Developer
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <ChevronRightIcon />
                      </ListItemIcon>
                      <ListItemText primary="Worked in a agile scrum environment doing full stack development on an application that specialized in payroll, benefits, and human resources." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ChevronRightIcon />
                      </ListItemIcon>
                      <ListItemText primary="Developed back-end code base using domain driven design with C#, Web API, and MVC5." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ChevronRightIcon />
                      </ListItemIcon>
                      <ListItemText primary="Developed frontend single page applications using AngularJS, TypeScript, Bootstrap, and LESS." />
                    </ListItem>
                  </List>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary" className={classes.timelineDate}>
                  December 2013 – November 2014
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot>
                  <RepeatIcon />
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Edison Chouest Offshore
                  </Typography>
                  <Typography variant="subtitle2" component="h2" color="textSecondary" gutterBottom>
                    PLC Programmer
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <ChevronRightIcon />
                      </ListItemIcon>
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
