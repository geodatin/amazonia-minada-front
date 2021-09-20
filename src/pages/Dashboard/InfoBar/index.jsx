import { Button, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import TabPanel from '../../../components/Dashboard/InfoBar/TabPanel';
import SimpleSearch from '../../../components/Dashboard/Search/SimpleSearch';
import { breakpoints } from '../../../constants/constraints';
import List from './List';
import Statistics from './Statistics';
import useStyles from './styles';

/**
 *  This component provides the container for statistics and list.
 */
export default function InfoBar() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [minimized, setMinimized] = useState(false);
  const isSm = useMediaQuery(breakpoints.max.sm);
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
    if (isSm) {
      setMinimized(false);
    }
  }, [isSm]);

  return (
    <div className={classes.container}>
      {!isSm && (
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
        <div className={classes.searchContainer}>
          <SimpleSearch />
        </div>
        <div className={classes.dropBar}>
          <Typography
            style={{
              color: theme.text.secondary,
              fontWeight: 500,
            }}
          >
            {t('dashboard.infoPanel.dropBar.viewStatistics')}
          </Typography>
          <ExpandLessRoundedIcon
            className={classes.arrowIcon}
            style={{ color: theme.text.secondary }}
          />
        </div>
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
