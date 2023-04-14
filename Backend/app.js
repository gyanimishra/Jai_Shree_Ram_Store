const express = require("express");
const Error = require("./Middlewares/Error");
const cors = require('cors');
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");


// Enable CORS for all requests
app.use(cors());

app.use(express.json());
app.use(cookieParser());
const fileUpload = require("express-fileupload");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// routes imports

const productsRoutes = require('./Routes/ProductsRoutes')
const userRoutes = require('./Routes/userRoutes');
const orderRoutes = require('./Routes/orderRoutes')




// api routes
app.use('/api/v1',userRoutes)
app.use('/api/v1',productsRoutes)
app.use('/api/v1',orderRoutes)


// Middleware for Errors
app.use(Error);

module.exports = app;
