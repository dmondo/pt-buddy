import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Calendar = (): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
          >
            set reminder
          </Button>
        </Grid>
        <Grid container spacing={1} direction="column">
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel id="reminder-label">reminder</InputLabel>
              <Select
                labelId="reminder-label"
                id="reminder"
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value={10}>core</MenuItem>
                <MenuItem value={20}>cardio</MenuItem>
                <MenuItem value={30}>eat</MenuItem>
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
                <MenuItem value={10}>fred</MenuItem>
                <MenuItem value={20}>sue</MenuItem>
                <MenuItem value={30}>so-and-so</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="recur-label">recurring</InputLabel>
            <Select
              labelId="recur-label"
              id="recur"
              // value={age}
              // onChange={handleChange}
            >
              <MenuItem value={10}>daily</MenuItem>
              <MenuItem value={20}>weekly</MenuItem>
              <MenuItem value={30}>monthly</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default Calendar;
