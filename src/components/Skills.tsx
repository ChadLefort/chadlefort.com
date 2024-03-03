import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useScreenSize } from '../hooks/useScreenSize';
import { ViteIcon } from './icons/ViteIcon';
import { MUIIcon } from './icons/MUIIcon';
import { BootstrapIcon } from './icons/BootstrapIcon';
import { NodeJSIcon } from './icons/NodeJSIcon';
import { GraphQLIcon } from './icons/GraphQLIcon';
import { VueIcon } from './icons/VueIcon';
import { TypeScriptIcon } from './icons/TypeScriptIcon';
import { ReduxIcon } from './icons/ReduxIcon';
import { ReactIcon } from './icons/ReactIcon';
import { VitestIcon } from './icons/VitestIcon';
import { SassIcon } from './icons/SassIcon';
import { WebpackIcon } from './icons/WebpackIcon';
import { DockerIcon } from './icons/DockerIcon';
import { CICDIcon } from './icons/CICDIcon';
import { TestingLibraryIcon } from './icons/TestingLibrary';
import { GitIcon } from './icons/GitIcon';

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
  },
  item: {
    margin: theme.spacing(2),
    maxWidth: 110,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1)
    },
    '@media print': {
      maxWidth: 75,
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    padding: theme.spacing(1),
    '@media print': {
      padding: theme.spacing(0.5),
      backgroundColor: theme.palette.common.white
    }
  },
  icon: {
    margin: theme.spacing(1, 2)
  }
}));

export const Skills: React.FC = () => {
  const classes = useStyles();
  const { isPrint } = useScreenSize();

  return (
    <Grid item xs={12} className={classes.root} id="skills">
      <Grid container justifyContent="center">
        <Grid item xs={isPrint ? 12 : 6}>
          <Typography variant="h4" align="center" gutterBottom>
            Skills
          </Typography>
          <Grid container justifyContent="center">
            <Grid item className={classes.item}>
              <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                <Box className={classes.icon}>
                  <ReactIcon />
                </Box>
                <Typography variant="body2" align="center">
                  React
                </Typography>
              </Paper>
            </Grid>

            <Grid item className={classes.item}>
              <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                <Box className={classes.icon}>
                  <ReduxIcon />
                </Box>
                <Typography variant="body2" align="center">
                  Redux
                </Typography>
              </Paper>
            </Grid>

            <Grid item className={classes.item}>
              <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                <Box className={classes.icon}>
                  <TypeScriptIcon />
                </Box>
                <Typography variant="body2" align="center">
                  TypeScript
                </Typography>
              </Paper>
            </Grid>

            <Grid item className={classes.item}>
              <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                <Box className={classes.icon}>
                  <VueIcon />
                </Box>
                <Typography variant="body2" align="center">
                  Vue
                </Typography>
              </Paper>
            </Grid>

            <Grid item className={classes.item}>
              <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                <Box className={classes.icon}>
                  <GraphQLIcon />
                </Box>
                <Typography variant="body2" align="center">
                  GraphQL
                </Typography>
              </Paper>
            </Grid>

            <Grid item className={classes.item}>
              <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                <Box className={classes.icon}>
                  <NodeJSIcon />
                </Box>
                <Typography variant="body2" align="center">
                  Node JS
                </Typography>
              </Paper>
            </Grid>

            <Grid item className={classes.item}>
              <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                <Box className={classes.icon}>
                  <SassIcon />
                </Box>
                <Typography variant="body2" align="center">
                  Sass
                </Typography>
              </Paper>
            </Grid>

            <Grid item className={classes.item}>
              <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                <Box className={classes.icon}>
                  <BootstrapIcon />
                </Box>
                <Typography variant="body2" align="center">
                  Bootstrap
                </Typography>
              </Paper>
            </Grid>

            <Grid item className={classes.item}>
              <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                <Box className={classes.icon}>
                  <MUIIcon />
                </Box>
                <Typography variant="body2" align="center">
                  Material-UI
                </Typography>
              </Paper>
            </Grid>

            <Grid item className={classes.item}>
              <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                <Box className={classes.icon}>
                  <WebpackIcon />
                </Box>
                <Typography variant="body2" align="center">
                  Webpack
                </Typography>
              </Paper>
            </Grid>

            <Grid item className={classes.item}>
              <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                <Box className={classes.icon}>
                  <ViteIcon />
                </Box>
                <Typography variant="body2" align="center">
                  Vite
                </Typography>
              </Paper>
            </Grid>

            <Grid item className={classes.item}>
              <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                <Box className={classes.icon}>
                  <VitestIcon />
                </Box>
                <Typography variant="body2" align="center">
                  Vitest
                </Typography>
              </Paper>
            </Grid>

            <Grid item className={classes.item}>
              <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                <Box className={classes.icon}>
                  <TestingLibraryIcon />
                </Box>
                <Typography variant="body2" align="center">
                  Testing Lib
                </Typography>
              </Paper>
            </Grid>

            <Grid item className={classes.item}>
              <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                <Box className={classes.icon}>
                  <GitIcon />
                </Box>
                <Typography variant="body2" align="center">
                  Git
                </Typography>
              </Paper>
            </Grid>

            <Grid item className={classes.item}>
              <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                <Box className={classes.icon}>
                  <DockerIcon />
                </Box>
                <Typography variant="body2" align="center">
                  Docker
                </Typography>
              </Paper>
            </Grid>

            <Grid item className={classes.item}>
              <Paper elevation={0} variant={isPrint ? 'outlined' : 'elevation'} className={classes.paper}>
                <Box className={classes.icon}>
                  <CICDIcon />
                </Box>
                <Typography variant="body2" align="center">
                  CI/CD
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
