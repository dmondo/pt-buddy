import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Button from '@material-ui/core/Button';
import PhoneIcon from '@material-ui/icons/Phone';
import { v4 as uuidv4 } from 'uuid';
import { store } from '../store/store';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const Form = (): JSX.Element => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(store);
  // TODO: validate input to make sure not empty
  // TODO: allow deleting reminders/patients
  const newReminder = (): void => {
    const { reminders } = state;
    const reminder = {
      tag: (document.getElementById('tag') as HTMLInputElement).value,
      text: (document.getElementById('reminder') as HTMLInputElement).value,
      uuid: uuidv4(),
    };
    const newReminders = [...reminders, reminder];
    dispatch({ type: 'REMINDERS', payload: newReminders });
  };

  const newPatient = (): void => {
    const { patients } = state;
    const patient = {
      name: (document.getElementById('patientName') as HTMLInputElement).value,
      phone: (document.getElementById('patientNumber') as HTMLInputElement).value,
      uuid: uuidv4(),
    };
    const newPatients = [...patients, patient];
    dispatch({ type: 'PATIENTS', payload: newPatients });
  };

  return (
    <Grid container spacing={1} direction="column">
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <EventNoteIcon />
          </Grid>
          <Grid item>
            <TextField
              label="new reminder"
              id="reminder"
              color="secondary"
            />
          </Grid>
          <Grid item>
            <EventNoteIcon />
          </Grid>
          <Grid item>
            <TextField
              label="tag"
              id="tag"
              color="secondary"
            />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={newReminder}
            >
              submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <PersonAddIcon />
          </Grid>
          <Grid item>
            <TextField
              label="new patient name"
              id="patientName"
              color="secondary"
            />
          </Grid>
          <Grid item>
            <PhoneIcon />
          </Grid>
          <Grid item>
            <TextField
              label="new patient number"
              id="patientNumber"
              color="secondary"
            />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={newPatient}
            >
              submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default Form;
