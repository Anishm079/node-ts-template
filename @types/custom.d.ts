import { IUser } from "../app/models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
