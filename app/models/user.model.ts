import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { emailRegexPattern } from "../utils/emailUtils";

export interface IUser extends Document {
  name: string;
  avatar: {
    public_id: string;
    url: string;
  };
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  comparePassword: (password: string) => Promise<boolean>;
  signAccessToken: () => string;
  signRefreshToken: () => string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: {
        validator: (value: string) => emailRegexPattern.test(value),
        message: "Please Enter a Valid Email",
      },
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      select: false,
      minlength: [6, "Password must be at least 6 characters"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true },
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const userModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default userModel;
