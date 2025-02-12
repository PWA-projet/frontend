export interface AuthLoginI {
  name: string;
  email: string;
  password: string;
}

export interface AuthRegisterI extends AuthLoginI {
  password_confirmation: string;
}

export interface AuthUserI {
  name: string;
  email: string;
}
