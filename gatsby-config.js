module.exports = {
  siteMetadata: {
    title: 'Chad Lefort - Frontend Developer',
    siteUrl: 'https://chadlefort.com',
    siteName: 'Chad Lefort',
    description: `I'm Chad Lefort, a frontend developer from Convington, Louisiana. I'm passionate and motivated about the web and always pushing myself and the web forward.`,
    lang: 'en-US',
    avatar: '/me.png',
    image: '/logo.png',
    email: 'chadlefort@gmail.com',
    jobTitle: 'Frontend Developer'
  },
  plugins: [
    'gatsby-plugin-material-ui',
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Chad Lefort - Frontend Developer',
        short_name: 'Chad Lefort',
        start_url: '/',
        background_color: '#e0e0e0',
        theme_color: '#424242',
        display: 'standalone',
        icon: 'src/images/icon.png'
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Open+Sans:400,600', 'Roboto:500', 'Economica:700']
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-43761615-3',
        head: false
      }
    }
  ]
};
