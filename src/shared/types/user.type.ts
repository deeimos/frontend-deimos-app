export type UserType = {
  id: string;
  email: string;
  name: string;
  created_at: string;
  access_token: string;
  expires_at: number;
  refresh_token: string;
  refresh_expires_at: number;
};

export type UserInfoType = {
  id: string;
  email: string;
  name: string;
  created_at: string;
};

export type TokensType = {
  access_token: string;
  expires_at: number;
  refresh_token: string;
  refresh_expires_at: number;
};

export type RegisterType = {
  email: string;
  name: string;
  password: string;
};

export type LoginType = {
  email: string;
  password: string;
};
