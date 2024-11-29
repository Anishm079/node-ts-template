import mongoose, { Document, Model, Schema } from "mongoose";
// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { emailRegexPattern } from "../constants";

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
      required: [true, "Please Enter Your Name"],
      unique: true,
      validate: {
        validator: (value: string) => {
          return emailRegexPattern.test(value);
        },
        message: "Please Enter a Valid Email",
      },
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      select: false,
      minLength: [6, "Password must be atleast 6 characters"],
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password as string, 10);
  next();
});

const userModel: Model<IUser> = mongoose.model("user", userSchema);

export default userModel;
