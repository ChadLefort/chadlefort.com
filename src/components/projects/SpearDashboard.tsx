import 'swiper/css';
import 'swiper/css/pagination';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Img, { FluidObject } from 'gatsby-image';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BootstrapIcon } from '../icons/BootstrapIcon';
import { GraphQLIcon } from '../icons/GraphQLIcon';
import { VueIcon } from '../icons/VueIcon';
import { TypeScriptIcon } from '../icons/TypeScriptIcon';
import { VitestIcon } from '../icons/VitestIcon';
import { TestingLibraryIcon } from '../icons/TestingLibrary';
import { StorybookIcon } from '../icons/StorybookIcon';
import { TypeORMIcon } from '../icons/TypeORMIcon';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { DialogContent } from '@material-ui/core';
import CloseIcon from 'mdi-material-ui/Close';
import { Pagination } from 'swiper/modules';
import { useScreenSize } from '../../hooks/useScreenSize';
import { NuxtIcon } from '../icons/NuxtIcon';
import { MSWIcon } from '../icons/MSWIcon';
import { PaperIcon } from '../PaperIcon';

type Node = { nodes: { childImageSharp: { fluid: FluidObject } }[] };

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    flexGrow: 1,
    padding: theme.spacing(8, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4)
    }
  },
  large: {
    width: '100%',
    height: '100%',
    cursor: 'pointer'
  },
  swiperContainer: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
      display: 'flex',
      justifyContent: 'center'
    }
  },
  appBar: {
    position: 'sticky'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'end'
  },
  title: {
    marginBottom: theme.spacing(4)
  }
}));

const Transition = React.forwardRef(function Transition(props: TransitionProps & { children?: React.ReactElement }, ref: React.Ref<unknown>) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const SpearDashboard: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<FluidObject | null>(null);
  const [isMobileImage, setIsMobileImage] = useState(false);
  const { isSmallDown } = useScreenSize();

  const { thumbnail, full } = useStaticQuery<{ thumbnail: Node; full: Node }>(
    graphql`
      query {
        thumbnail: allFile(filter: { relativeDirectory: { eq: "dashboard" } }, sort: { fields: [name], order: ASC }) {
          nodes {
            childImageSharp {
              fluid(cropFocus: NORTH, maxWidth: 1200, maxHeight: 800, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
        full: allFile(filter: { relativeDirectory: { eq: "dashboard" } }, sort: { fields: [name], order: ASC }) {
          nodes {
            childImageSharp {
              fluid(maxWidth: 1980, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    `
  );

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(full.nodes[index].childImageSharp.fluid);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (selectedImage?.src.includes('mobile')) {
      setIsMobileImage(true);
    } else {
      setIsMobileImage(false);
    }
  }, [selectedImage]);

  return (
    <>
      <Grid item xs={12} className={classes.root}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} lg={8} xl={6}>
            <Typography variant="h4" align="center" gutterBottom className={classes.title}>
              Spear Dashboard
            </Typography>
            <Grid container>
              <Grid item xs={12} className={classes.swiperContainer}>
                <Swiper
                  slidesPerView={isSmallDown ? 1 : 2}
                  spaceBetween={40}
                  pagination={{
                    clickable: true
                  }}
                  modules={[Pagination]}
                >
                  {thumbnail.nodes.map((node, index) => (
                    <SwiperSlide onClick={() => handleThumbnailClick(index)}>
                      <Avatar key={index} alt="Spear Dashboard" variant="rounded" className={classes.large} component={Img} fluid={node.childImageSharp.fluid} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
              <Grid container alignContent="center" item xs={12}>
                <Typography paragraph>
                  Built and architected a new mobile-first dashboard for an education SaaS platform tailored to dentists and their practices. Each area of the platform is
                  represented by a widget on the dashboard, requiring me to quickly familiarize myself with the entire platform.
                </Typography>
                <Typography paragraph>
                  Drawing from my experience with the previous project I worked on, this application was also developed using Vue, Nuxt, Typescript, GraphQL, and Bootstrap.
                  Additionally, it leveraged Vue's composable API and featured fully typed GraphQL type definitions generated using GraphQL Code Generator. Client-side mocks were
                  implemented using Mock Service Worker, and extensive code coverage was achieved through unit tests written with Vue Testing Library with meaningful code coverage
                  averaging around 80%.
                </Typography>
                <Typography paragraph>
                  The project underwent multiple rounds of UX reviews, including A/B testing and several beta releases to users, culminating in a successful launch. The dashboard
                  witnessed substantial growth across all aspects of the website with significant increases in views, clicks, and user engagement, ranging from 325% to 9564% over a
                  90 day period.
                </Typography>
              </Grid>
            </Grid>

            <Grid container justifyContent="center">
              <PaperIcon name="Vue">
                <VueIcon />
              </PaperIcon>

              <PaperIcon name="Nuxt">
                <NuxtIcon />
              </PaperIcon>

              <PaperIcon name="TypeScript">
                <TypeScriptIcon />
              </PaperIcon>

              <PaperIcon name="Bootstrap">
                <BootstrapIcon />
              </PaperIcon>

              <PaperIcon name="GraphQL">
                <GraphQLIcon />
              </PaperIcon>

              <PaperIcon name="TypeORM">
                <TypeORMIcon />
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

              <PaperIcon name="Storybook">
                <StorybookIcon />
              </PaperIcon>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog fullScreen open={open} scroll="body" onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} elevation={0}>
          <Toolbar className={classes.toolbar}>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid container justifyContent="center">
            <Grid item xs={isMobileImage ? 2 : 8}>
              {selectedImage && <Avatar alt="Spear Dashboard" variant="rounded" component={Img} fluid={selectedImage} style={{ height: '100%', width: '100%' }} />}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
