import { model, Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
 
}

const CategorySchema: Schema<ICategory> = new Schema({
  name: { type: String, required: true },
  
});

export const Category = model<ICategory>("Category", CategorySchema);