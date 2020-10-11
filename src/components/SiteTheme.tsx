import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { grey, red } from '@material-ui/core/colors';

export const SiteTheme: React.FC = ({ children }) => {
  const muiTheme = responsiveFontSizes(
    createMuiTheme({
      palette: {
        primary: {
          main: grey[800]
        },
        secondary: {
          main: red[500]
        },
        background: {
          default: grey[300],
          paper: grey[100]
        }
      },
      typography: {
        body1: {
          fontFamily: `'Open Sans', sans-serif`
        },
        body2: {
          fontFamily: `'Open Sans', sans-serif`
        },
        button: {
          fontFamily: `'Open Sans', sans-serif`
        }
      },
      props: {
        MuiTypography: {
          variantMapping: {
            h3: 'h1',
            h4: 'h2',
            h5: 'h3',
            h6: 'h4'
          }
        }
      }
    })
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
