const mongoose = require("mongoose");

const { Schema } = mongoose;

const typeSchema = new Schema({
  type_name: {
    type: String,
    required: true,
  },
});

const Type = mongoose.model("Type", typeSchema);

module.exports = Type;
