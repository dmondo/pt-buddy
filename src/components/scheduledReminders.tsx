import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
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

const ScheduledReminders = ({ scheduled }: { scheduled: IScheduled }): JSX.Element => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const { state, dispatch } = React.useContext(store);

  const deleteReminder = async (): Promise<void> => {
    const { scheduledReminders } = state;
    const newReminders = [];
    scheduledReminders.forEach((reminder: IScheduled) => {
      if (reminder.uuid !== scheduled.uuid) {
        newReminders.push(reminder);
      }
    });

    dispatch({ type: 'SCHEDULED', payload: newReminders });

    const url = '/reminders';
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uuid: scheduled.uuid }),
    };
    await fetch(url, options);
  };

  return (
    <>
      <Typography variant="body2" component="p">
        {bull}
        {`${scheduled.tag} - ${scheduled.patients} - ${scheduled.day} - ${scheduled.time}`}
      </Typography>
      <CardActions>
        <Button
          size="small"
          onClick={deleteReminder}
        >
          delete
        </Button>
      </CardActions>
    </>
  );
};

export default ScheduledReminders;
