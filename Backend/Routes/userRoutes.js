const express = require('express');
const multer = require("multer");
const { userRegister, userlogin, userLogout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require('../Controller/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../Middlewares/Auth');
const singleUplaod = require('../Middlewares/Multer');



// Set up Multer for image file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });


const router = express.Router()

router.post("/userRegister",singleUplaod,userRegister)
router.post("/userLogin",userlogin)
router.post("/forgotPassword",forgotPassword)
router.put("/password/reset/:token",resetPassword)
router.get("/userLogout",userLogout)
router.get("/megetUserDetails",isAuthenticatedUser,getUserDetails)
router.put("/meupdatePassword",isAuthenticatedUser,updatePassword)
router.put("/meupdateProfile",isAuthenticatedUser,updateProfile)
router.get("/admin/getAllUser",isAuthenticatedUser,authorizeRoles("admin"),getAllUser)
router.get("/admin/getSingleUser/:id",isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
router.put("/admin/updateUserRole/:id",isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
router.get("/admin/deleteUser/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteUser)





module.exports = router;