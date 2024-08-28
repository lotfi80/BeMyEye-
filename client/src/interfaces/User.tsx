export interface IUser {
  _id: string;
  email: string;
  password: string;
  isActivated: boolean;
  activationLink?: string | null;
  firstname: string;
  lastname: string;
  username: string;
  birthdate: Date | null;
  profileimage: string;
  city: string;
  street: string;
  country: string;
  postid: string[];
  postlikes: string[];
  hash: string;
  registerDate: Date;
}
