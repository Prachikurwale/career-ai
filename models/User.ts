import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  careerPath: String,
  preferences: Object,
}, { timestamps: true, collection: "users" });

const User = models.User || model("User", UserSchema);
export default User;
