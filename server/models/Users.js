const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
      required: true,
    },
    qualities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quality",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
