const  Bookings = require( '../Models/BookingModel')
const User = require('../Models/AuthModel')
const  {createErr} = require( '../Error/error')
const createnewBooking = async (request,response,next) => {
    const body = request.body;
    const userid = request.params.id
    console.log(userid)
    try{
        const bookings = await Bookings.create(body);
        const user = await User.findByIdAndUpdate({'_id': userid},{$push: {'bookings': bookings._id}})
        response.status(201).json({bookings,user})
    }catch(err){
       next(createErr(500,err.message))
    }
}

const getallBookings = async (request,response,next) => {
    const body = request.body;
    const id = request.params.id
    try{
        const bookings = await User.find({'_id': id},{bookings: 1}).populate('bookings');
        response.status(200).json(bookings)
    }catch(err){
        next(createErr(500,err.message));
        console.log(err);
    }
}


//Delete Bookings 
const delteBookings = async(request,response,next) => {
    const id = request.params.id;
    const userid = request.params.userid;
    try{
        const booking = await Bookings.findByIdAndDelete(id);
        const user = await User.findByIdAndUpdate(userid,{$pull: {bookings: id}},{
            new: true
        })
        response.status(200).json(booking)

    }catch(err){
        console.log(err);
        next(createErr(500,err.message))
    }

}
module.exports= {
    createnewBooking,
    getallBookings,
    delteBookings
}