import { Schema, model, CallbackError } from "mongoose";
import { IUser, IUserModel } from "./model";
import bcrypt from "bcrypt";

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your first name"],
      minlength: [5, "User name is too short"],
      unique: [true, "User already exists"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Password is too short"],
    },
    likedPalettes: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

//hashes password
userSchema.pre("save", async function (this: IUser, next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//static method to login user
userSchema.statics.login = async function (
  name: string,
  password: string
): Promise<IUser> {
  const user = await this.findOne({ name });
  if (user) {
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      return user;
    }
    throw new Error("Incorrect password");
  }
  throw new Error("User doesn't exist");
};

//static method to reset password
userSchema.statics.resetPassword = async function (
  id: string,
  oldPassword: string,
  newPassword: string,
  callback: () => void
): Promise<void> {
  const user: IUser = await this.findOne({ _id: id });
  if (user) {
    const comparison = await bcrypt.compare(oldPassword, user.password);
    if (comparison) {
      const salt = await bcrypt.genSalt();
      const reset = await bcrypt.hash(newPassword, salt);
      this.updateOne(
        { _id: id },
        { password: reset },
        {},
        (err: CallbackError, _: any) => {
          if (err) {
            throw new Error("Failed to update document!");
            }
            callback();
        }
      );
    }else throw new Error("Incorrect password");
  }else throw new Error("Failed to find user");
};

export const User: IUserModel = model<IUser, IUserModel>(
  "User",
  userSchema,
  "users"
);
