import 'swiper/css';
import 'swiper/css/effect-cards';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Img, { FluidObject } from 'gatsby-image';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4)
    }
  },
  large: {
    width: '100%',
    height: '100%'
  },
  swiper: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 4, 2, 5),
      display: 'flex',
      justifyContent: 'center'
    }
  },
  item: {
    margin: theme.spacing(2),
    maxWidth: 110,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1)
    }
  },
  paper: {
    padding: theme.spacing(1)
  },
  icon: {
    margin: theme.spacing(1, 2)
  }
}));

export const SpearCart: React.FC = () => {
  const [img, setImg] = React.useState<FluidObject | null>(null);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (node: { childImageSharp: { fluid: FluidObject } }) => {
    setImg(node.childImageSharp.fluid);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  const {
    allFile: { nodes }
  } = useStaticQuery<{ allFile: { nodes: { childImageSharp: { fluid: FluidObject } }[] } }>(
    graphql`
      query {
        allFile(filter: { relativeDirectory: { eq: "cart" } }, sort: { fields: [name], order: ASC }) {
          nodes {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    `
  );

  return (
    <>
      <Grid item xs={12} className={classes.root} id="about-me">
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} lg={8} xl={6}>
            <Typography variant="h4" align="center" gutterBottom>
              Spear Cart
            </Typography>
            <Grid container>
              <Grid item xs={12} className={classes.swiper}>
                <div>
                  <Swiper
                    slidesPerView={2}
                    spaceBetween={30}
                    grabCursor={true}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false
                    }}
                  >
                    {nodes.map((node, index) => (
                      <SwiperSlide onClick={() => handleClickOpen(node)}>
                        <Avatar key={index} alt="Spear Cart" variant="rounded" className={classes.large} component={Img} fluid={node.childImageSharp.fluid} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </Grid>
              <Grid container alignContent="center" item xs={12}>
                <Typography paragraph>
                  Built and architected a new mobile-first cart for an education SaaS platform tailored to dentists and their practices. This project revitalized the cart by
                  enhancing user experience, reducing friction points, and introducing promotional code functionality which exceeded new membership signup goals by 25%. This cart
                  was specifically designed to accommodate various cart types including memberships, campus events, and future offerings. Previously, different areas of the
                  education platform had their own separate carts, but the primary goal of this project was to introduce a new redesign and consolidate them into a single cohesive
                  solution.
                </Typography>
                <Typography paragraph>
                  The application was developed using Vue, Nuxt, Typescript, and Bootstrap, with Laravel serving as the backend REST API. It also made use of Vue's composable API,
                  VeeValidate to handle form validation, and incorporated client-side mocks using Mock Service Worker. Extensive code coverage was ensured through unit tests
                  written with Vue Testing Library with meaningful code coverage averaging around 80%.
                </Typography>
              </Grid>
            </Grid>

            <Grid container justifyContent="center">
              <Grid item className={classes.item}>
                <Paper elevation={0} variant="elevation" className={classes.paper}>
                  <Box className={classes.icon}>
                    <TypeScriptIcon />
                  </Box>
                  <Typography variant="body2" align="center">
                    TypeScript
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogContent></DialogContent>
      </Dialog>
    </>
  );
};
