const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// 🔹 GET ALL LISTINGS
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.json(allListings); // ✅ React API
};

// 🔹 SEARCH LISTINGS
module.exports.search = async (req, res) => {
  try {
    const query = req.query.q ? req.query.q.trim() : "";
    let allListings;

    if (query) {
      allListings = await Listing.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { location: { $regex: query, $options: "i" } },
          { country: { $regex: query, $options: "i" } },
        ],
      });
    } else {
      allListings = await Listing.find({});
    }

    res.json(allListings); // ✅ JSON only
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 CREATE NEW LISTING
module.exports.createListing = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "You must be logged in" });
  }

  let response = await geocodingClient
    .forwardGeocode({
      query: `${req.body.location}, ${req.body.country}`,
      limit: 1,
    })
    .send();

  let data = {
    ...req.body,
    geometry: response.body.features[0].geometry,
  };

  if (req.file) {
    data.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  const newListing = new Listing(data);
  newListing.owner = req.user._id;

  const savedListing = await newListing.save();

  res.status(201).json(savedListing); // ✅ return created listing
};

// 🔹 GET SINGLE LISTING
module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const details = await Listing.findById(id)
    .populate({ path: "review", populate: { path: "author" } })
    .populate("owner");

  if (!details) {
    return res.status(404).json({ error: "Listing not found" });
  }
  // console.log(details);

  res.json(details); // ✅ React API
};

// 🔹 UPDATE LISTING
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  let response = await geocodingClient
    .forwardGeocode({
      query: `${req.body.location}, ${req.body.country}`,
      limit: 1,
    })
    .send();

  if (!response.body.features.length) {
    return res
      .status(400)
      .json({ error: "Invalid location, please enter a valid place" });
  }

  let data = {
    ...req.body,
    geometry: response.body.features[0].geometry,
  };

  if (req.file) {
    data.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  const updated = await Listing.findByIdAndUpdate(id, data, { new: true });

  if (!updated) {
    return res.status(404).json({ error: "Listing not found" });
  }

  res.json(updated);
};

// 🔹 DELETE LISTING
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;

  const deleted = await Listing.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ error: "Listing not found" });
  }

  res.json(deleted); // ✅ return deleted listing
};

// D:\Web_Dev\backends\airbnb-clone backend\controllers\listings.js
