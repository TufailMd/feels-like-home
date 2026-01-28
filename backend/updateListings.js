const mongoose = require("mongoose");
const Listing = require("./models/listing");
const User = require("./models/user");

// ✅ Make sure this DB name matches your shell prompt: "apnahome>"
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/apnahome";

(async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to DB:", mongoose.connection.name);

    // Get all owners’ ids
    const owners = await User.find({}, "_id").lean();
    console.log("👥 Owners found:", owners.length);
    if (!owners.length) {
      console.error("❌ No users found in DB. Aborting.");
      process.exit(1);
    }

    // Use EXACT enum values from your schema (spelling bhi same)
    const categories = [
      "Trendings",
      "Rooms",
      "Iconic Cities",
      "Beach",
      "Montains",   // (typo intentional to match your enum)
      "Lakefront",
      "Camping",
      "Farms",
      "Arctic",
    ];

    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Get only _id to keep memory light
    const listingIds = await Listing.find({}, "_id").lean();
    console.log("🏠 Listings found:", listingIds.length);
    if (!listingIds.length) {
      console.log("Nothing to update.");
      await mongoose.disconnect();
      return;
    }

    const ops = listingIds.map(({ _id }) => ({
      updateOne: {
        filter: { _id },
        update: {
          $set: {
            owner: [rand(owners)._id],       // your schema expects an ARRAY of ObjectId
            catogray: rand(categories),
          },
        },
      },
    }));

    const res = await Listing.bulkWrite(ops, { ordered: false });
    console.log("✅ bulkWrite result:", {
      matched: res.matchedCount,
      modified: res.modifiedCount,
      upserts: res.upsertedCount,
    });
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await mongoose.disconnect();
  }
})();
