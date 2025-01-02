import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    nembers: Array,
  },
  {
    timestamps: true,
  }
);

export const chatModel = mongoose.model("Chat", chatSchema);
