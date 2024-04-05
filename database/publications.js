const mongoose = require("mongoose");

//create publication schema
const PublicationSchema = mongoose.Schema({
  id: Number,
  name: String,
  books: [Number],
});

//Model
const PublicationModel = mongoose.model("publications", PublicationSchema);

module.exports = PublicationModel;
