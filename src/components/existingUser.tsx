import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import { store } from '../store/store';
// import '../style/Login.css';

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

const useStyles = makeStyles((theme) => ({
  margin: { margin: theme.spacing(1) },
  input: { color: 'black' },
}));

const ExistingUser = (): JSX.Element => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(store);
  const { failedLogin } = state;

  const verifyAccount = async (): Promise<void> => {
    const data = {
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
    };

    const url = '/users';

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    const result = await fetch(url, options);

    if (result.status === 200) {
      const verifyUser = await result.json();

      const { ptuuid, username, reminders } = verifyUser;

      const displayReminders = reminders.map((reminder: IServerReminder) => {
        const {
          uuid,
          daily,
          tag,
          date,
          patientName,
        } = reminder;
        const parsedDay = daily ? 'daily' : months[date.getMonth()];
        const hr = (date.getHours() > 12) ? date.getHours() % 12 : date.getHours();
        const ampm = (date.getHours() >= 12) ? 'pm' : 'am';
        const parsedTime = `${hr}:${date.getMinutes().toString().padStart(2, '0')}${ampm}`;

        return {
          uuid,
          day: parsedDay,
          patients: patientName,
          time: parsedTime,
          tag,
        };
      });

      const { scheduledReminders } = state;

      const newScheduled = [...scheduledReminders, ...displayReminders];

      dispatch({ type: 'SCHEDULED', payload: newScheduled });
      dispatch({ type: 'NOACCOUNT', payload: false });
      dispatch({ type: 'PTUUID', payload: ptuuid });
      dispatch({ type: 'USER', payload: username });
      dispatch({ type: 'SERVERREMINDER', payload: reminders });
      dispatch({ type: 'FAILED', payload: false });
      dispatch({ type: 'LOGIN', payload: true });
    } else {
      dispatch({ type: 'FAILED', payload: true });
    }
  };

  return (
    <div className={classes.margin}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid item>
          <TextField
            id="email"
            label="email"
            color="secondary"
          />
        </Grid>
        <Grid item>
          <VisibilityOffIcon />
        </Grid>
        <Grid item>
          <TextField
            id="password"
            label="password"
            type="password"
            color="secondary"
          />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={verifyAccount}
          >
            login
          </Button>
        </Grid>
      </Grid>
      {failedLogin && <div className="failure">username or password incorrect</div>}
    </div>
  );
};

export default ExistingUser;
