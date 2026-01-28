if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const PORT = process.env.PORT || 3000;
const listingsRouter = require("./routes/listing");
const reviewsRouter = require("./routes/review");
const usersRouter = require("./routes/user");

const app = express();
app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://feelslikehome-rose.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

const dbUrl = process.env.ATLASDB_URL;

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

async function main() {
  await mongoose.connect(dbUrl);
}
main().catch((err) => console.log(err));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

const sessionOptions = {
  store,
  name: "session",
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: true,
  },
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 🔹 API ROUTES (PURE REACT STYLE)
app.use("/api/listings", listingsRouter);
app.use("/api/listings/:id/reviews", reviewsRouter);
app.use("/api/user", usersRouter);

// 🔹 ROOT TEST ROUTE
app.get("/", (req, res) => {
  res.json({ message: "Feel Like Home API is running 🚀" });
});

// 🔹 404 HANDLER
// app.all("/*", (req, res) => {
//   res.status(404).json({ error: "Route not found" });
// });

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.log("ERROR:", err);

  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log("🔥 Server running on http://localhost:3000");
});

// D:\Web_Dev\backends\airbnb-clone backend\index.js
