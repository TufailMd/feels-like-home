const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const reviewController = require("../controllers/review");
const { isLoggedIn, isAuthor } = require("../middleware");

router.post("/", isLoggedIn, wrapAsync(reviewController.addReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;

// D:\Web_Dev\backends\airbnb-clone backend\routes\review.js