import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Form from './form';
import Login from './login';
import History from './history';
import Scheduler from './scheduler';
import { store } from '../store/store';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
  calendar: {
    marginTop: '20px',
  },
}));

const App = (): JSX.Element => {
  const classes = useStyles();
  const { state } = React.useContext(store);
  const { user, noAccount, failedReminderSend } = state;

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h1" component="h2" gutterBottom>
          pt buddy
        </Typography>
        {
          (user === '')
            ? ''
            : (
              <Typography variant="h5">
                {`Welcome ${user}`}
              </Typography>
            )
        }
        <Form />
        <div className={classes.calendar}>
          <Scheduler />
        </div>
      </Grid>
      <Grid container item xs={6} direction="column">
        <Grid item>
          {
            (user === '')
              ? <Login />
              : ''
          }
        </Grid>
        <Grid>
          <History />
          { (noAccount && failedReminderSend) && 'login or create an account to send reminders'}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
