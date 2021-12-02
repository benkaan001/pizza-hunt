const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  writeenBy: {
    type: String,
  },
  commentBody: {
    type: String,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
});

// create the Comment model using the PizzaSchema
const Comment = model("Comment", CommentSchema);

module.exports = Comment;
