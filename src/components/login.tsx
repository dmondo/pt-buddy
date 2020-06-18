import React from 'react';
import Button from '@material-ui/core/Button';
import { store } from '../store/store';
import NewUser from './newUser';
import ExistingUser from './existingUser';

const Login = (): JSX.Element => {
  const { state, dispatch } = React.useContext(store);
  const { newUser } = state;

  const userExists = (): void => {
    dispatch({ type: 'NEWUSER', payload: !newUser });
    dispatch({ type: 'FAILED', payload: false });
  };

  return (
    <>
      {newUser ? <NewUser /> : <ExistingUser />}
      <Button
        color="secondary"
        onClick={userExists}
      >
        {newUser ? 'already have an account?' : 'create account'}
      </Button>
    </>
  );
};

export default Login;
