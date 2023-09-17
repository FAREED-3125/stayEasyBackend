//model Imports
const { createErr } = require("../Error/error.js");
const User = require("../Models/AuthModel.js");

//bcrypt  import
var bcrypt = require("bcryptjs");

// index of users page
// Get all user Request
const Getusers = async (request, response, next) => {
  try {
    await User.find({}).then((resp) => {
      response.status(200).json(resp);
    });
  } catch (err) {
    next(createErr(404,"No Users Found"));
  }
};

//Create Request
const userRegister = async (request, response, next) => {
  
  try {
    const { body } = request;
    console.log(body)
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(body.password, salt);
  body.password = hash;

  const user = new User(body);
    await user.save().then((resp) => {
      response.status(201).json(resp);
    });
  } catch (err) {
    next(createErr(500,`${err.message}`));
  }
};

//Delete Request
const Deleteuser = async (request, response, next) => {
  try {
    const { id } = request.params;
    await User.findByIdAndDelete(id).then((resp) => {
      response.status(200).json("User Has Been Deleted.");
    });
  } catch (err) {
    next(createErr(404,"No such ID."));
  }
};

//Get Request for users
const Getuser = async (request, response, next) => {
  try {
    const { id } = request.params;
    await User.findById(id).then((resp) => {
      response.status(200).json(resp);
    });
  } catch (err) {
    next(err);
  }
};

//Update Request for users
const updateuser = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { body } = request;
    await User.findByIdAndUpdate(id, body,{new: true}).then((resp) => {
      response.status(200).json(resp);
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  Getusers,
  userRegister,
  Deleteuser,
  Getuser,
  updateuser,
};
