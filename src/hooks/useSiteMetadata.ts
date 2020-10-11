import { graphql, useStaticQuery } from 'gatsby';

type Data = {
  title: string;
  siteUrl: string;
  description: string;
  lang: string;
};

export function useSiteMetadata() {
  const {
    site: { siteMetadata }
  } = useStaticQuery<{ site: { siteMetadata: Data } }>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            description
            lang
          }
        }
      }
    `
  );

  return siteMetadata;
}
