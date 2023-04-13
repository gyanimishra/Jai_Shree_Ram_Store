const AsyncAwaitError = require("../Middlewares/AsyncAwaitError");
const Product = require("../Models/productModel");
const apiFeatures = require("../utils/apiFeatures");
// const apiSearchFeature = require("../utils/apiFeatures");

const ErrorHandler = require("../utils/errorHandler");

// Create Products --- Admin

exports.createProducts = AsyncAwaitError(async (req, res) => {

  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  return res.status(200).json({ success: true, product });
});

// getAllProducts

exports.getAllproducts = AsyncAwaitError(async (req, res,next) => {
 
let resultPerPage=10;
const productsCount = await Product.countDocuments();

const ApiFeature = new apiFeatures(Product.find(),req.query,resultPerPage)

  const product = await ApiFeature;
  return res.status(200).json({ success: true,productsCount, product });
});

// get products details

exports.getproductDetails = AsyncAwaitError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
   
  });
});

// update Products  --- Admin

exports.updateProduct = AsyncAwaitError(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product Not Found !!" });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({ success: true, product });
});

// delete Products    --- Admin

exports.deleteProduct = AsyncAwaitError(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product Not Found !!" });
  }
  await product.deleteOne();

  return res
    .status(200)
    .json({ success: true, message: "Product Deleted Successfully !!!" });
});

// Create New Review or Update the review
exports.createProductReview = AsyncAwaitError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = AsyncAwaitError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = AsyncAwaitError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});