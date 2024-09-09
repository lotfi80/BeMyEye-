interface IMessage {
  _id: string;
  sender: string;
  recipient: string[];
  message: string;
  subject: string;
  attachments: string[];
  date: Date;
  isRead: boolean;
  // sender: IUser;
  // recipient: IUser;
  // message: string;
  // date: Date;
  // read: boolean;
}
