module.exports = {
  siteMetadata: {
    title: 'Chad Lefort - Senior Frontend Engineer',
    siteUrl: 'https://chadlefort.com',
    siteName: 'Chad Lefort',
    description: `I'm Chad Lefort, a senior frontend engineer from Mandeville, Louisiana with 11+ years of development experience.`,
    lang: 'en-US',
    avatar: 'https://chadlefort.com/me.png',
    image: 'https://chadlefort.com/card.png',
    email: 'chadlefort@gmail.com',
    jobTitle: 'Senior Frontend Engineer'
  },
  plugins: [
    'gatsby-plugin-preact',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-material-ui',
    'gatsby-plugin-offline',
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-plugin-scroll-reveal',
      options: {
        threshold: 0.5
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Chad Lefort - Senior Frontend Engineer',
        short_name: 'Chad Lefort',
        start_url: '/',
        background_color: '#e0e0e0',
        theme_color: '#424242',
        display: 'standalone',
        icon: 'src/images/icon.png',
        icon_options: {
          purpose: 'maskable'
        }
      }
    },
    {
      resolve: 'gatsby-plugin-polyfill-io',
      options: {
        features: ['CustomEvent']
      }
    },
    'gatsby-plugin-cloudflare-pages'
  ]
};
