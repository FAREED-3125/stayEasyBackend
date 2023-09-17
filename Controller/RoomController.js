//model Imports
const { request } = require("express");
const { createErr } = require("../Error/error.js");
const Hotel = require("../Models/HotelModel.js");
const Room = require("../Models/RoomModel.js");

//Create Request
const RoomRegister = async (request, response, next) => {
  const hotelid = request.params.id;
  try {
    const room = await Room.createRoom(request.body);
    const hotel = await Hotel.findByIdAndUpdate(hotelid, {
      $push: { rooms: room._id },
      new: true
    });

    response.status(201).json(room);
  } catch (err) {
    next(createErr(500, err.message));
  }
};

const FindManyRooms = async (request,response,next) =>{
  try{
    const {body} = request;
    console.log(body)
    const data = await Room.FindRooms(body);
    response.status(200).json(data);
   }catch(err){
    next(createErr(500, err.message));
   }
}


//Update Rooms

const UpdateRoom = async (request,response,next) => {
  const roomid = request.params.id;
  try {
    const room = await Room.updateRoom(roomid,request.body); 

    response.status(201).json(room);
  } catch (err) {
    next(createErr(500, err.message));
  }
  
}
//Delete Rooms
const DeleteRoom = async (request,response,next) =>{
  const roomid = request.params.id;
  const hotelid = request.params.hotelid
  try {
    const hotel = await Hotel.findByIdAndUpdate(hotelid,{
      $pull: {room: roomid }
    },{
      new: true
    });
    const room = await Room.findByIdAndDelete(roomid,{new: true});
    response.status(200).json({room: room,
    hotel: hotel});
  } catch (err) {
    next(createErr(500, err.message));
  }
}

// Adding Single ROom
const AddRoom = async (request,response,next) => {
  const roomid = request.params.id;
  try {
    const room = await Room.addRoom(roomid,request.body);
    response.status(200).json(room)
}catch (err) {
  next(createErr(500, err.message));
}
}

// //Updating Single Room
// const UpdateSingleRoom = async (request,response,next) => {
//   const roomid = request.params.roomid;
//   const id = request.params.id;
//   try {
//     const room = await Room.updateRoomsingle(id,roomid,request.body);
//     response.status(200).json(room);
//   } catch (err) {
//     next(createErr(500, err.message));
//   }
// }


//Getting all rooms
const GetRooms = async (request,response,next) => {
  try{
    const rooms = await Room.find({})
    if(!rooms) throw Error("No Room found");
    response.status(200).json(rooms);
  }
catch(err){
  next(createErr(404, err.message));
}
}

//Update Room numbers
const UpdateRoomNumber = async (request,response,next) => {
  const roomid = request.params.id;
  const {body} = request
  try {
    // const room = await Room.updateRoom(roomid,request.body); 
     console.log(body)
    // response.status(201).json(room);
     const room = await Room.findOneAndUpdate(
      { 'Room_number._id': roomid },
      { $push: { 'Room_number.$.unavailable': { $each: body.body } } },
      { new: true }
    );
   
    
     response.status(200).json(room); 

  } catch (err) {
    next(createErr(500, err.message));
  }
  
}

//Delete Room number
const DeleteRoomNumber = async (request, response, next) => {
  const roomid = request.params.id;
  const { body } = request;
  try {
    const room = await Room.findOneAndUpdate(
      { 'Room_number._id': roomid },
      { $pull: { 'Room_number.$.unavailable': { $in: body.body } } }, // Use $in to match multiple elements
      { new: true }
    );

    if (!room) {
      return response.status(404).json({ message: 'Room not found' });
    }

    response.status(200).json(room);
  } catch (err) {
    next(createErr(500, err.message));
  }
};

  

module.exports = {
  RoomRegister,
  UpdateRoom,
  AddRoom,
  DeleteRoom,
  GetRooms,
  FindManyRooms,
  UpdateRoomNumber,
  DeleteRoomNumber
  // UpdateSingleRoom
};
