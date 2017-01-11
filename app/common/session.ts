export class Session {
  username: string;
  password: string;
  token: string;
  id: number;
  role: number;

  constructor(username: string, password: string){
    this.username = username;
    this.password = password;
    this.role = 'regular';
  }
}
