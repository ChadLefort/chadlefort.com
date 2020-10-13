import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export const SiteTheme: React.FC = ({ children }) => {
  const muiTheme = responsiveFontSizes(
    createMuiTheme({
      palette: {
        primary: {
          main: grey[800]
        },
        secondary: {
          main: grey[500]
        },
        background: {
          default: grey[300],
          paper: grey[100]
        },
        text: {
          secondary: 'rgba(0, 0, 0, 0.6)'
        }
      },
      typography: {
        body1: {
          fontFamily: `"Open Sans", "Helvetica", "Arial", sans-serif`,
          '@media print': {
            fontSize: 12
          }
        },
        body2: {
          fontFamily: `"Open Sans", "Helvetica", "Arial", sans-serif`,
          '@media print': {
            fontSize: 12
          }
        },
        button: {
          fontFamily: `"Open Sans", "Helvetica", "Arial", sans-serif`
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
