const mongoose = require("mongoose");
const Review = require('../Models/ReviewModel');
const { createErr } = require("../Error/error");
const Hotel = require('../Models/HotelModel');
const { find } = require("../Models/RoomModel");

//Get all reviews
const GetAllReviews = async(request,response,next) => {
    try {
        const reviews = await Review.find({});
        if(!reviews) throw Error("No reviews found");
        response.status(200).json(reviews);
    } catch (error) {
        next(createErr(404,error.message))
    }
}

//create Review
const CreateReview = async(request,response,next) => {
    try { 
         const {id} = request.params;
        const {body} = request;
        const {name } = request.body
    // let hotel = [];
    //     const user = await  Review.find({name});
    //     let reviews = {}
    //     if(user){
    //          reviews = await  Review.findOneAndUpdate({name},body);
    //           hotel = await Hotel.findById(id, {new: true});
    //     }else{
          const  reviews = await  Review.createReview(body); 
          const  hotel = await Hotel.findByIdAndUpdate(id,{$push: {reviews: reviews._id}
         }, {new: true});
        // }
         const calcReview = await calucalteReview(hotel._id);
         
         const total = Number(calcReview.five)*5 + Number(calcReview.four)*4+Number(calcReview.three)*3+Number(calcReview.two)*2+Number(calcReview.one)*1;
         const total2 = Number(calcReview.five) + Number(calcReview.four)+Number(calcReview.three)+Number(calcReview.two)+Number(calcReview.one);
          console.log({calcReview,total,total2})
         console.log(total/total2);
         const totRat = parseFloat(total / total2).toFixed(2);
         const hot = await Hotel.findByIdAndUpdate(hotel._id,{rating: totRat}, {new: true});


        response.status(200).json({reviews,hot});
    } catch (error) {
        next(createErr(404,error.message))
    }
}

//Delete Review
const DeleteReview = async(request,response,next) => {
    try {
        const {id} = request.body;
        const reviews = await Review.deleteReview(id);
        response.status(200).json(reviews);
    } catch (error) {
        next(createErr(404,error.message))
    }
}

//Find Many
const ManyReviews = async(request,response,next) => {
    try {
     
        const {body} = request
        const query = request.query;
        const reviews = await Review.manyReview(body,query);
        response.status(200).json(reviews);
    } catch (error) {
        next(createErr(404,error.message))
    }
}

 //CountBytype 
 const getCountReviews = async (request,response,next) => {
    try{
        const {id} = request.params
        const hotel = await Hotel.findById(id)
    const five = await Review.countDocuments({'_id':{$in:hotel.reviews},rating: 5});
    const four = await Review.countDocuments({'_id':{$in:hotel.reviews},rating: 4});
    const three = await Review.countDocuments({'_id':{$in:hotel.reviews},rating: 3});
    const two = await Review.countDocuments({'_id':{$in:hotel.reviews},rating: 2});
    const one = await Review.countDocuments({'_id':{$in:hotel.reviews},rating: 1});
   
   response.status(200).json([{five,four,three,two,one}]);
   }catch (error) {
     next(createErr(500,"Couldn't find Count"))
   }
   }


   async function calucalteReview(id) {
    try{
        const hotel = await Hotel.findById(id)
    const five = await Review.countDocuments({'_id':{$in:hotel.reviews},rating: 5});
    const four = await Review.countDocuments({'_id':{$in:hotel.reviews},rating: 4});
    const three = await Review.countDocuments({'_id':{$in:hotel.reviews},rating: 3});
    const two = await Review.countDocuments({'_id':{$in:hotel.reviews},rating: 2});
    const one = await Review.countDocuments({'_id':{$in:hotel.reviews},rating: 1});
   
    return {five,four,three,two,one};
   }catch (error) {
     next(createErr(500,"Couldn't find Count"))
   }
   }
module.exports = {
    GetAllReviews,
    CreateReview,
    DeleteReview,
    ManyReviews,getCountReviews
}