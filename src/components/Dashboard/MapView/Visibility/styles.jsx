import { createUseStyles } from 'react-jss';

import { breakpoints } from '../../../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  container: {
    backgroundColor: theme.background.primary,
    boxShadow: theme.defaultShadow,
    borderRadius: 5,
    height: 40,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',

    [breakpoints.max.smd]: {
      width: '100%',
    },
  },
  button: {
    '&.MuiButtonBase-root': {
      borderRadius: 0,
      minHeight: 40,
      maxHeight: 40,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      textTransform: 'none',
      whiteSpace: 'nowrap',
      padding: '0px 15px',

      '&:first-of-type': {
        borderRadius: '5px 0px 0px 5px',
      },
      '&:last-of-type': {
        borderRadius: '0px 5px 5px 0px',
      },
      [breakpoints.max.smd]: {
        minWidth: 'calc(50% - 1px)',
      },
    },
  },
  separator: {
    width: 1,
    height: '50%',
    backgroundColor: theme.separator,
  },
}));

export default useStyles;
