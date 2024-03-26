import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import EmailIcon from 'mdi-material-ui/Email';
import GithubIcon from 'mdi-material-ui/Github';
import LinkedinIcon from 'mdi-material-ui/Linkedin';
import Grid from '@material-ui/core/Grid';
import Img from 'gatsby-image';
import PhoneIcon from 'mdi-material-ui/Phone';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

import { useProfileImage } from '../../hooks/useProfileImage';
import { Logo } from '../Logo';

const useStyles = makeStyles((theme: Theme) => ({
  medium: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  avatar: {
    paddingRight: theme.spacing(1.5)
  },
  icon: {
    margin: theme.spacing(0, 1)
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  link: {
    fontSize: 12
  }
}));

export const PrintHeaderContent: React.FC = () => {
  const classes = useStyles();
  const fluid = useProfileImage();

  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid container item xs={8} alignItems="center">
          <Grid item className={classes.avatar}>
            <Avatar alt="Chad Lefort" className={classes.medium} component={Img} fluid={fluid} loading="eager" />
          </Grid>
          <Grid item>
            <Logo variant="h2" component="h1" />
            <Typography color="textSecondary" variant="h5">
              Senior Frontend Engineer
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={4} alignItems="center" justifyContent="flex-end">
          <Box>
            <Box display="flex" alignItems="center">
              <PhoneIcon fontSize="small" className={classes.icon} />
              <Link href="tel:+19856964781" target="_blank" rel="noopener" className={classes.link} color="inherit" underline="none">
                (985) 696-4781
              </Link>
            </Box>
            <Box display="flex" alignItems="center">
              <EmailIcon fontSize="small" className={classes.icon} />
              <Link href="mailto:chadlefort@gmail.com" target="_blank" rel="noopener" className={classes.link} color="inherit" underline="none">
                chadlefort@gmail.com
              </Link>
            </Box>
            <Box display="flex" alignItems="center">
              <GithubIcon fontSize="small" className={classes.icon} />
              <Link href="https://github.com/ChadLefort" target="_blank" rel="noopener" className={classes.link} color="inherit" underline="none">
                https://github.com/ChadLefort
              </Link>
            </Box>
            <Box display="flex" alignItems="center">
              <LinkedinIcon fontSize="small" className={classes.icon} />
              <Link href="https://linkedin.com/in/chadlefort" target="_blank" rel="noopener" className={classes.link} color="inherit" underline="none">
                https://linkedin.com/in/chadlefort
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />
    </>
  );
};
