interface IState {
  user: string;
  loginStatus: boolean;
  failedLogin: boolean;
  newUser: boolean;
  scheduling: boolean;
  patients: IPatient[];
  reminders: IReminder[];
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
