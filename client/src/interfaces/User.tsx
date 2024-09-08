export interface IUser {
  _id: string;
  email: string;
  // password: string | null | undefined;
  hasPassword: boolean;
  isActivated: boolean;
  activationLink?: string | null;
  firstname: string;
  lastname: string;
  username: string;
  birthdate: Date | null;
  profileimage: string | null;
  city: string;
  street: string;
  country: string;
  postid: string[];
  postlikes: string[];
  hash: string;
  registerDate: Date;
  sex: number;
  privacy: {
    email: boolean;
    firstname: boolean;
    lastname: boolean;
    birthdate: boolean;
    country: boolean;
    city: boolean;
  };
  followers: IUser[];
  following: IUser[];
}
