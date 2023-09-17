//imports section

const express = require("express");

//Declaring Router.

const router = express.Router();

//Controller imports
const {
  Getusers,
  userRegister,
  Deleteuser,
  Getuser,
  updateuser,
} = require("../Controller/UsersController.js");

//verify token imports
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../jwt/VerifyToken.js");

//check authentication
// router.get("/authentication", verifyToken, (request, response,next) => {
//   response.send("Hello User.");

// });

// //check User
// router.get('/checkuser/:id',verifyUser,(request,response,next) => {
//   response.status(200).send("Check user");
// })

// //check Admin
// router.get('/checkAdmin',verifyAdmin,(request,response,next) => {
//   response.status(200).send("Check Admin");
// })

//Get all user Request
router.get("/", verifyAdmin, Getusers);

//Create request
router.post("/create",userRegister);

//Delete Request
router.delete("/:id", verifyUser, Deleteuser);

//Get Single user request
router.get("/:id", verifyUser, Getuser);

//update request
router.put("/:id", verifyUser, updateuser);

module.exports = router;
