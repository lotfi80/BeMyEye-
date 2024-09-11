import IUser from "./User";

export default interface IMessage {
  _id: string;

  message: string;
  subject: string;
  attachments: string[];
  createdAt: Date;
  isRead: boolean;
  sender: IUser;
  recipient: IUser[];
  // message: string;
  // date: Date;
  // read: boolean;
}
