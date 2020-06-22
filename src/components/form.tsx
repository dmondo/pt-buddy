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

  const reminderErrorHandle = (): boolean => {
    const text = (document.getElementById('reminder') as HTMLInputElement).value;
    let valid = true;
    if (text.length < 1) { valid = false; }
    dispatch({ type: 'REMINDERERROR', payload: !valid });
    return valid;
  };

  const tagErrorHandle = (): boolean => {
    const tag = (document.getElementById('tag') as HTMLInputElement).value;
    let valid = true;
    if (tag.length < 1) { valid = false; }
    dispatch({ type: 'TAGERROR', payload: !valid });
    return valid;
  };

  const newReminder = (): void => {
    if (!reminderErrorHandle() || !tagErrorHandle()) { return; }
    const { reminders } = state;
    const reminder = {
      tag: (document.getElementById('tag') as HTMLInputElement).value,
      text: (document.getElementById('reminder') as HTMLInputElement).value,
      uuid: uuidv4(),
    };
    const newReminders = [...reminders, reminder];
    dispatch({ type: 'REMINDERS', payload: newReminders });
  };

  const phoneErrorHandle = (): boolean => {
    const phone = (document.getElementById('patientNumber') as HTMLInputElement).value;
    let valid = true;
    for (let i = 0; i < phone.length; i += 1) {
      if (Number.isNaN(Number(phone[i]))) {
        valid = false;
        break;
      }
    }
    if (phone.length !== 10) { valid = false; }
    dispatch({ type: 'PATIENTERROR', payload: !valid });
    return valid;
  };

  const nameErrorHandle = (): boolean => {
    const name = (document.getElementById('patientName') as HTMLInputElement).value;
    let valid = true;
    if (name.length < 1) { valid = false; }
    dispatch({ type: 'NAMEERROR', payload: !valid });
    return valid;
  };

  const newPatient = (): void => {
    if (!nameErrorHandle() || !phoneErrorHandle()) { return; }

    const { patients } = state;
    const patient = {
      name: (document.getElementById('patientName') as HTMLInputElement).value,
      phone: (document.getElementById('patientNumber') as HTMLInputElement).value,
      uuid: uuidv4(),
    };
    const newPatients = [...patients, patient];
    dispatch({ type: 'PATIENTS', payload: newPatients });
  };

  const {
    patientError,
    nameError,
    tagError,
    reminderError,
  } = state;

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
              error={reminderError}
              helperText={reminderError ? 'invalid reminder' : ''}
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
              error={tagError}
              helperText={tagError ? 'invalid tag' : ''}
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
              error={nameError}
              helperText={nameError ? 'invalid name' : ''}
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
              error={patientError}
              helperText={patientError ? 'invalid phone number' : ''}
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
