const mongoose = require("mongoose");
const Bookings = require('../Models/BookingModel')

//validator imports

const validator = require('validator');

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Add an email validation regex pattern if necessary
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bookings: {
      type: [String],
      ref: Bookings
    }
  },
  { timestamps: true }
);

userSchema.statics.signup = async function(username, email, password) {
 if(username === "" || email === ""|| password === "")
 {
  throw Error("All Fields required.")
 }

 if(!validator.isEmail(email)) throw Error("Email is not Valid.");
  const existUsername = await this.findOne({ username });
  if (existUsername) throw Error("Username is already exist");

  const existemail = await this.findOne({ email });
  if (existemail) throw Error("Email is already exist.");

  const User = await this.create({ username, email, password });
  return User;
};

// Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
