const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

//Database
const database = require("./database/database");

//models
const BookModel = require("./database/books");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publications");

//initialize express
const booky = express();

booky.use(bodyParser.urlencoded({ extended: true }));
booky.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://vineethasangepu2001:4atdABE7hoepzhPv@cluster0.y84t6mx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connection Established"));

/* 
ROUTE           /
Description     Get all the books details
Access          Public
Parameter       None
Methods         GET
*/
booky.get("/", async (req, res) => {
  const getAllBooks = await BookModel.find();

  return res.json(getAllBooks);
});

/* 
ROUTE           /is
Description     Get books details with specific id
Access          Public
Parameter       isbn
Methods         GET
*/
booky.get("/is/:isbn", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

  if (!getSpecificBook) {
    return res.json({
      error: `No book found for the ISBN: ${req.params.isbn}`,
    });
  }

  return res.json({ data: getSpecificBook });
});

/* 
ROUTE           /c
Description     Get books details with category
Access          Public
Parameter       category
Methods         GET
*/
booky.get("/c/:category", async (req, res) => {
  const getSpecificBook = await BookModel.find({
    category: req.params.category,
  });

  if (!getSpecificBook) {
    return res.json({
      error: `No book found for the Category: ${req.params.category}`,
    });
  }

  return res.json({ data: getSpecificBook });
});

/* 
ROUTE           /l
Description     Get books details with language
Access          Public
Parameter       language
Methods         GET
*/
booky.get("/l/:language", async (req, res) => {
  const getSpecificBook = await BookModel.find({
    language: req.params.language,
  });

  if (!getSpecificBook) {
    return res.json({
      error: `No book found for the language: ${req.params.language}`,
    });
  }

  return res.json({ data: getSpecificBook });
});

/* 
ROUTE           /author
Description     Get all the authors details
Access          Public
Parameter       None
Methods         GET
*/
booky.get("/author", async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
  res.json(getAllAuthors);
});

/* 
ROUTE           /author/id
Description     Get the author details by id
Access          Public
Parameter       id
Methods         GET
*/
booky.get("/author/id/:id", async (req, res) => {
  const getSpecificAuthor = await AuthorModel.findOne({ id: req.params.id });

  if (!getSpecificAuthor) {
    return res.json({
      error: `No author found for the id: ${req.params.id}`,
    });
  }

  return res.json({ data: getSpecificAuthor });
});

/* 
ROUTE           author/books
Description     Get authors details with book isbn
Access          Public
Parameter       book
Methods         GET
*/
booky.get("/author/books/:bookisbn", async (req, res) => {
  const getSpecificAuthor = await AuthorModel.find({
    books: req.params.bookisbn,
  });
  if (!getSpecificAuthor) {
    return res.json({
      error: `No author found for book name as ${req.params.bookisbn}`,
    });
  }

  return res.json({ data: getSpecificAuthor });
});

/* 
ROUTE           /publications
Description     Get all the publications details
Access          Public
Parameter       None
Methods         GET
*/
booky.get("/publications", async (req, res) => {
  const getAllPublications = await PublicationModel.find();
  res.json(getAllPublications);
});

/* 
ROUTE           /publications/id
Description     Get the publications details by id
Access          Public
Parameter       id
Methods         GET
*/
booky.get("/publications/id/:id", async (req, res) => {
  const getSpecificpublication = await PublicationModel.findOne({
    id: req.params.id,
  });

  if (!getSpecificpublication) {
    return res.json({
      error: `No publications found for the id: ${req.params.id}`,
    });
  }

  return res.json({ data: getSpecificpublication });
});

/* 
ROUTE           publications/books
Description     Get publications details with book name
Access          Public
Parameter       book
Methods         GET
*/
booky.get("/publications/books/:bookisbn", async (req, res) => {
  const getSpecificPublication = await PublicationModel.find({
    books: req.params.bookisbn,
  });
  if (!getSpecificPublication) {
    return res.json({
      error: `No Publication found for book isbn as ${req.params.bookisbn}`,
    });
  }

  return res.json(getSpecificPublication);
});

//POST

/* 
ROUTE           /book/new
Description     Add new book
Access          Public
Parameter       None
Methods         POST
*/

booky.post("/book/new", async (req, res) => {
  const { newBook } = req.body;
  const addNewBook = BookModel.create(newBook);

  return res.json({
    books: addNewBook,
    message: "Book was added!!",
  });
});

/* 
ROUTE           /author/new
Description     Add new author
Access          Public
Parameter       None
Methods         POST
*/
booky.post("/author/new", async (req, res) => {
  const { newAuthor } = req.body;
  const addNewAuthor = AuthorModel.create(newAuthor);

  return res.json({
    Author: addNewAuthor,
    message: "Author was added!!",
  });
});

/* 
ROUTE           /publication/new
Description     Add new publication
Access          Public
Parameter       None
Methods         POST
*/
booky.post("/publication/new", async (req, res) => {
  const { newPublication } = req.body;
  const addNewPublication = PublicationModel.create(newPublication);

  return res.json({
    Publication: addNewPublication,
    message: "Publication was added!!",
  });
});

//PUT

/* 
ROUTE           /book/update
Description     Update book on isbn
Access          Public
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/:isbn", async (req, res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      title: req.body.bookTitle,
    },
    {
      new: true,
    }
  );

  return res.json({
    books: updatedBook,
  });
});

/*************Updating new author ***********/
/* 
ROUTE           /book/author/update
Description     Update / add new author
Access          Public
Parameter       isbn
Methods         PUT
*/
booky.put("/book/author/update/:isbn", async (req, res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $addToSet: {
        author: req.body.newAuthor,
      },
    },
    {
      new: true,
    }
  );

  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.body.newAuthor,
    },
    {
      $addToSet: {
        books: req.params.isbn,
      },
    },
    {
      new: true,
    }
  );

  return res.json({
    books: updatedBook,
    authors: updatedAuthor,
    meesage: "New author was added",
  });
});

/* 
ROUTE           /publication/update/book
Description     Update or add new publcation
Access          Public
Parameter       isbn
Methods         PUT
*/
booky.put("/publication/update/book/:isbn", (req, res) => {
  //update the publication db
  database.publication.forEach((pub) => {
    if (pub.id === req.body.pubId) {
      return pub.books.push(req.params.isbn);
    }
  });

  //update the books db
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = req.body.pubId;
      return;
    }
  });

  return res.json({
    books: database.books,
    publications: database.publication,
    message: "Successfully updated publication",
  });
});

//DELETE
/* 
ROUTE           /book/delete/
Description     Delete a book
Access          Public
Parameter       isbn
Methods         DELETE
*/
booky.delete("/book/delete/:isbn", (req, res) => {
  //which ever book  doesn't match with isbn, send to another array.
  const bookIndex = database.books.findIndex(
    (book) => book.ISBN === parseInt(req.params.isbn)
  );

  if (bookIndex === -1) {
    return res.status(400).send("Book not found");
  }

  database.books.splice(bookIndex, 1);

  return res.json({ data: database.books });
});

booky.listen(3000, () => {
  console.log("Server is up and running");
});
