const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const listingController = require("../controllers/listings");

const { isLoggedIn, isOwner } = require("../middleware");

const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

router.get("/", wrapAsync(listingController.index));

router.get("/search", wrapAsync(listingController.search));

router.post(
  "/",
  isLoggedIn,
  upload.single("image"),
  wrapAsync(listingController.createListing)
);

router.get("/:id", wrapAsync(listingController.showListing));

router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("image"),
  wrapAsync(listingController.updateListing)
);

router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);


module.exports = router;

// D:\Web_Dev\backends\airbnb-clone backend\routes\listing.js
