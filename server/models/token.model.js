const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expireTime: {
    type: Number,
    default: Date.now() + 300,
  },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
