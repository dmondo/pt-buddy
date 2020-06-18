import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Grid container spacing={1} alignItems="flex-end">
      <Grid item>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              your reminders
            </Typography>
            <Typography variant="body2" component="p">
              {bull}
              blah blah blah.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              your patients
            </Typography>
            <Typography variant="body2" component="p">
              {bull}
              name 123-345-6789
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default History;
