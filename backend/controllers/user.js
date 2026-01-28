const User = require("../models/user");

// 🔹 SIGNUP (REGISTER NEW USER)
module.exports.signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    console.log("Data: ", email, username, password);

    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log("registeredUser: ", registeredUser);

    // Auto login after signup
    req.login(registeredUser, (err) => {
      if (err) {
        return res.status(500).json({ error: "Login after signup failed" });
      }

      res.status(201).json({
        message: "Signup successful",
        user: registeredUser,
      });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 🔹 LOGIN
module.exports.login = async (req, res) => {
  // passport already authenticated user
  const { username, password } = req.body;
  console.log("Data: ", username, password);

  res.json({
    message: "Login successful",
    user: req.user,
  });
};

// 🔹 LOGOUT
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.json({
      message: "Logout successful",
    });
  });
};

// 🔹 GET CURRENT LOGGED-IN USER (VERY IMPORTANT FOR FRONTEND)
module.exports.getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.json({ user: null });
  }

  res.json({
    user: req.user,
  });
};

// D:\Web_Dev\backends\airbnb-clone backend\controllers\user.js