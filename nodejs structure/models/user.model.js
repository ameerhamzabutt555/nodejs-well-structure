const mongoose = require('mongoose');
const MUUID = require('uuid-mongodb');

const userSchema = new mongoose.Schema({
  _id: {
    type: 'object',
    value: { type: 'Buffer' },
    default: () => MUUID.v4(),
  },
  companyID: {
    type: String,
    ref: 'Company',
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  phoneNo: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
    required: false,
  },
  key: {
    type: String,
    default: '',
  },
  token: {
    type: String,
    default: '',
  },
  activeStatus: {
    type: Boolean,
    default: false,
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
