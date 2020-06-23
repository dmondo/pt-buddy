import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { store } from '../store/store';
import Reminders from './reminders';
import Patients from './patients';
import ScheduledReminders from './scheduledReminders';

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

const History = (): JSX.Element => {
  const classes = useStyles();
  const { state } = React.useContext(store);
  const { reminders, patients, scheduledReminders } = state;

  return (
    <Grid container spacing={1} direction="row">
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                your reminders
              </Typography>
              {
                reminders.map((reminder: IReminder) => (
                  <Reminders
                    reminder={reminder}
                    key={reminder.uuid}
                  />
                ))
              }
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                your patients
              </Typography>
              {
                patients.map((patient: IClientPatient) => (
                  <Patients
                    patient={patient}
                    key={patient.uuid}
                  />
                ))
              }
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              your scheduled reminders
            </Typography>
            {
              scheduledReminders.map((scheduled: IScheduled) => (
                <ScheduledReminders
                  scheduled={scheduled}
                  key={scheduled.uuid}
                />
              ))
            }
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default History;
