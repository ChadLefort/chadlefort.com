import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
import CircleSmall from 'mdi-material-ui/CircleSmall';

import { useScreenSize } from '../../hooks/useScreenSize';
import { ListItem } from '../ListItem';

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
  },
  listItemIcon: {
    display: 'none',
    minWidth: theme.spacing(4),
    alignSelf: 'flex-start',
    paddingTop: theme.spacing(0.5),
    '@media print': {
      display: 'flex'
    }
  }
}));

export const JobExperience: React.FC = () => {
  const classes = useStyles();
  const { isSmallDown, isExtraSmallDown, isPrint } = useScreenSize();
  const cditDate = 'December 2020 - Present';
  const veriforceDate = 'July 2017 - December 2020';
  const netchexDate = 'November 2014 – July 2017';
  const chouestDate = 'December 2013 – November 2014';
  const scpdcDate = 'February 2013 – November 2013';

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
                      <ListItemIcon className={classes.listItemIcon}>
                        <CircleSmall />
                      </ListItemIcon>
                      <ListItemText primary="Built and architected a new mobile first dashboard, membership cart, and a live instructor-guided online education SaaS platform for dentist and their practices using Vue 3, TypeScript, Nuxt, and GraphQL. Extensive testing was done with Vitest, Vue Testing Library, and Cypress with meaningful code coverage averaging around 80%." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon className={classes.listItemIcon}>
                        <CircleSmall />
                      </ListItemIcon>
                      <ListItemText primary="In less than 2 years, launched 3 major high-impact projects that set speed and quality standards for the development team and brought measurable success for a client." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon className={classes.listItemIcon}>
                        <CircleSmall />
                      </ListItemIcon>
                      <ListItemText primary="Revitalized a registration cart by enhancing user experience, reducing friction points, and introducing promotional code functionality which exceeded new membership signup goals by 25%." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon className={classes.listItemIcon}>
                        <CircleSmall />
                      </ListItemIcon>
                      <ListItemText primary="Helped build a new platform in React for a VOIP SaaS and migrated modules from NPM packages to Webpack Module Federation to allow for a better Microfrontend architecture. This improvement helped with challenges such as application updates, deployments, and reduced the number of pull requests needed from 5 to 1." />
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
                      <ListItemIcon className={classes.listItemIcon}>
                        <CircleSmall />
                      </ListItemIcon>
                      <ListItemText primary="Architected several projects in React, Redux, TypeScript, and Material-UI and wrote unit tests with Jest and React Testing Library for a contractor management SaaS platform." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon className={classes.listItemIcon}>
                        <CircleSmall />
                      </ListItemIcon>
                      <ListItemText primary="Saved hours of manual deployment time by creating a monorepo with Lerna for 17 React projects and 6 NPM packages leading to cost efficiency and improved productivity for a team of 7 frontend developers." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon className={classes.listItemIcon}>
                        <CircleSmall />
                      </ListItemIcon>
                      <ListItemText primary="Oversaw and mentored a team of 5 frontend developers to complete 3 major revenue-growing projects ahead of schedule by having pair programming sessions and code reviews regularly." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon className={classes.listItemIcon}>
                        <CircleSmall />
                      </ListItemIcon>
                      <ListItemText primary="Advocated for UI and code consistency by creating design patterns and managing dependency upgrades, enhancing app stability and user experience." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon className={classes.listItemIcon}>
                        <CircleSmall />
                      </ListItemIcon>
                      <ListItemText primary="Collaborated with backend engineers on API design so REST endpoints were scalable to support multiple microservices and frontend applications." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon className={classes.listItemIcon}>
                        <CircleSmall />
                      </ListItemIcon>
                      <ListItemText primary="Migrated existing React projects to TypeScript which laid out the structure and configuration for future React projects." />
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
                      <ListItemIcon className={classes.listItemIcon}>
                        <CircleSmall />
                      </ListItemIcon>
                      <ListItemText primary="Developed applications using domain driven design with C# for REST APIs and created single page applications using AngularJS, TypeScript, and Bootstrap for a payroll, benefits, and human resources SaaS platform." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon className={classes.listItemIcon}>
                        <CircleSmall />
                      </ListItemIcon>
                      <ListItemText primary="In 3 months led a project to build a mobile first onboarding dashboard to be released and presented at the company's annual client facing conference." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon className={classes.listItemIcon}>
                        <CircleSmall />
                      </ListItemIcon>
                      <ListItemText primary="Developed a custom reporting single page application using AngularJS for 6,000+ clients, enhancing their accounting and business insights." />
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
              <TimelineContent data-sal={!isPrint && !isExtraSmallDown ? 'slide-left' : null} data-sal-duration="500" data-sal-easing="ease-in-out-quart">
                <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Edison Chouest Offshore
                  </Typography>
                  <Typography variant="subtitle2" component="h2" color="textSecondary" gutterBottom>
                    Programmer
                  </Typography>
                  <Hidden mdUp>
                    <Typography variant="body2" color="textSecondary">
                      {chouestDate}
                    </Typography>
                  </Hidden>
                  <List dense={isPrint}>
                    <ListItem>
                      <ListItemIcon className={classes.listItemIcon}>
                        <CircleSmall />
                      </ListItemIcon>
                      <ListItemText primary="Built a tool to store excel spreadsheets for logic controller's configuration files using Node.js, Express, MySQL Bootstrap, and jQuery that helped with better organization and searchability of data." />
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
                data-sal={!isPrint && !isExtraSmallDown ? (isSmallDown ? 'slide-left' : 'slide-right') : null}
                data-sal-duration="500"
                data-sal-easing="ease-in-out-quart"
              >
                <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    South Central Planning and Development Commission
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
                      <ListItemIcon className={classes.listItemIcon}>
                        <CircleSmall />
                      </ListItemIcon>
                      <ListItemText primary="Built a custom contact form using PHP, Bootstrap, and jQuery for a permitting SaaS platform to guide customers in resolving their issues and reduce support calls." />
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
