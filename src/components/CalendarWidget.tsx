import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Calendar from 'react-calendar';
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

const CalendarWidget = (): JSX.Element => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(store);
  const { reminders, patients } = state;

  return (
    <>
      <Grid container spacing={1} direction="row">
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="reminder-label">reminder</InputLabel>
            <Select
              labelId="reminder-label"
              id="reminder"
              // value={age}
              // onChange={handleChange}
            >
              {
                reminders.map((reminder: IReminder) => (
                  <MenuItem
                    value={reminder.tag}
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
              id="patient"
              // value={age}
              // onChange={handleChange}
            >
              {
                patients.map((patient: IPatient) => (
                  <MenuItem
                    value={patient.name}
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
        <Calendar />
      </Grid>
      <Grid item container direction="row">
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="patient-label">8</InputLabel>
            <Select
              labelId="patient-label"
              id="patient"
              // value={age}
              // onChange={handleChange}
            >
              <MenuItem value={10}>8</MenuItem>
              <MenuItem value={20}>9</MenuItem>
              <MenuItem value={30}>10</MenuItem>
              <MenuItem value={10}>11</MenuItem>
              <MenuItem value={20}>12</MenuItem>
              <MenuItem value={30}>1</MenuItem>
              <MenuItem value={10}>2</MenuItem>
              <MenuItem value={20}>3</MenuItem>
              <MenuItem value={30}>4</MenuItem>
              <MenuItem value={10}>5</MenuItem>
              <MenuItem value={20}>6</MenuItem>
              <MenuItem value={30}>7</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="patient-label">am</InputLabel>
            <Select
              labelId="patient-label"
              id="patient"
              // value={age}
              // onChange={handleChange}
            >
              <MenuItem value={10}>am</MenuItem>
              <MenuItem value={20}>pm</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="secondary"
        >
          add
        </Button>
      </Grid>
    </>
  );
};

export default CalendarWidget;
