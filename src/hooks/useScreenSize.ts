import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export function useScreenSize() {
  const theme = useTheme();
  const isSmallDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmallDown = useMediaQuery(theme.breakpoints.down('xs'));
  const isPrint = useMediaQuery('print');

  return { isSmallDown, isExtraSmallDown, isPrint };
}
