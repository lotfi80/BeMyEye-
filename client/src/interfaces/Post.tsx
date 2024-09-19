export interface IImage {
  image: string;
  _id: string;
}

import IUser from "./User";
// export interface IPost {
//   _id: string;
//   userid: IUser;
//   postimage: IImage;
//   title: string;
//   description: string;
//   address: string;
// }
export interface IPost {
  _id: string;
  title: string;
  description: string;
  postimage: { image: string }[];
  address: string;
  latitute: number;
  longtitute: number;
  category: string;
  userid: { username: string };
  barcode?: string; 
  postDate?: string; 
}
