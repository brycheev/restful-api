export interface IUser {
  id: number;
  email: string;
  password: string;
}

export interface IJwtUser {
  id: number;
  email: string;
}

export interface ILoginUser {
  id: number;
  email: string;
}

export interface ICreateUser {
  email: string;
  password: string;
}

export interface IGetUser {
  id?: number;
  email?: string;
}
