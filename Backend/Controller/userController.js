const AsyncAwaitError = require("../Middlewares/AsyncAwaitError");
const User = require('../Models/userModel');
const crypto = require("crypto");
// cle
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/generateJwtToken");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");
const getDataUri = require("../utils/dataUri");
const { fileFilter } = require("../utils/fileFilter");


// user register...................................................................................||
const uploadFile = async (file) => {
 
  const fileUri = getDataUri(file);
  const timestamp = Math.floor(Date.now() / 1000); // current Unix timestamp
  const signature = cloudinary.utils.api_sign_request({ timestamp }, "HrPDZ4aWqCtsDjKzHTHz20srK6E");
  const result = await cloudinary.uploader.upload(fileUri.content, {
    resource_type: "auto",
    timestamp,
    signature
  });
  return result;
};

exports.userRegister = AsyncAwaitError(async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const file = req.file;
    const uploadedFile = await uploadFile(file);

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: uploadedFile.public_id,
        url: uploadedFile.secure_url,
      },
    });

    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});



// login...................................................................................||
exports.userlogin = AsyncAwaitError(async (req, res, next) => {

    const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
    
});
// Logout User
exports.userLogout = AsyncAwaitError(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });


  // Forgot Password
exports.forgotPassword = AsyncAwaitError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = AsyncAwaitError(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});



// Get User Detail
exports.getUserDetails = AsyncAwaitError((async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
}));

// update User password
exports.updatePassword = AsyncAwaitError((async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
}));

// update User Profile
exports.updateProfile = AsyncAwaitError((async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
}));

// Get all users(admin)
exports.getAllUser = AsyncAwaitError((async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
}));

// Get single user (admin)
exports.getSingleUser = AsyncAwaitError((async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
}));

// update User Role -- Admin
exports.updateUserRole = AsyncAwaitError((async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
}));

// Delete User --Admin
exports.deleteUser = AsyncAwaitError((async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }


  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
}));