const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
   shortaddress:{
    type: String,
    required: true,
  },
  photos:{
      type: [String], // Assuming the photos will be stored as URLs
    },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  rooms: {
    type: [String],
  },
  cheapestprice: {
    type: Number,
    required: true,
  },
  freecancellation: {
    type: Boolean,
    required: true,
    default: false
  },
  freefood: {
    type: Boolean,
    required: true,
    default: false
  },
  petallowed: {
    type: Boolean,
    required: true,
    default: false,
  },
  ac: {
    type: Boolean,
    required: true,
    default: false,
  },
  phonenumber:{
    type: Number,
    required: true
  },
  offer: {
    type: Number,
    required: true
  },
  reviews:{
    type: [String]
  }
},{timestamps: true});

const Hotel = mongoose.model("Hotel", HotelSchema);

module.exports = Hotel;
