export interface IImage {
  image: string;
  _id: string;
}

import IUser from "./User";
export interface IPost {
  _id: string;
  userid: IUser;
  postimage: IImage;
  title: string;
}
