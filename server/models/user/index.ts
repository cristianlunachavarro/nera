import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    accountId: { type: String, required: true },
    balance: { type: Number, default: 0 },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    methods: {
      hashPasswordUser: async function (password: string) {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        return await bcrypt.hash(password, salt);
      },
      validatePassword: async function (data: string) {
        const result = await bcrypt.compare(data, this.password);
        return result;
      },
    },
  }
);

userSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err: any) {
    return next(err);
  }
});

const UserModel = mongoose.model<UserType>("User", userSchema);

export interface UserType extends Document {
  username: string;
  password?: string;
  name: string;
  lastname: string;
  accountId: string;
  balance: number;
  hashPasswordUser: (password: string) => Promise<string>;
  validatePassword: (data: string) => Promise<boolean>;
}

export default UserModel;
