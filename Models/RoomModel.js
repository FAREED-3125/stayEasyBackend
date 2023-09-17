const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    Maxpeople: {
      type: Number,
      required: true,
    },
    Room_number: [
      {
        number: {
          type: Number,
          required: true,
          unique: true,
        },
        unavailable: {
          type: [String],
        },
      },
    ],
    photos: [
      {
        type: String
      }
    ],
    size: {
      type: String
    }
  },
  { timestamps: true }
);

RoomSchema.statics.createRoom = async function (body) {
  const user = await this.create(body);
  return user;
};

//update Rooms
RoomSchema.statics.updateRoom = async function (id, body) {
  const room = await this.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!room) throw Error("Room Not exist.");

  return room;
};

RoomSchema.statics.addRoom = async function (id, body) {
  const room = await this.findByIdAndUpdate(id, {
    $push: { Room_number: body },
    new: true,
  });
  if (!room) throw Error("Room Not exist");
  return room;
};

// RoomSchema.statics.updateRoomsingle = async function(id,roomid,body) {
//    const room = await this.findOneAndUpdate(
//       { _id: roomid},
//       { $set: { number: body.number } },
//       { new: true }
//     )
//    console.log(room);
//    if(!room) throw Error("Room Not exist");
//    return room;
// }

RoomSchema.statics.DeleteRoom = async function (roomid) {
  const room = await this.findByIdAndDelete(roomid);
  if (!room) throw Error("Room Not exist");
  return room;
};

RoomSchema.statics.FindRooms = async function (body) {
  const rooms = await this.find({
    "_id": { $in: body },
  });
  if(!rooms) throw Error("Room Not exist");
 return rooms;
};

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
