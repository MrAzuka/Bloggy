const User = require("../models/author-model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const {
  forgetPasswordMail,
  welcomeToBloggyMail,
} = require("../services/sendMails");
const { createAccessToken } = require("../utils/accessToken");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if Author exists
    const checkUser = await User.findOne({
      email,
    });
    if (checkUser) {
      return res.status(302).json({
        message: "Author Found",
      });
    }

    await User.create({
      username,
      email,
      password,
    });

    await welcomeToBloggyMail(req, username);
    return res.status(201).json({
      message: "Author Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  //check that email and password were sent
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  //check that user with the email exists

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({ message: "User with email not found" });
  }

  //check that the passwords match
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  //generate an accessToken and refresh token for the user.
  const accessToken = createAccessToken(user._id);

  res.status(200).json({
    message: "Author is logged in",
    accessToken,
  });
};

exports.googleSignin = (passport) => {
  return passport.authenticate("google", {
    scope: ["email", "profile"],
  });
};

exports.googleSigninCallback = (passport) => {
  return passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  });
};

// Password reset
exports.postForgotPasswordPage = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(406).json({
        message: "Not Vaild Email",
      });
    }

    // check if email is registered
    let user = await User.findOne({
      email: email,
    });
    if (!user) {
      return res.status(404).json({
        message: "Author Email Not Found",
      });
    }

    const token = crypto.randomBytes(25).toString("hex");
    user.passwordResetToken = token;
    user.tokenExpiryTime = Date.now() + 900000; //present time plus 15mis
    user = await user.save();

    await forgetPasswordMail(req, token);
    res.status(200).json({
      message: "Reset Mail Sent",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
