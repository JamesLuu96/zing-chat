const mongoose = require("mongoose");

const { Schema } = mongoose;

const chatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },

  message: {
    type: String,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
