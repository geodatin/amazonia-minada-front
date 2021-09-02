import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { useTheme } from 'react-jss';
import GetAppIcon from '@material-ui/icons/GetApp';
import useStyles from './styles';

export default function ListHeader() {
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.wrapper}>
      <Typography variant="body2" style={{ color: theme.text.secondary }}>
        53 resultados encontrados
      </Typography>
      <Button startIcon={<GetAppIcon />}>
        <Typography variant="caption" style={{ color: theme.text.primary }}>
          Baixar CSV
        </Typography>
      </Button>
    </div>
  );
}