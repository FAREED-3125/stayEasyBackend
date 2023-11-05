// importing express
const express = require("express");

//importing Cors
const cors = require("cors");

//importing mongoose
const mongoose = require("mongoose");

//Cookie Parser Imports
const cookieParser = require("cookie-parser");

//Router imports
const AuthRouter = require("./Routes/Authendication.js");
const userRouter = require("./Routes/User.js");
const hotelRouter = require("./Routes/Hotel.js");
const roomRouter = require("./Routes/Rooms.js");
const ReviewRouter = require('./Routes/review.js');
const BookingRouter = require('./Routes/booking');
//dot env declaration
const env = require("dotenv");
env.config();

//App Initialization
const app = express();

//auto connect and reconnect
mongoose.connection.on("connected", () => {
  console.log("Connection made");
});
mongoose.connection.on("disconnected", () => {
  console.log("Connection disconnected.");
});

//Connect to Mongo DB
mongoose
  .connect(process.env.MDB)
  .then(
    app.listen(process.env.PORT, () => {
      console.log("Server Running...");
    })
  )
  .catch((err) => {
    console.log(err);
  });

  const whiteList = ["http://localhost:3000","https://65071fbb08aa414d97900a3f--cheerful-frangollo-474302.netlify.app","https://stay-easy.vercel.app","https://stay-easy-app.vercel.app"];
  //middleWares

app.use((req, res, next) => {
  console.log(req.path);
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (whiteList.includes(origin) || !origin ) {
        callback(null, true);
      } else {
        callback(new Error("Cors Error"));
      }
    },
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/Auth", AuthRouter);
app.use("/api/Users", userRouter);
app.use("/api/Hotels", hotelRouter);
app.use("/api/Rooms", roomRouter);
app.use('/api/Review',ReviewRouter);
app.use('/api/bookings',BookingRouter)

app.use((error, request, response, next) => {
  response.status(error.status || 500).json({
    success: false,
    status: error.status || 500,
    message: error.message,
  });
});
