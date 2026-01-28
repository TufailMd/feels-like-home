const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  // userid: String,
  comment: String,
  rating: { type: Number, min: 1, max: 5 },
  createdAt:{
    type: Date,
    default: Date.now()
  },
  author: {
      type: Schema.Types.ObjectId, ref: "User"
    }
});


module.exports = mongoose.model("Review", reviewSchema);

// D:\Web_Dev\backends\airbnb-clone backend\models\review.js