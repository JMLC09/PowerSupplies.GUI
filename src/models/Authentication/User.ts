export class User {
  name: string;
  username: string;
  token: string | null;
  roles: string[];

  constructor() {
    this.name = "";
    this.username = "";
    this.token = null;
    this.roles = [""];
  }
}
