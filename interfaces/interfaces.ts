interface IState {
  user: string;
  loginStatus: boolean;
  failedLogin: boolean;
  newUser: boolean;
  scheduling: boolean;
  patients: IPatient[];
  reminders: IReminder[];
  scheduledReminders: IScheduled[];
  pickingDate: boolean;
  addReminder: string;
  addText: string;
  tagToText: ITagToText;
  patientToNumber: IPatientToNumber;
  addPatients: string[];
  selectedPatient: string;
  addDate: (string|Date);
  selectedDates: Date[];
  parsedDates: string[];
  addTime: string;
  addMinute: string;
  addAM: string;
  patientError: boolean;
  nameError: boolean;
  tagError: boolean;
  reminderError: boolean;
  minuteError: boolean;
}

interface ITagToText {
  [key: string]: string;
}

interface IPatientToNumber {
  [key: string]: string;
}

interface IScheduled {
  uuid: string;
  day: string;
  patients: string[];
  time: string;
  tag: string;
}

interface IReminder {
  tag: string;
  text: string;
  uuid: string;
}

interface IPatient {
  name: string;
  phone: number;
  uuid: string;
}

interface IAction {
  type: string;
  payload: any;
}

interface IServerReminder {
  _id?: string;
  uuid: string;
  ptuuid: string;
  jobid: string;
  tag: string;
  text: string;
  date: Date;
  time?: string;
  ampm?: string;
  daily: boolean;
  patient?: string;
  patientName: string;
  patientNumber: string;
  completed: boolean;
}

interface IReminderCallback {
  (err: Error, data?: IServerReminder[]): void;
}

interface errorCB {
  (err: Error): void
}

interface IUUID {
  uuid: string;
}

interface IUser {
  username: string;
  email: string;
  password: string;
  ptuuid: string;
}

interface ISaveUser {
  (err: Error, type?: string): void;
}

interface IVerify {
  email: string;
  password: string;
}

interface IDBUser {
  username: string;
  email: string;
  ptuuid: string;
  registerDate: Date;
}

interface IFindUser {
  (err: Error, data?: IDBUser, type?: string): void;
}
