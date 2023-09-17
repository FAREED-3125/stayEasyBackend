//imports section

const express = require('express');

//Declaring Router.

const router = express.Router();

//Controller imports
const { userSignup, userLogin } = require('../Controller/authController.js');

// signup Route
router.post('/signup',userSignup);

//Logim Route
router.post('/login',userLogin)

module.exports = router;