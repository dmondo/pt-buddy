import React from 'react';
import { string } from 'prop-types';

const initialState = {
  user: '',
  loginStatus: false,
  failedLogin: false,
  newUser: false,
  scheduling: false,
  patients: [],
  reminders: [],
  scheduledReminders: [],
  pickingDate: false,
  addReminder: '',
  addPatients: [''],
  selectedPatient: '',
  addDate: '',
  addTime: '',
  addAM: '',
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
    case 'SCHEDULING':
      return { ...state, scheduling: action.payload };
    case 'PATIENTS':
      return { ...state, patients: action.payload };
    case 'REMINDERS':
      return { ...state, reminders: action.payload };
    case 'SCHEDULED':
      return { ...state, scheduledReminders: action.payload };
    case 'DATE':
      return { ...state, pickingDate: action.payload };
    case 'ADDREMINDER':
      return { ...state, addReminder: action.payload };
    case 'ADDPATIENTS':
      return { ...state, addPatients: action.payload };
    case 'SELECTPATIENT':
      return { ...state, selectedPatient: action.payload };
    case 'ADDDATE':
      return { ...state, addDate: action.payload };
    case 'ADDTIME':
      return { ...state, addTime: action.payload };
    case 'ADDAM':
      return { ...state, addAM: action.payload };
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
