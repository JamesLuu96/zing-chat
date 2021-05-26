const mongoose = require("mongoose");

const { Schema } = mongoose;

const roomSchema = new Schema({
  roomName: {
    type: String,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
