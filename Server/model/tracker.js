import mongoose from "mongoose";

const trackerSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "login",
    },

    name: {
      type: String,
      required: [true, "Please entre the name"],
    },

    amount: {
      type: Number,
      required: [true, "Please entre the amount"],
    },

    role: {
      type: String,
      default: "income",
    },

    category: {
      type: String,
    },

    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

export default mongoose.model("tracker", trackerSchema);
