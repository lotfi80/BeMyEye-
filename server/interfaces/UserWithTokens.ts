export interface IUserWithTokens {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    isActivated: boolean;
    profileimage: string;
    city: string;
    street: string;
    country: string;

  };
}
