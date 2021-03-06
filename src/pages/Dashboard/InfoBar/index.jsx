import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Button, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import CustomButton from '../../../components/CustomButton';
import TabPanel from '../../../components/Dashboard/InfoBar/TabPanel';
import AdvancedSearch from '../../../components/Dashboard/Search/AdvancedSearch';
import SimpleSearch from '../../../components/Dashboard/Search/SimpleSearch';
import { breakpoints } from '../../../constants/constraints';
import FilteringContext from '../../../contexts/filtering';
import List from './List';
import Statistics from './Statistics';
import useStyles from './styles';

/**
 *  This component provides the container for statistics and list.
 */
export default function InfoBar({ searchEnabled }) {
  InfoBar.defaultProps = {
    searchEnabled: true,
  };

  InfoBar.propTypes = {
    searchEnabled: PropTypes.bool,
  };

  const classes = useStyles();
  const { t } = useTranslation();
  const [value, setValue] = useState(0);

  const {
    values: { isAdvancedSearch },
  } = useContext(FilteringContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [minimized, setMinimized] = useState(false);
  const [offset, setOffset] = useState(0);
  const isSmd = useMediaQuery(breakpoints.max.smd);
  const infoBarRef = useRef();
  const theme = useTheme();

  /* This function returns a11y properties */
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  /**
   * Set minimized value to false when the SM size is setted.
   */
  useEffect(() => {
    if (isSmd) {
      setMinimized(false);
    }
  }, [isSmd]);

  /**
   * This function handle when infobar is opened or closed.
   */
  const handleInfoBarExhibition = (opened) => {
    if (opened) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }
  };

  /**
   * This useEffect set offset when page is scrolled.
   */
  useEffect(() => {
    const setOpened = () => {
      setOffset(window.scrollY);
    };

    window.addEventListener('scroll', setOpened);
  }, []);

  return (
    <div ref={infoBarRef} className={classes.container}>
      {!isSmd && (
        <div className={classes.minimizeWrapper}>
          <Button
            className={classes.minimizeButton}
            onClick={() => setMinimized(!minimized)}
          >
            <NavigateBeforeIcon
              className={classes.icon}
              style={{
                transform: minimized ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </Button>
        </div>
      )}
      <div
        className={classes.wrapper}
        style={
          minimized
            ? {
                width: 0,
                minWidth: 0,
                maxWidth: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                opacity: 0,
              }
            : {}
        }
      >
        {searchEnabled && (
          <div className={classes.searchContainer}>
            {isAdvancedSearch ? <AdvancedSearch /> : <SimpleSearch />}
          </div>
        )}
        <CustomButton
          className={classes.dropBar}
          handleOnClick={() => handleInfoBarExhibition(offset > 300)}
        >
          <Typography
            style={{
              color: theme.text.secondary,
              fontWeight: 500,
            }}
          >
            {offset > 300
              ? t('dashboard.infoPanel.dropBar.viewMap')
              : t('dashboard.infoPanel.dropBar.viewStatistics')}
          </Typography>
          <ExpandLessRoundedIcon
            className={classes.arrowIcon}
            style={{
              color: theme.text.secondary,
              transform:
                offset > 300
                  ? 'translateY(-50%) rotate(0deg)'
                  : 'translateY(-50%) rotate(180deg)',
            }}
          />
        </CustomButton>

        <Tabs
          className={classes.tab}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          aria-label="simple tabs example"
          variant="fullWidth"
        >
          <Tab
            label={t('dashboard.infoPanel.statistics.title')}
            {...a11yProps(0)}
          />
          <Tab label={t('dashboard.infoPanel.list.title')} {...a11yProps(1)} />
          <div className={classes.tabFooter} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Statistics />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <List />
        </TabPanel>
      </div>
    </div>
  );
}
