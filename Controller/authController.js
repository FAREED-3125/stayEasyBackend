//model Imports
const User = require("../Models/AuthModel.js");

//valildator imports
const validator = require("validator");

//bcrypt  import
var bcrypt = require("bcryptjs");

//Json web token imports
const jwt = require("jsonwebtoken");

//Error imports
const { createErr } = require("../Error/error.js");

// Sign up route
const userSignup = async (request, response, next) => {
  try {
    if (!validator.isStrongPassword(request.body.password))
      throw Error("password is not Valid.");
    const { username, email } = request.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(request.body.password, salt);
    const password1 = hash;

    const user = await User.signup(username, email, password1);
    const {password,isAdmin,_id,...user1} = user._doc;
 
    if (user) response.status(201).json(user1);
  } catch (err) {
    next(createErr(500, err.message));
  }
};

// Login  route
const userLogin = async (request, response, next) => {
  const { body } = request;
  const { email } = body;
  try {
    const user = await User.findOne({ email });
    if (!user) return next(createErr(400, "User Not Found."));

    const ispasscorrect = await bcrypt.compare(body.password, user.password);
    if (!ispasscorrect)
     return next(createErr(402, "Invalid password."));
    const {password, isAdmin,bookings, ...otherDetails } = user._doc;
    const {_id} = otherDetails;
    const token = jwt.sign({_id, isAdmin }, process.env.jwt);
    response
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(otherDetails);
  } catch (err) {
    console.log(err.message)
    next(createErr(500, "Something Wrong"));
  }
};

module.exports = {
  userSignup,
  userLogin,
};


