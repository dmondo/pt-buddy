import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { store } from '../store/store';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ReminderConstructor = (): JSX.Element => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(store);
  const {
    addReminder,
    selectedPatient,
    pickingDate,
    parsedDates,
    addTime,
    addAM,
  } = state;

  const clearInput = (): void => {
    dispatch({ type: 'ADDREMINDER', payload: '' });
    dispatch({ type: 'SELECTPATIENT', payload: '' });
    dispatch({ type: 'ADDDATE', payload: 'daily' });
    dispatch({ type: 'ADDDATES', payload: [] });
    dispatch({ type: 'ADDTIME', payload: '' });
    dispatch({ type: 'ADDAM', payload: '' });
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6" component="h2">
            {`new reminder: ${addReminder} - ${selectedPatient} `}
            {!pickingDate ? 'daily ' : parsedDates.join(', ')}
            {` ${addTime}${addAM}`}
          </Typography>
          <CardActions>
            <Button
              size="small"
              onClick={clearInput}
            >
              cancel
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
};

export default ReminderConstructor;
