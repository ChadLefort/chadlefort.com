import { FluidObject } from 'gatsby-image';
import { graphql, useStaticQuery } from 'gatsby';

export function useProfileImage() {
  const {
    file: {
      childImageSharp: { fluid }
    }
  } = useStaticQuery<{ file: { childImageSharp: { fluid: FluidObject } } }>(
    graphql`
      query {
        file(relativePath: { eq: "me.png" }) {
          childImageSharp {
            fluid(maxWidth: 500, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `
  );

  return fluid;
}
