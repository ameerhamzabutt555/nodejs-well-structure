/* eslint-disable no-console */
const mongoose = require('mongoose');
const { USER, PASSWORD, DBNAME } = require('../utils/config');

const MONGODB_URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0.sivkx.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;
console.log(MONGODB_URI);
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Database connection successfull'))
  .catch((err) => console.log('Errror connecting to the databse', err));
