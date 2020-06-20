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
  addDate: string;
  addTime: string;
  addAM: string;
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
