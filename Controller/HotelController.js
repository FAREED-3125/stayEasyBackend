//model Imports
const { createErr } = require("../Error/error.js");
const Hotel = require("../Models/HotelModel.js");

// index of Hotels page
// Get all Hotel Request
const GetHotels = async (request, response, next) => {
  const query = request.query;
 
  try {
    await Hotel.find().then((resp) => {
      response.status(200).json(resp);
    });
  } catch (err) {
    next(500,"Unable to create Hotels.");
  }
};
const SearchHotel = async (request, response, next) => {
  const query = request.query;
  console.log(query)
  try {
    await Hotel.find({city: query.city.split(','),cheapestprice: {$gte: query.min||0,$lte: query.max||99999}}).then((resp) => {
      response.status(200).json(resp);
    });
  } catch (err) {
    next(500,"Unable to create Hotels.");
  }
};


//Create Request
const HotelRegister = async (request, response, next) => {
  try {
    const {body} = request;
     body.city = body.city.toLowerCase();
     const newHotel = new Hotel(request.body);
    await newHotel.save().then((resp) => {
      response.status(201).json(resp);
    });
  } catch (err) {
    next(err);
  }
};

//Delete Request
const DeleteHotel = async (request, response, next) => {
  try {
    const { id } = request.params;
    await Hotel.findByIdAndDelete(id).then((resp) => {
      response.status(200).json(resp);
    });
  } catch (err) {
    next(createErr(404,"No such ID."));
  }
};

//Get Request for Hotels
const GetHotel = async (request, response, next) => {
  try {
    const { id } = request.params;
    await Hotel.findById(id).then((resp) => {
      response.status(200).json(resp);
    });
  } catch (err) {
    next(err);
  }
};

//Update Request for Hotels
const updateHotel = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { body } = request;
    await Hotel.findByIdAndUpdate(id, body,{new: true}).then((resp) => {
      response.status(200).json(resp);
    });
  } catch (err) {
    next(err);
  }
};

//count Controllers
const getCountBycities = async (request,response,next) => {
  const cities = request.query.cities.split(',');

  try {
 const list = await Promise.all(cities.map(city =>  {
   return Hotel.countDocuments({city: city})
 }));
 
 response.status(200).json(list);
 }catch (error) {
   next(createErr(500,"Couldn't find Count"))
 }
 }


 //CountBytype 
 const getCountByType = async (request,response,next) => {
  try{
  const hotelCount = await Hotel.countDocuments({type: 'Hotel'});
  const apartmentCount = await Hotel.countDocuments({type: 'Apartment'});
  const resortCount = await Hotel.countDocuments({type: 'Resort'});
  const homeStay = await Hotel.countDocuments({type: 'HomeStay'});
  const villas = await Hotel.countDocuments({type: 'villas'});
 
 response.status(200).json([{
  type: 'Hotel',count: hotelCount
 },
 {
  type: 'Apartment',count: apartmentCount
 },
 {
  type: 'Resort',count: resortCount
 },{
  type: 'HomeStay',count: homeStay
 },
 {
  type: 'Villas',count: villas
 }
]);
 }catch (error) {
   next(createErr(500,"Couldn't find Count"))
 }
 }
module.exports = {
  GetHotels,
  HotelRegister,
  DeleteHotel,
  GetHotel,
  updateHotel,
  getCountBycities,
  getCountByType,
  SearchHotel
};
