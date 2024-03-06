import React from 'react';

type Props = {
  htmlAttributes: object;
  headComponents: JSX.Element[];
  bodyAttributes: object;
  preBodyComponents: JSX.Element[];
  body: string;
  postBodyComponents: JSX.Element[];
};

const HTML: React.FC<Props> = ({ htmlAttributes, headComponents, bodyAttributes, preBodyComponents, body, postBodyComponents }) => (
  // eslint-disable-next-line jsx-a11y/html-has-lang
  <html lang="en" {...htmlAttributes}>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      {headComponents}
    </head>
    <body {...bodyAttributes}>
      {preBodyComponents}
      <noscript>This website requires JavaScript.</noscript>
      <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
      {postBodyComponents}
    </body>
  </html>
);

export default HTML;
