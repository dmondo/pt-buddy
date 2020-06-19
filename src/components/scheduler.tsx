import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CalendarWidget from './CalendarWidget';
import { store } from '../store/store';

const Scheduler = (): JSX.Element => {
  const { state, dispatch } = React.useContext(store);
  const { scheduling } = state;

  const schedule = (): void => {
    dispatch({ type: 'SCHEDULING', payload: !scheduling });
  };

  return (
    <>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={schedule}
          >
            { scheduling ? 'close scheduler' : 'schedule new  reminder'}
          </Button>
        </Grid>
        <Grid item>
          {scheduling && <CalendarWidget />}
        </Grid>
      </Grid>
    </>
  );
};

export default Scheduler;
