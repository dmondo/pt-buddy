import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const Patients = ({ patient }: { patient: IClientPatient }): JSX.Element => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <>
      <Typography variant="body2" component="p">
        {bull}
        {`${patient.name} - ${patient.phone}`}
      </Typography>
    </>
  );
};

export default Patients;
