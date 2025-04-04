const mongoose = require('mongoose');

const connectDB = function () {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    })
    .then(() => {
      console.log("Connection successful");
    })
    .catch((e) => {
      console.log(e);
      console.log("No connection");
    });
};

module.exports = connectDB;