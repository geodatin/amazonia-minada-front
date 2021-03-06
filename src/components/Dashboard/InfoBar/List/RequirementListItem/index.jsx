import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This component represents a requirement list item.
 */
function RequirementListItemComponent({ data }) {
  RequirementListItemComponent.propTypes = {
    data: PropTypes.PropTypes.shape().isRequired,
  };

  const theme = useTheme();
  const classes = useStyles({ theme });
  const { t } = useTranslation();

  if (!data) {
    return null;
  }

  return (
    <li className={classes.wrapper}>
      <div className={classes.company}>
        <Typography
          style={{
            color: theme.text.primary,
            fontSize: 14,
            margin: '10px 0px 10px 0px',
            display: 'inline',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
          variant="h5"
        >
          <div
            className={classes.circle}
            style={{
              backgroundColor: theme.miningProcesses[data.miningProcessType],
            }}
          />
          {data.company.toUpperCase()}
        </Typography>
      </div>

      <div className={classes.infos}>
        <div className={classes.infoItem}>
          <Typography
            style={{ color: theme.text.secondary, fontSize: 11 }}
            variant="caption"
          >
            {t(`dashboard.infoPanel.list.item.process`)}
          </Typography>
          <Typography style={{ color: theme.text.primary }} variant="body1">
            {data.process}
          </Typography>
        </div>

        <div className={classes.infoItem}>
          <Typography
            style={{ color: theme.text.secondary, fontSize: 11 }}
            variant="caption"
          >
            {t(`dashboard.infoPanel.list.item.year`)}
          </Typography>
          <Typography style={{ color: theme.text.primary }} variant="body1">
            {data.year}
          </Typography>
        </div>

        <div className={classes.infoItem}>
          <Typography
            style={{ color: theme.text.secondary, fontSize: 11 }}
            variant="caption"
          >
            {t(`dashboard.infoPanel.list.item.area`)}
          </Typography>
          <Typography style={{ color: theme.text.primary }} variant="body1">
            {t('general.number', { value: data.area })} ha
          </Typography>
        </div>

        <div className={classes.infoItem}>
          <Typography
            style={{ color: theme.text.secondary, fontSize: 11 }}
            variant="caption"
          >
            {t(`dashboard.infoPanel.list.item.type`)}
          </Typography>
          <Typography style={{ color: theme.text.primary }} variant="body1">
            {t(`dashboard.dataType.territorialUnits.${data.type}.singular`)}
          </Typography>
        </div>

        <div className={classes.infoItem}>
          <Typography
            style={{ color: theme.text.secondary, fontSize: 11 }}
            variant="caption"
          >
            {t(`dashboard.infoPanel.list.item.territory`)}
          </Typography>
          <Typography style={{ color: theme.text.primary }} variant="body1">
            {data.territory}
          </Typography>
        </div>

        <div className={classes.infoItem}>
          <Typography
            style={{ color: theme.text.secondary, fontSize: 11 }}
            variant="caption"
          >
            {t(`dashboard.infoPanel.list.item.state`)}
          </Typography>
          <Typography style={{ color: theme.text.primary }} variant="body1">
            {data.state}
          </Typography>
        </div>

        {data.type === 'indigenousLand' && (
          <>
            <div className={classes.infoItem}>
              <Typography
                style={{ color: theme.text.secondary, fontSize: 11 }}
                variant="caption"
              >
                {t(`dashboard.infoPanel.list.item.reserveEthnicity`)}
              </Typography>
              <Typography style={{ color: theme.text.primary }} variant="body1">
                {data.reserveEthnicity}
              </Typography>
            </div>

            <div className={classes.infoItem}>
              <Typography
                style={{ color: theme.text.secondary, fontSize: 11 }}
                variant="caption"
              >
                {t(`dashboard.infoPanel.list.item.reservePhase`)}
              </Typography>
              <Typography style={{ color: theme.text.primary }} variant="body1">
                {data.reservePhase}
              </Typography>
            </div>
          </>
        )}

        <div className={classes.infoItem}>
          <Typography
            style={{ color: theme.text.secondary, fontSize: 11 }}
            variant="caption"
          >
            {t(`dashboard.infoPanel.list.item.substance`)}
          </Typography>
          <Typography style={{ color: theme.text.primary }} variant="body1">
            {data.substance}
          </Typography>
        </div>

        <div className={classes.infoItem}>
          <Typography
            style={{ color: theme.text.secondary, fontSize: 11 }}
            variant="caption"
          >
            {t(`dashboard.infoPanel.list.item.use`)}
          </Typography>
          <Typography style={{ color: theme.text.primary }} variant="body1">
            {data.use}
          </Typography>
        </div>
      </div>

      <div>
        <Typography
          style={{ color: theme.text.secondary, fontSize: 11 }}
          variant="caption"
        >
          {t(`dashboard.infoPanel.list.item.miningProcess`)}
        </Typography>
        <Typography style={{ color: theme.text.primary }} variant="body1">
          {data.miningProcess}
        </Typography>
      </div>

      <div style={{ marginBottom: 10 }}>
        <Typography
          style={{ color: theme.text.secondary, fontSize: 11 }}
          variant="caption"
        >
          {t(`dashboard.infoPanel.list.item.lastEvent`)}
        </Typography>
        <Typography style={{ color: theme.text.primary }} variant="body1">
          {data.lastEvent}
        </Typography>
      </div>
    </li>
  );
}

export const RequirementListItem = React.memo(RequirementListItemComponent);
