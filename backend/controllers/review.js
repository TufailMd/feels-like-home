const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.addReview = async (req, res) => {
  const { id } = req.params;

  console.log(id);
  console.log("REQ BODY:", req.body); // 👈 DEBUG

  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }

  const newReview = new Review(req.body); // { comment, rating }
  newReview.author = req.user._id;

  await newReview.save();

  listing.review.push(newReview);
  await listing.save();

  res.status(201).json(newReview);
};

// 🔹 DELETE REVIEW
module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;
  console.log(reviewId);

  await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
  console.log(id);

  const deletedReview = await Review.findByIdAndDelete(reviewId);
  console.log(deletedReview);
  if (!deletedReview) {
    return res.status(404).json({ error: "Review not found" });
  }

  res.json(deletedReview); // ✅ return deleted review
};


// D:\Web_Dev\backends\airbnb-clone backend\controllers\review.js