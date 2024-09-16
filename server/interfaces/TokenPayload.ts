export interface ITokenPayload {
  id: string;
  email: string;
  isActivated: boolean;
  iat?: number;
  exp?: number;
}
