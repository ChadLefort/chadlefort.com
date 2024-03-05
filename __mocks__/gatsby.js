const React = require('react');
const gatsby = jest.requireActual('gatsby');
const { siteMetadata } = require('../gatsby-config');

module.exports = {
  ...gatsby,
  graphql: vitest.fn(),
  Link: vitest.fn().mockImplementation(({ activeClassName, activeStyle, getProps, innerRef, partiallyActive, ref, replace, to, ...rest }) =>
    React.createElement('a', {
      ...rest,
      href: to
    })
  ),
  StaticQuery: vitest.fn(),
  useStaticQuery: vitest.fn().mockImplementation(() => ({
    site: { siteMetadata },
    file: {
      childImageSharp: {
        fluid: {
          aspectRatio: 1.1682242990654206,
          sizes: '(max-width: 500px) 100vw, 500px',
          src: '/static/a06af2cc41af2fb5e7cdf7bf38ba1e24/46604/me.png',
          srcSet:
            '/static/a06af2cc41af2fb5e7cdf7bf38ba1e24/62d80/me.png 125w,↵/static/a06af2cc41af2fb5e7cdf7bf38ba1e24/e1953/me.png 250w,↵/static/a06af2cc41af2fb5e7cdf7bf38ba1e24/46604/me.png 500w'
        }
      }
    }
  }))
};
