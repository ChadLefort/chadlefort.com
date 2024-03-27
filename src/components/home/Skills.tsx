import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ViteIcon } from '../icons/ViteIcon';
import { MUIIcon } from '../icons/MUIIcon';
import { BootstrapIcon } from '../icons/BootstrapIcon';
import { NodeJSIcon } from '../icons/NodeJSIcon';
import { GraphQLIcon } from '../icons/GraphQLIcon';
import { VueIcon } from '../icons/VueIcon';
import { TypeScriptIcon } from '../icons/TypeScriptIcon';
import { ReduxIcon } from '../icons/ReduxIcon';
import { ReactIcon } from '../icons/ReactIcon';
import { VitestIcon } from '../icons/VitestIcon';
import { SassIcon } from '../icons/SassIcon';
import { WebpackIcon } from '../icons/WebpackIcon';
import { DockerIcon } from '../icons/DockerIcon';
import { CICDIcon } from '../icons/CICDIcon';
import { TestingLibraryIcon } from '../icons/TestingLibrary';
import { StorybookIcon } from '../icons/StorybookIcon';
import { PaperIcon } from '../PaperIcon';
import { NuxtIcon } from '../icons/NuxtIcon';
import { JavaScriptIcon } from '../icons/JavaScriptIcon';
import { HTMLIcon } from '../icons/HTMLIcon';
import { CSSIcon } from '../icons/CSSIcon';
import { GitIcon } from '../icons/GitIcon';
import { TypeORMIcon } from '../icons/TypeORMIcon';
import { PiniaIcon } from '../icons/PiniaIcon';
import { MSWIcon } from '../icons/MSWIcon';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8, 2),
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4)
    },
    '@media print': {
      padding: theme.spacing(1.5, 0),
      backgroundColor: theme.palette.common.white
    }
  }
}));

export const Skills: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root} id="skills">
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography variant="h4" align="center" gutterBottom>
            Skills
          </Typography>
          <Grid container justifyContent="center">
            <PaperIcon name="TypeScript">
              <TypeScriptIcon />
            </PaperIcon>

            <PaperIcon name="JavaScript">
              <JavaScriptIcon />
            </PaperIcon>

            <PaperIcon name="React">
              <ReactIcon />
            </PaperIcon>

            <PaperIcon name="Redux">
              <ReduxIcon />
            </PaperIcon>

            <PaperIcon name="Vue">
              <VueIcon />
            </PaperIcon>

            <PaperIcon name="Nuxt">
              <NuxtIcon />
            </PaperIcon>

            <PaperIcon name="Pinia">
              <PiniaIcon />
            </PaperIcon>

            <PaperIcon name="Vite">
              <ViteIcon />
            </PaperIcon>

            <PaperIcon name="Vitest">
              <VitestIcon />
            </PaperIcon>

            <PaperIcon name="Testing Lib">
              <TestingLibraryIcon />
            </PaperIcon>

            <PaperIcon name="MSW">
              <MSWIcon />
            </PaperIcon>

            <PaperIcon name="Webpack">
              <WebpackIcon />
            </PaperIcon>

            <PaperIcon name="Node JS">
              <NodeJSIcon />
            </PaperIcon>

            <PaperIcon name="GraphQL">
              <GraphQLIcon />
            </PaperIcon>

            <PaperIcon name="TypeORM">
              <TypeORMIcon />
            </PaperIcon>

            <PaperIcon name="Sass">
              <SassIcon />
            </PaperIcon>

            <PaperIcon name="Bootstrap">
              <BootstrapIcon />
            </PaperIcon>

            <PaperIcon name="Material-UI">
              <MUIIcon />
            </PaperIcon>

            <PaperIcon name="Storybook">
              <StorybookIcon />
            </PaperIcon>

            <PaperIcon name="HTML">
              <HTMLIcon />
            </PaperIcon>

            <PaperIcon name="CSS">
              <CSSIcon />
            </PaperIcon>

            <PaperIcon name="Git">
              <GitIcon />
            </PaperIcon>

            <PaperIcon name="Docker">
              <DockerIcon />
            </PaperIcon>

            <PaperIcon name="CI/CD">
              <CICDIcon />
            </PaperIcon>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
