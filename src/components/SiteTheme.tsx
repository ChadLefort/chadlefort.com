import CssBaseline from '@material-ui/core/CssBaseline';
import React, { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

type Theme = 'light' | 'dark';
type ThemeContext = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeContext>({} as ThemeContext);

export const SiteTheme: React.FC = ({ children }) => {
  const defaultPreference = useMediaQuery('(prefers-color-scheme: light)') ? 'light' : 'dark';
  const [theme, setTheme] = useState<Theme>(defaultPreference);
  const prefersDarkMode = theme === 'dark';

  const toggleTheme = () => {
    const oppositeTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(oppositeTheme);
    localStorage.setItem('theme', oppositeTheme);
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme') as Theme | null;
    setTheme(theme || defaultPreference);
  }, [defaultPreference]);

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
          fontFamily: `"Open Sans", "Helvetica", "Arial", sans-serif`,
          fontWeight: 600
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
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
