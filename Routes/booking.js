const express = require('express')
const router = express.Router();
const {createnewBooking, getallBookings, delteBookings} = require('../Controller/BookingController')
//Booking creation route
router.post('/createnew/:id',createnewBooking)


//get all request
router.get('/getallbookings/:id',getallBookings);

//Delete booking
router.delete('/deletebooking/:id/:userid',delteBookings)
module.exports = router