const mongoose = require("mongoose");
require("dotenv").config();
const Otp = require("../models/Otp");
const Client = require("../models/Client");
const Artist = require("../models/Artist");
const Gig = require("../models/Gig");
const Message = require("../models/message");
const Admin = require("../models/Admin");
const Payment = require("../models/paymentDetailsModel");

class DBService {
  constructor() {
    // this.connect();
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error(`MongoDB connection error: ${error}`);
      process.exit(1);
    }
  }

  async close() {
    await mongoose.connection.close();
    console.log(`Disconnected from MongoDB`);
  }

  getModel(modelName) {
    return mongoose.model(modelName);
  }
}

// const connectDB = async () => {
//   try {

//     const dbURI = process.env.MONGODB_URI;

//     await mongoose.connect(dbURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//     process.exit(1); // Exit process with failure
//   }
// };

// // module.exports = connectDB;
module.exports = DBService;
