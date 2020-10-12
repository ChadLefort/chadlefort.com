import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export function useScreenSize() {
  const theme = useTheme();
  const isSmallDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeUp = useMediaQuery(theme.breakpoints.up('lg'));
  const smallDown = theme.breakpoints.down('sm');

  return { isSmallDown, isLargeUp, smallDown };
}
