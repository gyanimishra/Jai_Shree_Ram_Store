const app = require("./app");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const dotenv= require("dotenv")
const connectiontoDatabase = require('./database/database')


// Handling Uncaught Exception example console.log(youtube)
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
dotenv.config({ path: "config/config.env"});


// connection to database
mongoose.set("strictQuery", true);
connectiontoDatabase()

cloudinary.v2.config({
  cloud_name: "dssxuaia0",
  api_key:"191775354188293",
  api_secret:"HrPDZ4aWqCtsDjKzHTHz20srK6E",
});


 app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
  });

  
// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);

  });
});