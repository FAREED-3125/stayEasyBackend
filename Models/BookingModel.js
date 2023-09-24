const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    fromdate: {
      type: String,
    },
    enddate: {
      type: String,
    },
    guests: {
      type: Number,
      required: true,
    },
    betdates: {
      type: [String]
    },
    roomids: {
      type: [String]
    }
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("booked", bookingSchema);

module.exports = bookingModel;
