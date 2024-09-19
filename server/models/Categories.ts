import { model, Schema, Document, Types } from "mongoose";
export interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
}

const CategorySchema: Schema<ICategory> = new Schema({
  name: { type: String, required: true },
}, { timestamps: true });

export const Category = model<ICategory>("Category", CategorySchema);
