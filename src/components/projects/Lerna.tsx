import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TypeScriptIcon } from '../icons/TypeScriptIcon';
import { ReactIcon } from '../icons/ReactIcon';
import { ReduxIcon } from '../icons/ReduxIcon';
import { LernaIcon } from '../icons/LernaIcon';
import { JenkinsIcon } from '../icons/JenkinsIcon';
import { NPMIcon } from '../icons/NPMIcon';
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
  }
}));

export const Lerna: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography variant="h4" align="center" gutterBottom className={classes.title}>
            Lerna Monorepo Migration
          </Typography>
          <Grid container>
            <Grid container alignContent="center" item xs={12}>
              <Typography paragraph>
                Saved hours of manual deployment time by creating a monorepo with Lerna for 17 React apps and 6 NPM packages, leading to cost efficiency and improved productivity
                for a team of 7 frontend developers.
              </Typography>
              <Typography paragraph>
                I encountered challenges in configuring Typescript to integrate with shared packages, and a substantial portion of the project involved ensuring that our continuous
                integration system, Jenkins, effectively built and released Docker containers and NPM packages.
              </Typography>
            </Grid>
          </Grid>

          <Grid container justifyContent="center">
            <PaperIcon name="Lerna">
              <LernaIcon />
            </PaperIcon>

            <PaperIcon name="Jenkins">
              <JenkinsIcon />
            </PaperIcon>

            <PaperIcon name="NPM">
              <NPMIcon />
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
