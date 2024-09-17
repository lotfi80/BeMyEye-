import { IUser } from '../models/user.js';
import { IPost } from '../models/Post.js';

export interface Meta {
  total: number;
  perPage: number;
  page: number;
  direction: string;
  sortBy: string;
}

export interface Records {
  baseError: string;
  bulkAction: any[];
  id: string;
  errors: any;
  recordActions: any[];
  title: string;
  params: IPost | IUser;
  populated: any[];
}
export interface ApiResponse {
  meta: Meta;
  records: Records[];
}
