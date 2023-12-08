import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    completedMeetings: Number,
    image: String,
    rate: Number,
    sex: {
      type: String,
      enum: ["male", "female"],
    },
    profession: {
      type: Schema.Types.ObjectId,
      ref: "Profession",
    },
    qualities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quality",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("User", schema);
