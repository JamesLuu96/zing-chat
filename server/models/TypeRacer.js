const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlayerSchema = new Schema({
    currentWordIndex : {
        type: Number,
        default: 0
    },
    socketID : {type : String},
    WPM: {type : Number, default: -1},
    nickName: {type: String}
});
