/* eslint-disable no-unused-vars */
import { createUseStyles } from 'react-jss';
import { breakpoints, sizes } from '../../../../constants/constraints';

const useStyles = createUseStyles((/* theme */) => ({
  wrapper: {
    width: '100%',
    height: '100%',
    [breakpoints.max.sm]: {
      height: `calc(100% - ${61 + sizes.infoBarHeaderHeight}px)`,
    },
  },
}));

export default useStyles;
