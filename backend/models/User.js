const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Constants = require("../configs.json").CONSTANTS;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  username: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  accountType: {
    type: String,
    enum: ["User", "Artist", "Client"],
    default: "User",
    required: true,
  },
  countryCode: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  isAdminVerified: {
    type: Boolean,
    default: false,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  pronouns: {
    type: String,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdAtEP: {
    type: Number,
    default: Math.floor(Date.now() / 1000),
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAtEP: {
    type: Number,
    default: Math.floor(Date.now() / 1000),
    index: true,
  },
  // it is for reset password
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

const User = mongoose.model(Constants.DB_COLLECTIONS.USERS, userSchema);

module.exports = User;
