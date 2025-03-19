import { Schema, model } from "mongoose";

const recoverySchema = new Schema(
  {
    password: { type: String, required: true },
    email: { type: String, required: true },
    resetToken: String,
    resetTokenExpires: Date
  },
  {timestamps: true}
);

export const PasswordRecoveryModel = model("User", recoverySchema);
