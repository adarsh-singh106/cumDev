const User = require("../model/User.model");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
// for email verifation importing these
const crypto = require("crypto"); // Built-in module for random string
const sendEmail = require("../utils/sendEmail");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // 1. Validation Fix: Removed isVerified/verifyToken from check
  // Users typically don't send their own verification tokens during signup; the backend handles that.
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // 2. Logic Fix: Check if user exists
  const userExist = await User.findOne({ email });

  // YOUR BUG WAS HERE: You had `if (!userExist) throw Error`.
  // This meant "If user DOES NOT exist, say they are already registered."
  if (userExist) {
    res.status(400);
    throw new Error("User is already registered");
  }
  // 1. Random Verify Token generate karo
  const verifyToken = crypto.randomBytes(32).toString("hex");

  // 2. User create karo (isVerified: false default hai)
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    verifyToken: verifyToken,
    // isVerified will default to false (from Schema)
    // verifyToken should be generated here if you plan to send an email, otherwise leave blank for now
  });

  if (newUser) {
    // 3. Email Send karo
    const verifyUrl = `${process.env.FRONTEND_URL}/verify/${verifyToken}`;
    const message = `Click here to verify: ${verifyUrl}`;

    try {
      await sendEmail({
        email: newUser.email,
        subject: "Verify your email",
        message: message,
      });

      // 4. Response me JWT mat bhejo, bas success message bhejo
      res.status(201).json({
        _id: newUser.id,
        fullName: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        message: "Registration Successful! Please check your email to verify.",
      });
    } catch (error) {
      // Agar email fail ho jaye, to user ko delete kar do taaki wo firse try kar sake
      await User.findByIdAndDelete(newUser._id);
      res.status(500);
      throw new Error("Email could not be sent, please try again.");
    }
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user
  // Note: We used select('+password') in the schema if select:false was set,
  // but standard findOne usually returns it unless explicitly excluded.
  const user = await User.findOne({ email }).select("+password");

  // 4. Method Fix: Use the instance method (user.matchPassword), not the static Model (User.match...)
  // We pass the PLAIN TEXT password to the method to compare against the DB hash
  if (user && (await user.matchPassword(password))) {
    // Check agar verified nahi hai to error feko
    if (!user.isVerified) {
      res.status(401);
      throw new Error("Please verify your email first.");
    }
    res.json({
      _id: user.id,
      email: user.email,
      fullName: `${user.firstName} ${user.lastName}`,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // 401 means Unauthorized
    throw new Error("Invalid email or password");
  }
});

// @desc    Verify User Email via Token
// @route   POST /api/users/verify
const verifyUserEmail = asyncHandler(async (req, res) => {
  const { token } = req.body; // Frontend se token aayega

  // 👇 Debug Logs
  console.log("1. Backend Received Token:", token);

  // DB me dhundo kiska token match kar raha hai
  const user = await User.findOne({ verifyToken: token });

  console.log("2. Database Found User:", user ? user.email : "No User Found");

  if (!user) {
    res.status(400);
    throw new Error("Invalid or Expired Token");
  }

  // User mil gaya? Verify kar do!
  user.isVerified = true;
  user.verifyToken = undefined; // Token uda do, ab zaroorat nahi
  await user.save();

  res
    .status(200)
    .json({ message: "Email Verified Successfully! You can login now." });
});

// Don't forget to export it
// module.exports = { registerUser, loginUser, verifyUserEmail };
module.exports = {
  registerUser,
  loginUser,
  verifyUserEmail,
};
