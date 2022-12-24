import { IUser } from '../../user/models/user.models';

export interface ILoginResponse {
  accessToken: string;
}

export type TValidateResponse = Omit<IUser, 'password'> | null;

export interface ILogin {
  email: string;
  password: string;
}
