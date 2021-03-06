import { InfoOutlined } from '@mui/icons-material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import {
  IconButton,
  ListSubheader,
  Popper,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import { breakpoints } from '../../../../constants/constraints';
import { filterDefaults } from '../../../../constants/options';
import FilteringContext from '../../../../contexts/filtering';
import api from '../../../../services/api';
import CustomTooltip from '../../../CustomTooltip';
import useStyles from './styles';

/**
 * This component works as the simple search autocomplete.
 */
export default function SimpleSearch() {
  const {
    values: { searchValue, isAdvancedSearch, isSearchExpanded },
    setters: {
      setSearchValue,
      setIsAdvancedSearch,
      setIsSearchExpanded,
      setMobileSearchHeight,
    },
    loaders: { paramsLoaded },
  } = useContext(FilteringContext);

  const theme = useTheme();
  const classes = useStyles({ theme });
  const { t } = useTranslation();
  const smd = useMediaQuery(breakpoints.max.smd);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const autocompleteRef = useRef();
  const [firstLoad, setFirstLoad] = useState(true);
  const simpleSearchRef = useRef();

  /**
   * This useEffect loads the search value with the route params.
   */
  useEffect(() => {
    if (paramsLoaded) {
      const searchValueKeys = Object.keys(searchValue);

      if (Object.keys(searchValue).length > 0) {
        const firstKey = searchValueKeys[0];
        setValue({ type: firstKey, value: searchValue[firstKey][0] });
      }

      setFirstLoad(false);
    }
  }, [paramsLoaded]);

  /**
   * This usEffect does the search.
   */
  useEffect(() => {
    let subscribed = true;

    // The search will work only if the input value has a length bigger than 0 characters.
    if (inputValue.length > 0 && inputValue.trim().length > 0) {
      setLoading(true);

      api.get(`search/${inputValue}`).then(({ data }) => {
        if (subscribed) {
          setLoading(false);
          let newOptions = [];

          if (
            value &&
            data.filter((o) => o.type === value.type && o.value === value.value)
              .length === 0
          ) {
            newOptions = [value];
          }

          if (data) {
            newOptions = [...newOptions, ...data];
          }

          setOptions(newOptions);
        }
      });
    }

    return () => {
      subscribed = false;
    };
  }, [value, inputValue]);

  /**
   * Handles the autocomplete's extra button, that works as a cleaner when there is
   * an input value, and as an expansion button when the autocomplete is empty.
   */
  function handleExtraButton() {
    if (value || inputValue.length > 0) {
      inputRef.current.blur();
      setInputValue('');
      setValue(null);
    } else {
      setIsSearchExpanded(!isSearchExpanded);
    }
  }

  /**
   * This useEffect converts the value to the searchValue.
   */
  useEffect(() => {
    if (value) {
      setSearchValue(() => ({
        [value.type]: [value.value],
      }));
    } else if (!firstLoad) {
      setSearchValue(filterDefaults.searchValue);
    }
  }, [value]);

  /**
   * This useEffect clean the value when searchValue is empty.
   */
  useEffect(() => {
    if (Object.keys(searchValue).length === 0) {
      setInputValue('');
      setValue(null);
    }
  }, [searchValue]);

  const handleFilterSwitcher = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
  };

  /**
   * This useEffect update search height when it is expanded.
   */
  useEffect(() => {
    setMobileSearchHeight(simpleSearchRef.current.clientHeight);
    return () => setMobileSearchHeight(0);
  }, [isSearchExpanded]);

  return (
    <div
      ref={simpleSearchRef}
      style={isSearchExpanded ? { height: 85 } : { height: 55 }}
      className={classes.container}
    >
      <Autocomplete
        id="search-box"
        autoHighlight
        selectOnFocus
        disableClearable
        loading={loading}
        loadingText={t('dashboard.search.searching')}
        forcePopupIcon={false}
        options={options}
        getOptionLabel={(option) => option.value}
        value={value}
        noOptionsText={t('dashboard.search.noOptions')}
        className={classes.autocomplete}
        getOptionSelected={(option) =>
          option.type === value.type && option.value === value.value
        }
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          setIsSearchExpanded(false);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <>
            <div className={classes.buttons}>
              <SearchRoundedIcon className={classes.searchIcon} />
              <span className={classes.separator} />
              <IconButton
                className={classes.iconButton}
                size="small"
                onClick={() => handleExtraButton()}
              >
                {inputValue === '' ? <TuneRoundedIcon /> : <CloseRoundedIcon />}
              </IconButton>
            </div>
            <TextField
              {...params}
              inputRef={inputRef}
              margin="none"
              size="small"
              placeholder={t('dashboard.search.bigPlaceholder')}
              variant="outlined"
              classes={{ root: classes.textfield }}
              fullWidth
            />
          </>
        )}
        PopperComponent={(props) =>
          inputValue !== '' ? (
            <Popper
              ref={autocompleteRef}
              disablePortal={smd}
              {...props}
              className={classes.popper}
            />
          ) : null
        }
        renderGroup={(params, index) => [
          <ListSubheader key={`${params.group}_${index}`} component="div">
            {t(`dashboard.search.grouping.${params.group}`)}
          </ListSubheader>,
          params.children,
        ]}
        groupBy={(option) => option.type}
      />
      <div
        className={classes.filterSwitcherWrapper}
        style={{ opacity: isSearchExpanded ? 1 : 0 }}
      >
        <CustomTooltip
          title={
            <span style={{ whiteSpace: 'pre-line' }}>
              {t('dashboard.search.searchInfo1')}

              {t('dashboard.search.searchInfo2')}
            </span>
          }
          placement="bottom"
        >
          <InfoOutlined
            style={{
              color: theme.text.tertiary,
              fontSize: '15px',
              cursor: 'pointer',
            }}
          />
        </CustomTooltip>
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleFilterSwitcher()}
          onKeyDown={() => handleFilterSwitcher()}
          className={classes.filterSwitcherButton}
        >
          <Typography style={{ color: theme.text.tertiary }} variant="body2">
            {t(`dashboard.search.doAdvancedSearch`)}
          </Typography>
        </div>
      </div>
    </div>
  );
}
