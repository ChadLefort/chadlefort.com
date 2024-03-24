import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { TypeScriptIcon } from '../icons/TypeScriptIcon';
import { ReactIcon } from '../icons/ReactIcon';
import { ReduxIcon } from '../icons/ReduxIcon';
import { LernaIcon } from '../icons/LernaIcon';
import { JenkinsIcon } from '../icons/JenkinsIcon';
import { NPMIcon } from '../icons/NPMIcon';
import { PaperIcon } from '../PaperIcon';
import { Project } from './Project';

const TextContent: React.FC = () => (
  <Grid container alignContent="center" item xs={12}>
    <Typography paragraph>
      Saved hours of manual deployment time by creating a monorepo with Lerna for 17 React apps and 6 NPM packages, leading to cost efficiency and improved productivity for a team
      of 7 frontend developers.
    </Typography>
    <Typography paragraph>
      I encountered challenges in configuring Typescript to integrate with shared packages, and a substantial portion of the project involved ensuring that our continuous
      integration system, Jenkins, effectively built and released Docker containers and NPM packages. Our packages still needed to be published to NPM as we have a couple of
      external legacy applications that consumed them for components. I also had to ensure that our Jenkins pipeline was able to build and deploy our applications in parallel as
      previously we had to build and release them one by one.
    </Typography>
  </Grid>
);

const BuiltWith: React.FC = () => (
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
);

export const Lerna: React.FC = () => <Project title="Lerna Monorepo Migration" subtitle="Oct 2019 - Dec 2019" TextContent={TextContent} BuiltWith={BuiltWith} />;
