import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { WebpackIcon } from '../icons/WebpackIcon';
import { TypeScriptIcon } from '../icons/TypeScriptIcon';
import { ReactIcon } from '../icons/ReactIcon';
import { ReduxIcon } from '../icons/ReduxIcon';
import { MUIIcon } from '../icons/MUIIcon';
import { NxIcon } from '../icons/NxIcon';
import { JenkinsIcon } from '../icons/JenkinsIcon';
import { Link } from '@material-ui/core';
import { PaperIcon } from '../PaperIcon';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    flexGrow: 1,
    padding: theme.spacing(8, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4)
    }
  },
  title: {
    marginBottom: theme.spacing(4)
  },
  subTitle: {
    opacity: 0.7,
    fontWeight: 600
  },
  secondaryTitle: {
    marginTop: theme.spacing(4)
  }
}));

export const ModuleFederation: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography variant="h4" align="center" gutterBottom className={classes.title}>
            Micro Frontend with Webpack 5 Module Federation
            <Typography paragraph className={classes.subTitle}>
              Jan 2021 - Mar 2021
            </Typography>
          </Typography>
          <Grid container>
            <Grid container alignContent="center" item xs={12}>
              <Typography paragraph>
                At the time, this client faced significant challenges with application updates, deployments, and overall workflow, particularly when it came to creating pull
                requests for ticket resolution. At times it could take up to 4 to 7 pull requests to get your issue to code review. Many of the concepts showcased in this demo
                application were successfully incorporated into their production applications and workflow.
              </Typography>
              <Typography paragraph>
                The demo application I built for the client demonstrates the use of Webpack 5 Module Federation to address these issues. It consists of multiple federated modules
                designed to enhance app functionality and necessitate frequent updates. I integrated these modules into a monorepo using NX. The applications showcased in the demo
                were built with React and Redux, featuring the implementation of injectable Redux reducers.
              </Typography>
              <Typography paragraph>
                If you want to learn more about the project, you can check out the{' '}
                <Link href="https://github.com/ChadLefort/mf-mfe-demo" target="_blank" rel="noopener" underline="none">
                  GitHub repository
                </Link>
                . The repository contains a detailed{' '}
                <Link href="https://github.com/ChadLefort/mf-mfe-demo/blob/master/README.md" target="_blank" rel="noopener" underline="none">
                  README file
                </Link>{' '}
                that goes into explaining how to setup and run the project. Additionally, it also contains infomation on the{' '}
                <Link href="https://github.com/ChadLefort/mf-mfe-demo/blob/master/docs/ARCHITECTURE.md" target="_blank" rel="noopener" underline="none">
                  architecture
                </Link>
                .
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h5" align="center" gutterBottom className={classes.secondaryTitle}>
            Built With
          </Typography>

          <Grid container justifyContent="center">
            <PaperIcon name="Webpack">
              <WebpackIcon />
            </PaperIcon>

            <PaperIcon name="Nx">
              <NxIcon />
            </PaperIcon>

            <PaperIcon name="Jenkins">
              <JenkinsIcon />
            </PaperIcon>

            <PaperIcon name="React">
              <ReactIcon />
            </PaperIcon>

            <PaperIcon name="Redux">
              <ReduxIcon />
            </PaperIcon>

            <PaperIcon name="TypeScript">
              <TypeScriptIcon />
            </PaperIcon>

            <PaperIcon name="Material-UI">
              <MUIIcon />
            </PaperIcon>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
