import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { v4 as uuidv4 } from 'uuid';
import Select from '@material-ui/core/Select';
import Calendar from 'react-calendar';
import ReminderConstructor from './reminderConstructor';
import { store } from '../store/store';
import '../styles/scheduler.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

// TODO display selectedDates dates below calendar when using date picker

const CalendarWidget = (): JSX.Element => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(store);
  const {
    reminders,
    patients,
    pickingDate,
    addReminder,
    addPatients,
    selectedPatient,
    addDate,
    selectedDates,
    parsedDates,
    addTime,
    addAM,
  } = state;

  const handleDate = (): void => {
    dispatch({ type: 'DATE', payload: !pickingDate });
  };

  const addScheduled = (): void => {
    if (
      selectedPatient === ''
      || addTime === ''
      || addReminder === ''
    ) {
      return;
    }

    const { scheduledReminders } = state;

    const defaultAM = (addAM === '') ? 'am' : addAM;

    const newScheduled: IScheduled = {
      uuid: uuidv4(),
      day: selectedDates.length ? parsedDates : addDate,
      patients: selectedPatient,
      time: `${addTime}${defaultAM}`,
      tag: addReminder,
    };

    const updatedScheduled = [...scheduledReminders, newScheduled];
    dispatch({ type: 'SCHEDULED', payload: updatedScheduled });
    dispatch({ type: 'ADDREMINDER', payload: '' });
    dispatch({ type: 'ADDPATIENTS', payload: [] });
    dispatch({ type: 'SELECTPATIENT', payload: '' });
    dispatch({ type: 'ADDDATE', payload: 'daily' });
    dispatch({ type: 'ADDTIME', payload: '' });
    dispatch({ type: 'ADDAM', payload: '' });
  };

  // TODO: types for events
  const updateReminder = (e): void => {
    dispatch({ type: 'ADDREMINDER', payload: e.target.value });
  };

  const updatePatients = (e): void => {
    const newPatients = [...addPatients, e.target.value];
    dispatch({ type: 'ADDPATIENTS', payload: newPatients });
    dispatch({ type: 'SELECTPATIENT', payload: e.target.value });
  };

  const updateDate = (date: Date) => {
    const newDates = [...selectedDates, date];
    dispatch({ type: 'ADDDATES', payload: newDates });

    const textDate = `${months[date.getMonth()]} ${date.getDate()}`;
    const newParsed = [...parsedDates, textDate];
    dispatch({ type: 'PARSEDATES', payload: newParsed });
  };

  const updateTime = (e): void => {
    dispatch({ type: 'ADDTIME', payload: e.target.value });
  };

  const updateAM = (e): void => {
    dispatch({ type: 'ADDAM', payload: e.target.value });
  };

  return (
    <>
      <Grid container spacing={1} direction="row">
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="reminder-label">reminder</InputLabel>
            <Select
              labelId="reminder-label"
              id="reminder-select"
              value={addReminder}
              onChange={updateReminder}
            >
              {
                reminders.map((reminder: IReminder) => (
                  <MenuItem
                    value={reminder.tag}
                    key={reminder.uuid}
                  >
                    {reminder.tag}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="patient-label">patients</InputLabel>
            <Select
              labelId="patient-label"
              id="patient-select"
              value={selectedPatient}
              onChange={updatePatients}
            >
              {
                patients.map((patient: IPatient) => (
                  <MenuItem
                    value={patient.name}
                    key={patient.uuid}
                  >
                    {patient.name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item>
        <Grid item container direction="row">
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel id="day-label" />
              <Select
                labelId="day-label"
                id="day-select"
                value={pickingDate ? 'picker' : 'daily'}
                onChange={handleDate}
              >
                <MenuItem value="daily">daily</MenuItem>
                <MenuItem value="picker">pick a date</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel id="time-label">hour</InputLabel>
              <Select
                labelId="time-label"
                id="time-select"
                value={addTime}
                onChange={updateTime}
              >
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel id="am-label">am</InputLabel>
              <Select
                labelId="am-label"
                id="am-select"
                value={addAM}
                onChange={updateAM}
              >
                <MenuItem value="am">am</MenuItem>
                <MenuItem value="pm">pm</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {pickingDate && <Calendar onChange={updateDate} />}
      </Grid>
      <Grid item>
        {(addPatients.length > 0 && addReminder.length > 0) && <ReminderConstructor />}
        <Button
          variant="outlined"
          color="secondary"
          onClick={addScheduled}
        >
          add
        </Button>
      </Grid>
    </>
  );
};

export default CalendarWidget;
