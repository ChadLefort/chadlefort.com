import 'swiper/css';
import 'swiper/css/pagination';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Img, { FluidObject } from 'gatsby-image';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from 'mdi-material-ui/Close';
import { Keyboard, Pagination } from 'swiper/modules';
import Link from '@material-ui/core/Link';

import { BootstrapIcon } from '../icons/BootstrapIcon';
import { VueIcon } from '../icons/VueIcon';
import { TypeScriptIcon } from '../icons/TypeScriptIcon';
import { VitestIcon } from '../icons/VitestIcon';
import { TestingLibraryIcon } from '../icons/TestingLibrary';
import { StorybookIcon } from '../icons/StorybookIcon';
import { useScreenSize } from '../../hooks/useScreenSize';
import { NuxtIcon } from '../icons/NuxtIcon';
import { MSWIcon } from '../icons/MSWIcon';
import { PaperIcon } from '../PaperIcon';
import { Project } from './Project';
import { LaravelIcon } from '../icons/LaravelIcon';
import { SassIcon } from '../icons/SassIcon';
import { DockerIcon } from '../icons/DockerIcon';
import { PiniaIcon } from '../icons/PiniaIcon';

type Node = { nodes: { childImageSharp: { fluid: FluidObject } }[] };

const useStyles = makeStyles((theme: Theme) => ({
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
  }
}));

const Transition = React.forwardRef(function Transition(props: TransitionProps & { children?: React.ReactElement }, ref: React.Ref<unknown>) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TextContent: React.FC = () => (
  <Grid container alignContent="center" item xs={12}>
    <Typography paragraph>
      Built and architected a new mobile-first cart for an education SaaS platform tailored to dentists and their practices. This project revitalized the cart by enhancing user
      experience, reducing friction points, and introducing promotional code functionality which exceeded new membership signup goals by 25%. This cart was specifically designed to
      accommodate various cart types including memberships, campus events, and future offerings. Previously, different areas of the education platform had their own separate carts,
      but the primary goal of this project was to introduce a new redesign and consolidate them into a single cohesive solution.
    </Typography>
    <Typography paragraph>
      The application was developed using Vue, Nuxt, Typescript, and Bootstrap, with Laravel serving as the backend REST API. It also made use of Vue's composable API, VeeValidate
      to handle form validation, and incorporated client-side mocks using Mock Service Worker. Extensive code coverage was ensured through unit tests written with Vue Testing
      Library with meaningful code coverage averaging around 80%.
    </Typography>
    <Typography paragraph>
      While the project might change in the future, you can check out the{' '}
      <Link href="https://signup.speareducation.com/" target="_blank" rel="noopener" underline="none">
        Spear Cart
      </Link>{' '}
      to see the current version. Please be mindful that the website is a live production version.
    </Typography>
  </Grid>
);

const BuiltWith: React.FC = () => (
  <Grid container justifyContent="center">
    <PaperIcon name="Vue">
      <VueIcon />
    </PaperIcon>

    <PaperIcon name="Nuxt">
      <NuxtIcon />
    </PaperIcon>

    <PaperIcon name="Pinia">
      <PiniaIcon />
    </PaperIcon>

    <PaperIcon name="TypeScript">
      <TypeScriptIcon />
    </PaperIcon>

    <PaperIcon name="Bootstrap">
      <BootstrapIcon />
    </PaperIcon>

    <PaperIcon name="Sass">
      <SassIcon />
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

    <PaperIcon name="Laravel">
      <LaravelIcon />
    </PaperIcon>

    <PaperIcon name="Docker">
      <DockerIcon />
    </PaperIcon>
  </Grid>
);

export const SpearCart: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { isSmallDown } = useScreenSize();

  const { thumbnail, full } = useStaticQuery<{ thumbnail: Node; full: Node }>(graphql`
    query {
      thumbnail: allFile(filter: { relativeDirectory: { eq: "sign-up" } }, sort: { fields: [name], order: ASC }) {
        nodes {
          childImageSharp {
            fluid(maxWidth: 1200, maxHeight: 725, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
      full: allFile(filter: { relativeDirectory: { eq: "sign-up" } }, sort: { fields: [name], order: ASC }) {
        nodes {
          childImageSharp {
            fluid(maxWidth: 1980, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  `);

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SwiperImages: React.FC = () => (
    <Grid item xs={12} className={classes.swiperContainer}>
      <Swiper slidesPerView={isSmallDown ? 1 : 2} spaceBetween={40} keyboard pagination={{ clickable: true }} modules={[Pagination, Keyboard]}>
        {thumbnail.nodes.map((node, index) => (
          <SwiperSlide onClick={() => handleThumbnailClick(index)}>
            <Avatar key={index} alt="Spear Cart" variant="rounded" className={classes.large} component={Img} fluid={node.childImageSharp.fluid} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );

  return (
    <>
      <Project title="Spear Cart" subtitle="Aug 2023 - Feb 2024" SwiperImages={SwiperImages} TextContent={TextContent} BuiltWith={BuiltWith} />
      <Dialog fullScreen open={open} scroll="body" onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} elevation={0}>
          <Toolbar className={classes.toolbar} disableGutters>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
              <Swiper slidesPerView={1} autoHeight keyboard initialSlide={selectedImage ?? 0} modules={[Keyboard]}>
                {full.nodes.map((node, index) => (
                  <SwiperSlide>
                    <Avatar key={index} alt="Spear Cart" variant="rounded" component={Img} fluid={node.childImageSharp.fluid} style={{ width: '100%', height: '100%' }} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
