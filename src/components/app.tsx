import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Form from './form';
import Login from './login';
import History from './history';
import Calendar from './calendar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
  calendar: {
    marginTop: '40px',
  },
}));

const App = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h1" component="h2" gutterBottom>
          pt buddy
        </Typography>
        <Form />
        <div className={classes.calendar}>
          <Calendar />
        </div>
      </Grid>
      <Grid container item xs={6} direction="column">
        <Grid item>
          <Login />
        </Grid>
        <Grid>
          <History />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
