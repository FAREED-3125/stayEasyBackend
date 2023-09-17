//imports section

const express = require('express');

//Declaring Router.

const router = express.Router();

//Controller imports
const { RoomRegister, UpdateRoom,AddRoom, DeleteRoom, UpdateSingleRoom, GetRooms, FindManyRooms, UpdateRoomNumber, DeleteRoomNumber } =require( '../Controller/RoomController');
const { verifyAdmin } = require('../jwt/VerifyToken');


//Get all rooms
router.get('/',verifyAdmin,GetRooms);


//create Room
router.post('/create/:id',verifyAdmin,RoomRegister);

//Update Room
router.put('/update/:id',verifyAdmin,UpdateRoomNumber);

//add Room
router.put('/addRoom/:id',verifyAdmin,AddRoom);

//Delete Room
router.delete('/deleteRoom/:hotelid/:id',DeleteRoom)

//update SingleROom
// router.put('/updateSRoom/:roomid/:id',UpdateSingleRoom)
router.post('/FindRooms',FindManyRooms);

//Update Room Number
router.put('/upRoom/:id',UpdateRoomNumber)


//Delete Room number
router.put('/deleteRoomno/:id',DeleteRoomNumber)

module.exports = router;