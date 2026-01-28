const Listing = require("./models/listing");
const Review = require("./models/review");

// ================= LOGIN CHECK =================
module.exports.isLoggedIn = (req, res, next) => {
  console.log("i am in isLoggedIn");

  if (!req.isAuthenticated()) {
    return res.status(401).json({
      error: "You must be logged in to perform this action",
    });
  }

  next();
};

// ================= OWNER CHECK (LISTING) =================
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }

  console.log("req.user._id:", req.user._id);
  console.log("listing.owner:", listing.owner[0]);

  if (!listing.owner[0].equals(req.user._id)) {
    return res.status(403).json({
      error: "You don't have permission to modify this listing",
    });
  }

  next();
};

// ================= AUTHOR CHECK (REVIEW) =================
module.exports.isAuthor = async (req, res, next) => {
  console.log("I am in isAuthor");

  const { reviewId } = req.params;

  console.log("reviewId:", reviewId);

  const review = await Review.findById(reviewId);

  if (!review) {
    return res.status(404).json({ error: "Review not found" });
  }

  console.log("review.author:", review.author);
  console.log("req.user._id:", req.user._id);

  if (!review.author.equals(req.user._id)) {
    return res.status(403).json({
      error: "You don't have permission to delete this review",
    });
  }

  next();
};

// D:\Web_Dev\backends\airbnb-clone backend\middleware.js