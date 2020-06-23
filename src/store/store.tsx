import React from 'react';

const initialState = {
  user: '',
  ptuuidUser: '',
  loginStatus: false,
  failedLogin: false,
  newUser: false,
  scheduling: false,
  patients: [],
  reminders: [],
  scheduledReminders: [],
  pickingDate: false,
  addReminder: '',
  addText: '',
  tagToText: {},
  addPatients: [],
  selectedPatient: '',
  addDate: 'daily',
  selectedDates: [],
  parsedDates: [],
  addTime: '',
  addMinute: '',
  addAM: '',
  patientError: false,
  nameError: false,
  tagError: false,
  reminderError: false,
  minuteError: false,
  patientToNumber: {},
  noAccount: true,
  failedReminderSend: false,
  serverReminders: [],
  serverTags: [],
  serverPatients: [],
};

export const store = React.createContext<IState | any>(initialState);

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'USER':
      return { ...state, user: action.payload };
    case 'PTUUID':
      return { ...state, ptuuidUser: action.payload };
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
    case 'ADDTEXT':
      return { ...state, addText: action.payload };
    case 'ADDTAGTEXT':
      return { ...state, tagToText: action.payload };
    case 'ADDPATIENTS':
      return { ...state, addPatients: action.payload };
    case 'SELECTPATIENT':
      return { ...state, selectedPatient: action.payload };
    case 'ADDDATE':
      return { ...state, addDate: action.payload };
    case 'ADDDATES':
      return { ...state, selectedDates: action.payload };
    case 'PARSEDATES':
      return { ...state, parsedDates: action.payload };
    case 'ADDTIME':
      return { ...state, addTime: action.payload };
    case 'ADDMINUTE':
      return { ...state, addMinute: action.payload };
    case 'ADDAM':
      return { ...state, addAM: action.payload };
    case 'PATIENTERROR':
      return { ...state, patientError: action.payload };
    case 'NAMEERROR':
      return { ...state, nameError: action.payload };
    case 'TAGERROR':
      return { ...state, tagError: action.payload };
    case 'REMINDERERROR':
      return { ...state, reminderError: action.payload };
    case 'MINUTEERROR':
      return { ...state, minuteError: action.payload };
    case 'PATIENTTONUMBER':
      return { ...state, patientToNumber: action.payload };
    case 'NOACCOUNT':
      return { ...state, noAccount: action.payload };
    case 'FAILSEND':
      return { ...state, failedReminderSend: action.payload };
    case 'SERVERREMINDER':
      return { ...state, serverReminders: action.payload };
    case 'SERVERTAG':
      return { ...state, serverTags: action.payload };
    case 'SERVERPATIENT':
      return { ...state, serverPatients: action.payload };
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
