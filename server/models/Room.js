const mongoose = require("mongoose");
const {chatSchema} = require('./Chat')
const dateFormat = require('../utils/dateFormat')
const { Schema } = mongoose;

const roomSchema = new Schema({
  roomName: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  roomChat: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }],
  
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  }
});

const Room = mongoose.model("Room", roomSchema);

module.exports = {Room, roomSchema};
