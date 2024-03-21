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
import { Autoplay, EffectCards } from 'swiper/modules';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8, 2),
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4)
    },
    '@media print': {
      display: 'none'
    }
  },
  large: {
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(30),
      height: theme.spacing(30)
    }
  },
  swiperContainer: {
    padding: theme.spacing(0, 7, 0, 0),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 4, 2, 5),
      display: 'flex',
      justifyContent: 'center'
    }
  },
  swiper: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      width: '240px'
    }
  }
}));

export const AboutMe: React.FC = () => {
  const classes = useStyles();
  const {
    allFile: { nodes }
  } = useStaticQuery<{ allFile: { nodes: { childImageSharp: { fluid: FluidObject } }[] } }>(
    graphql`
      query {
        allFile(filter: { relativeDirectory: { eq: "about" } }, sort: { fields: [name], order: ASC }) {
          nodes {
            childImageSharp {
              fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    `
  );

  return (
    <Grid item xs={12} className={classes.root} id="about-me">
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography variant="h4" align="center" gutterBottom>
            About Me
          </Typography>
          <Grid container>
            <Grid item xs={12} md={3} className={classes.swiperContainer}>
              <Swiper
                slidesPerView={1}
                grabCursor={true}
                effect={'cards'}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false
                }}
                modules={[Autoplay, EffectCards]}
                className={classes.swiper}
              >
                {nodes.map((node, index) => (
                  <SwiperSlide>
                    <Avatar key={index} alt="About Me Image" variant="rounded" className={classes.large} component={Img} fluid={node.childImageSharp.fluid} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
            <Grid container alignContent="center" item xs={12} md={8} lg={9}>
              <Typography paragraph>
                I've been a technology enthusiast ever since a young age. Whether it's looking at source code or computer hardware, I've always enjoyed tinkering around to
                understand how things work. Shortly after I was given my first computer at 11 years old, I started the journey of creating web sites and fell in love with the web
                and programming.
              </Typography>
              <Typography paragraph>
                When I'm not programming, I enjoy taking daily walks with my wife Melanie and taking naps on the couch with my cat. I also enjoy skateboarding a couple of times
                week (even though my knees don't), riding my bike on trails, playing guitar, and adventuring in video games!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
