const express = require('express');
const {  getAllproducts, createProducts, updateProduct, deleteProduct, getproductDetails, createProductReview, getProductReviews, deleteReview } = require('../Controller/ProductController');
const { isAuthenticatedUser, authorizeRoles } = require('../Middlewares/Auth');

const router = express.Router()

router.post("/admin/newProduct",isAuthenticatedUser,authorizeRoles("admin"),createProducts)

router.get("/Allproducts",getAllproducts)

router.get("/getProductdetails/:id",getproductDetails)

router.put("/admin/updateProduct/:id",isAuthenticatedUser,authorizeRoles("admin"),updateProduct)

router.delete("/admin/deleteProduct/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)

router.put("/createProductReview",isAuthenticatedUser,createProductReview)

router.get("/getProductReviews",getProductReviews)

router.delete("/deleteReview",isAuthenticatedUser,deleteReview)



module.exports= router