

const jwt = require("jsonwebtoken");

const User = require("../Models/userModel");
const AsyncAwaitError = require("./AsyncAwaitError");
const ErrorHandler = require('../utils/ErrorHandler')


exports.isAuthenticatedUser = AsyncAwaitError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(token,"token")
  // console.log(decodedData,"decodeData")
  

  req.user = await User.findById(decodedData.id);
  // console.log(req.user,"user")

  next();
});


exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};