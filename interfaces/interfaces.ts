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
  addPatients: string[];
  selectedPatient: string;
  addDate: (string|Date);
  selectedDates: Date[];
  parsedDates: string[];
  addTime: string;
  addAM: string;
  patientError: boolean;
  nameError: boolean;
  tagError: boolean;
  reminderError: boolean;
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
  tag: string;
  text: string;
  date: Date;
  patient: string;
  patientNumber: string;
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
