export interface IUserWithTokens {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    isActivated: boolean;
   
  };
}
