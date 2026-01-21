require('dotenv').config()
const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI

mongoose
  .connect(uri)
  .then(() => console.log("Successfully connection created"))
  .catch((err) => console.error("Connection error", err));