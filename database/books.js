const mongoose = require("mongoose");

//create book schema
const BookSchema = new mongoose.Schema({
  ISBN: Number,
  title: String,
  pubDate: String,
  language: String,
  numPage: Number,
  author: [Number],
  publication: Number,
  category: [String],
});

//Model
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;
