const express = require('express');
const { GetAllReviews, CreateReview, DeleteReview, ManyReviews, getCountReviews } = require('../Controller/ReviewController.');
const { FindManyRooms } = require('../Controller/RoomController');
const router = express.Router();

//Get all REviews
router.get('/getallReviews',GetAllReviews);
//Create Reviews
router.post('/CreateReview/:id',CreateReview)
//DeleteReview
router.delete('/DeleteReview',DeleteReview)

//ManyReviews
router.post('/ManyReviews',ManyReviews)

//Count by rating
router.get('/countByRating/:id',getCountReviews)



module.exports = router;