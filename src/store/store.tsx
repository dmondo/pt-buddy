import React from 'react';

const initialState = {
  user: '',
  loginStatus: false,
  failedLogin: false,
  newUser: false,
};

export const store = React.createContext<IState | any>(initialState);

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'USER':
      return { ...state, user: action.payload };
    case 'LOGIN':
      return { ...state, loginStatus: action.payload };
    case 'FAILED':
      return { ...state, failedLogin: action.payload };
    case 'NEWUSER':
      return { ...state, newUser: action.payload };
    default:
      return state;
  }
};

export const StoreProvider = (props: React.Props<React.ReactChild>): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { children } = props;
  return (
    <store.Provider
      value={{ state, dispatch }}
    >
      {children}
    </store.Provider>
  );
};
