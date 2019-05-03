export class AuthFormData
  {
    public email: string;
    public password: string;
    //
    // CONSTRUCTOR
    constructor(_email: string = '', _password: string = '') {
        this.email = _email;
        this.password = _password;
      }
  }