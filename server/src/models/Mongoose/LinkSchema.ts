import { Schema } from "mongoose";
import { ILink } from "../ILink";

const LinkSchema = new Schema<ILink>({
    name : {type: String, required: true},
    link : {type: String, required: true},
    imageSource : {type: String, required: true},

})

LinkSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
      delete ret.__v;
      delete ret.id;
      delete ret._id;
  },
});


export default LinkSchema
