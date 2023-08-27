import { User } from "./User";

export class AuthenticationModel {
  user: User;
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;

  constructor(
    isAuthenticated: boolean = false,
    login: (username: string, password: string) => void = () => {},
    logout: () => void = () => {},
    user: User = new User()
  ) {
    this.user = user;
    this.isAuthenticated = isAuthenticated;
    this.login = login;
    this.logout = logout;
  }
}
