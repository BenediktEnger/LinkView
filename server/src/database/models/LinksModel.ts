import { Document, model, Schema } from "mongoose";

export interface ILink {
    name: string;
    path: string;
  }

const LinkSchema = new Schema<ILink>({
    name : {type: String, required: true},
    path : {type: String, required: true}
})

LinkSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
      delete ret.__v;
      delete ret._id;
  },
});

export default model<ILink>("Link", LinkSchema)