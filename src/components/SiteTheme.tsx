import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export const SiteTheme: React.FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const muiTheme = responsiveFontSizes(
    createMuiTheme({
      palette: {
        primary: {
          main: prefersDarkMode ? grey[900] : grey[800]
        },
        secondary: {
          main: prefersDarkMode ? grey[700] : grey[300]
        },
        background: {
          default: prefersDarkMode ? grey['A400'] : grey[200],
          paper: prefersDarkMode ? grey[800] : grey[200]
        },
        text: {
          secondary: prefersDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)'
        },
        type: prefersDarkMode ? 'dark' : 'light'
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
