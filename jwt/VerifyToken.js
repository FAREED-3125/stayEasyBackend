//Json web token imports
const jwt = require("jsonwebtoken");
const { createErr } = require("../Error/error");
const { create } = require("../Models/HotelModel");

const verifyToken = (request, response, next) => {
  const token = request.cookies.access_token;
  if (!token)
    throw createErr(404, "No token.");

  jwt.verify(token, process.env.jwt, (error, user) => {
    if (error) throw createErr(403, "Invalid Token,Authentication Failed.");

    request.user = user;
    return next();
  });
};

const verifyUser = (request, response, next) => {
  try {
    verifyToken(request, response, () => {
      if (request.user) {
        if (request.user._id === request.params.id) {
          next();
        } else {
          return next(createErr(404, "User Invalid."));
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const verifyAdmin = (request, response, next) => {
  try {
    verifyToken(request, response, () => {
      if (request.user) {
        if (request.user.isAdmin) {
          next();
        } else {
          return next(createErr(403, "You are not a Admin."));
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  verifyToken,
  verifyUser,
  verifyAdmin,
};
