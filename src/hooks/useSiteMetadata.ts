import { graphql, useStaticQuery } from 'gatsby';

type Data = {
  title: string;
  siteUrl: string;
  siteName: string;
  description: string;
  lang: string;
  avatar: string;
  image: string;
  email: string;
  jobTitle: string;
};

export function useSiteMetadata() {
  const {
    site: { siteMetadata }
  } = useStaticQuery<{ site: { siteMetadata: Data } }>(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
          siteName
          description
          lang
          avatar
          image
          email
          jobTitle
        }
      }
    }
  `);

  return siteMetadata;
}
