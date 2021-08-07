
const mongoose = require('mongoose')

mongoose.connect(`${process.env.Mongo_URI}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});