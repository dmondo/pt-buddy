interface IState {
  user: string;
  loginStatus: boolean;
  failedLogin: boolean;
  newUser: boolean;
}

interface IAction {
  type: string;
  payload: any;
}
