import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    borderBottom: '1px solid',
    borderBottomColor: theme.separator,
  },
  company: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  infos: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
  },
  infoItem: {
    minWidth: '120px',
    width: '45%',
    display: 'flex',
    flexFlow: 'column nowrap',
    marginRight: 10,
  },
  circle: {
    minWidth: '10px',
    height: '10px',
    marginRight: '8px',
    borderRadius: '100%',
    display: 'inline-block',
  },
}));

export default useStyles;
