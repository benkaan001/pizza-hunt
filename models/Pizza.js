// const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //use a getter to transform the data by default every time it is queried
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      default: "Large",
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },

  {
    toJSON: {
      virtuals: true,
      //tell mongoose it should use any getter function we have specified
      getters: true,
    },
    //parevents virtuals form creating duplicate of _id as 'id'
    id: false,
  }
);

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

//export the Pizza model

module.exports = Pizza;
