module.exports = {
  siteMetadata: {
    title: 'Chad Lefort - Frontend Engineer',
    siteUrl: 'https://chadlefort.com',
    siteName: 'Chad Lefort',
    description: `I'm Chad Lefort, a frontend engineer from Covington, Louisiana. I'm passionate and motivated about the web and always pushing myself and the web forward.`,
    lang: 'en-US',
    avatar: '/me.png',
    image: '/logo.png',
    email: 'chadlefort@gmail.com',
    jobTitle: 'Frontend Engineer'
  },
  plugins: [
    'gatsby-plugin-preact',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-material-ui',
    'gatsby-plugin-offline',
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
        name: 'Chad Lefort - Frontend Engineer',
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
      resolve: '@slixites/gatsby-plugin-google-fonts',
      options: {
        fonts: ['Open Sans:400,600', 'Roboto:500', 'Fjalla One', 'Consolas'],
        display: 'swap',
        preconnect: true,
        attributes: {
          rel: 'stylesheet preload prefetch',
          as: 'style'
        }
      }
    },
    {
      resolve: 'gatsby-plugin-polyfill-io',
      options: {
        features: ['CustomEvent']
      }
    },
    'gatsby-plugin-netlify'
  ]
};
