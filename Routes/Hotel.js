//imports section

const express = require("express");

//Declaring Router.

const router = express.Router();

//Controller imports
const {
  GetHotels,
  HotelRegister,
  DeleteHotel,
  GetHotel,
  updateHotel,
  getCountBycities,
  getCountByType,
  SearchHotel,
} = require("../Controller/HotelController.js");

//verify user,admin imports
const {
  verifyAdmin, verifyUser,
} = require("../jwt/VerifyToken.js");
const { createErr } = require("../Error/error.js");

//Get all Hotel Request
router.get("/", GetHotels);

//Create request
router.post("/register",verifyAdmin, HotelRegister);

//Delete Request
router.delete("/find/:id", verifyUser, DeleteHotel);

//Get Single Hotel request
router.get("/find/:id", GetHotel);

//update request
router.put("/find/:id", updateHotel);


//Count Routes
router.get('/countByCities',getCountBycities)

//Count by types
router.get('/countByTypes',getCountByType)

//Search Hotel
router.get('/search',SearchHotel)




module.exports = router;
