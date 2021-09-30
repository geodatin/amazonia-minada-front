import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  container: {
    position: 'relative',
    boxShadow: theme.defaultShadow,
    width: '100%',
    padding: '10px 0px',
    borderRadius: 5,
    backgroundColor: theme.background.primary,
    transition: 'height 0.3s ease',
  },
  dataTypeFilterSelector: { maxWidth: 120 },
  autocomplete: {
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"]':
      {
        paddingRight: 95,
      },
  },
  textfield: {
    '& .MuiInputBase-input': {
      padding: 10,
      paddingLeft: 30,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      display: 'none',
    },
    '& .MuiAutocomplete-endAdornment': {
      display: 'none',
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child':
      {
        paddingRight: 40,
        width: '100%',
      },
  },
  popper: {
    '& .MuiPaper-root': {
      backgroundColor: theme.background.primary,
      color: theme.text.primary,
      borderRadius: 5,
      boxShadow: theme.defaultShadow,
    },
    '& .MuiAutocomplete-listbox': {
      paddingTop: 0,
      overflow: 'auto',

      '&::-webkit-scrollbar': {
        width: 8,
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: theme.background.secondary,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.grey,
        borderRadius: 10,
      },
    },
    '& .MuiListSubheader-sticky': {
      position: 'sticky',
      backgroundColor: theme.background.primary,
    },
    '& .MuiAutocomplete-option[data-focus="true"]': {
      backgroundColor: theme.button.focused,
      transition: 'background-color 0.2s ease',

      '&:active': {
        backgroundColor: theme.button.active,
      },
    },
    '& .MuiAutocomplete-option[aria-selected="true"]': {
      backgroundColor: theme.button.selected,

      '&:hover': {
        backgroundColor: theme.button.selectedHover,
      },
    },
  },
  buttons: {
    position: 'absolute',
    top: 29,
    right: 10,
    transform: 'translateY(-50%)',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    fontSize: 5,
    '&.MuiIconButton-root': {
      color: theme.text.primary,
    },
  },
  separator: {
    width: 1,
    height: 30,
    margin: '0px 0px 0px 10px',
    backgroundColor: theme.separator,
  },
  searchIcon: {
    marginRight: 5,

    '&.MuiIconButton-root': {
      color: theme.text.primary,
    },
  },
  searchFooterWrapper: {
    padding: '10px 14px 0px 20px',
  },
  activeFilters: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  filterIconWrapper: {
    maxWidth: 120,
    marginRight: 10,
    marginTop: 10,
    border: '0.5px solid gray',
    borderRadius: '20px',
  },
  filterIcon: {
    display: 'flex',
    flexFlow: 'row nowrap',
    margin: '0px 5px 0px 10px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textButton: {
    cursor: 'pointer',
  },
  minimizeButton: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
}));

export default useStyles;