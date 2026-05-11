import mongoose from "mongoose";

const loginSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name"],
    },

    email: {
      type: String,
      required: [true, "Please enter the email"],
    },

    password: {
      type: String,
      required: [true, "Please enter the password"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("login", loginSchema);
